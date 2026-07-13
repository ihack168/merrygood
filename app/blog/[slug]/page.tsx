import { client } from "@/lib/sanity"
import { createImageUrlBuilder } from "@sanity/image-url"
import { PortableText } from "@portabletext/react"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { ShareBar } from "@/components/share-bar"
import Link from "next/link"
import type { Metadata } from "next"
import { sanitizePostHtml } from "@/lib/content-cleanup"

export const revalidate = 0
export const dynamic = "force-dynamic"

const siteName = "美麗好減肥減重－體重管理資訊站"
const shortSiteName = "美麗好減肥減重"
const siteUrl = "https://news.merrygood.com.tw"
const defaultAuthorName = "美麗好"

const builder = createImageUrlBuilder(client)

function urlFor(source: unknown) {
  if (!source) return { url: () => "" }
  return builder.image(source)
}

function optimizeSanityImages(html?: string) {
  if (!html) return ""

  return html.replace(
    /(https:\/\/cdn\.sanity\.io\/images\/[^"' )<>]+)/g,
    (url) => {
      if (url.includes("auto=format")) return url
      return `${url}${url.includes("?") ? "&" : "?"}auto=format`
    }
  )
}

function stripHtml(value?: string) {
  if (!value) return ""

  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
}

function removeRepeatedTitle(text: string, title: string) {
  const normalizedText = text.trim()
  const normalizedTitle = title.trim()

  if (!normalizedText || !normalizedTitle) return normalizedText

  if (normalizedText.startsWith(normalizedTitle)) {
    return normalizedText.slice(normalizedTitle.length).replace(/^[\s：:｜|\-–—]+/, "")
  }

  return normalizedText
}

function buildDescription(
  description: string | undefined,
  htmlContent: string | undefined,
  title: string
) {
  const supplied = removeRepeatedTitle(stripHtml(description), title)

  if (supplied && supplied !== "點擊閱讀詳情...") {
    return supplied.slice(0, 160)
  }

  const fromHtml = removeRepeatedTitle(stripHtml(htmlContent), title)

  if (fromHtml) {
    return `${fromHtml.slice(0, 157)}${fromHtml.length > 157 ? "..." : ""}`
  }

  return `${title}｜${shortSiteName}`
}

function formatDate(date?: string) {
  if (!date) return null

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return null

  return parsed.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function toIsoDate(date?: string) {
  if (!date) return undefined

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return undefined

  return parsed.toISOString()
}

interface PostMetadataResult {
  title?: string
  description?: string
  htmlContent?: string
  publishedAt?: string
  _updatedAt?: string
  mainImage?: unknown
  authorName?: string
  authorSlug?: string
  tags?: string[]
}

interface RelatedPost {
  _id: string
  title: string
  slug: string
  description?: string
  mainImage?: unknown
  publishedAt?: string
}

interface PostResult extends PostMetadataResult {
  _id: string
  slug: string
  body?: unknown
  authorBio?: string
  authorImage?: unknown
}

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) return null

      const imageUrl = urlFor(value)
        .width(1400)
        .fit("max")
        .auto("format")
        .url()

      return (
        <figure className="my-10 flex flex-col items-center">
          <img
            src={imageUrl}
            alt={value.alt || "文章圖片"}
            className="h-auto w-full rounded-[2rem] border border-border shadow-[0_16px_50px_rgba(120,80,70,0.12)]"
            loading="lazy"
            decoding="async"
          />

          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const post = await client.fetch<PostMetadataResult | null>(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      htmlContent,
      publishedAt,
      _updatedAt,
      mainImage,
      "authorName": author->name,
      "authorSlug": author->slug.current,
      "tags": coalesce(categories[]->title, tags)
    }`,
    { slug },
    { cache: "no-store" }
  )

  if (!post?.title) {
    return {
      title: "找不到文章",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const description = buildDescription(
    post.description,
    post.htmlContent,
    post.title
  )

  const canonicalUrl = `${siteUrl}/blog/${encodeURIComponent(slug)}`

  const ogImage = post.mainImage
    ? urlFor(post.mainImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .auto("format")
        .url()
    : `${siteUrl}/images/hero.png`

  const publishedTime = toIsoDate(post.publishedAt)
  const modifiedTime = toIsoDate(post._updatedAt || post.publishedAt)
  const authorName = post.authorName || defaultAuthorName
  const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : []

  return {
    title: post.title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    authors: [
      {
        name: authorName,
        url: post.authorSlug
          ? `${siteUrl}/authors/${post.authorSlug}`
          : `${siteUrl}/about`,
      },
    ],

    category: tags[0] || "體重管理",

    keywords: tags,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title: post.title,
      description,
      url: canonicalUrl,
      siteName,
      locale: "zh_TW",
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [authorName],
      section: tags[0] || "體重管理",
      tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await client.fetch<PostResult | null>(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      description,
      "slug": slug.current,
      publishedAt,
      _updatedAt,
      mainImage,
      body,
      htmlContent,
      "authorName": author->name,
      "authorSlug": author->slug.current,
      "authorBio": author->bio,
      "authorImage": author->image,
      "tags": coalesce(categories[]->title, tags)
    }`,
    { slug },
    { cache: "no-store" }
  )

  if (!post?.title) notFound()

  const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : []
  const displayedTags = tags.slice(0, 3)
  const authorName = post.authorName || defaultAuthorName
  const authorUrl = post.authorSlug
    ? `/authors/${post.authorSlug}`
    : "/about"

  const description = buildDescription(
    post.description,
    post.htmlContent,
    post.title
  )

  const publishedDate = formatDate(post.publishedAt)
  const modifiedDate = formatDate(post._updatedAt)
  const publishedIso = toIsoDate(post.publishedAt)
  const modifiedIso = toIsoDate(post._updatedAt || post.publishedAt)
  const canonicalUrl = `${siteUrl}/blog/${encodeURIComponent(slug)}`

  const mainImageUrl = post.mainImage
    ? urlFor(post.mainImage)
        .width(1600)
        .fit("max")
        .auto("format")
        .url()
    : undefined

  const structuredImageUrl = post.mainImage
    ? urlFor(post.mainImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .auto("format")
        .url()
    : `${siteUrl}/images/hero.png`

  const optimizedHtml = optimizeSanityImages(post.htmlContent)
  const cleanedHtml = optimizedHtml
    ? sanitizePostHtml(optimizedHtml, post.title, Boolean(post.mainImage))
    : ""

  const relatedPosts = await client.fetch<RelatedPost[]>(
    `*[
      _type == "post"
      && _id != $postId
      && defined(slug.current)
      && count(coalesce(categories[]->title, tags)[@ in $tags]) > 0
    ]
    | order(
        count(coalesce(categories[]->title, tags)[@ in $tags]) desc,
        coalesce(publishedAt, _createdAt) desc
      )[0...4]{
        _id,
        title,
        "slug": slug.current,
        description,
        mainImage,
        "publishedAt": coalesce(publishedAt, _createdAt)
      }`,
    {
      postId: post._id,
      tags,
    },
    { cache: "no-store" }
  )

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    url: canonicalUrl,
    headline: post.title,
    description,
    inLanguage: "zh-Hant-TW",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    author: post.authorSlug
      ? {
          "@type": "Person",
          "@id": `${siteUrl}/authors/${post.authorSlug}#person`,
          name: authorName,
          url: `${siteUrl}/authors/${post.authorSlug}`,
        }
      : {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: defaultAuthorName,
          url: `${siteUrl}/about`,
        },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    datePublished: publishedIso,
    dateModified: modifiedIso,
    image: {
      "@type": "ImageObject",
      url: structuredImageUrl,
      width: 1200,
      height: 630,
    },
    articleSection: tags[0] || "體重管理",
    keywords: tags,
    about: tags.map((tag) => ({
      "@type": "Thing",
      name: tag,
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首頁",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "最新文章",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <main className="relative overflow-hidden px-6 pb-24 pt-32">
        <div className="absolute left-1/2 top-20 -z-10 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute right-0 top-96 -z-10 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="mx-auto max-w-4xl">
          <nav
            aria-label="麵包屑導覽"
            className="mb-10 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              首頁
            </Link>

            <span aria-hidden="true">/</span>

            <Link href="/blog" className="transition-colors hover:text-primary">
              最新文章
            </Link>

            <span aria-hidden="true">/</span>

            <span
              aria-current="page"
              className="max-w-xs truncate text-foreground"
            >
              {post.title}
            </span>
          </nav>

          {displayedTags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {displayedTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            {post.title}
          </h1>

          <div className="mb-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-8 text-sm text-muted-foreground">
            <span>
              撰文者：
              <Link
                href={authorUrl}
                rel="author"
                className="font-medium text-foreground transition-colors hover:text-primary"
              >
                {authorName}
              </Link>
            </span>

            {publishedDate && (
              <>
                <span className="text-border" aria-hidden="true">
                  |
                </span>
                <time dateTime={publishedIso}>發布於 {publishedDate}</time>
              </>
            )}

            {modifiedDate &&
              modifiedIso &&
              publishedIso &&
              modifiedIso !== publishedIso && (
                <>
                  <span className="text-border" aria-hidden="true">
                    |
                  </span>
                  <time dateTime={modifiedIso}>更新於 {modifiedDate}</time>
                </>
              )}
          </div>

          {mainImageUrl && (
            <figure className="mb-16 overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_20px_70px_rgba(120,80,70,0.12)]">
              <img
                src={mainImageUrl}
                alt={post.title}
                className="h-auto w-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          )}

          <article
            className="
              prose max-w-none
              prose-lg md:prose-xl
              prose-p:mb-5 prose-p:leading-[1.9] prose-p:text-muted-foreground
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-5 prose-h2:text-3xl
              prose-h3:mt-8 prose-h3:text-2xl
              prose-strong:font-bold prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:opacity-70
              prose-ul:rounded-[1.5rem] prose-ul:border prose-ul:border-border prose-ul:bg-white/70 prose-ul:p-8 prose-ul:shadow-sm
              prose-li:text-muted-foreground prose-li:marker:text-primary
              prose-table:my-10 prose-table:block prose-table:overflow-x-auto prose-table:border-collapse
              prose-thead:bg-primary/10 prose-th:border prose-th:border-border prose-th:p-4 prose-th:text-primary
              prose-td:border prose-td:border-border prose-td:p-4 prose-td:text-muted-foreground
              prose-img:rounded-[2rem] prose-img:border prose-img:border-border
              prose-blockquote:rounded-r-2xl prose-blockquote:border-l-primary prose-blockquote:bg-white/70 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:text-muted-foreground
            "
          >
            {cleanedHtml ? (
              <div
                className="
                  [&_table]:!my-10
                  [&_table]:!w-full
                  [&_table]:!border-collapse
                  [&_table]:!overflow-hidden
                  [&_table]:!rounded-2xl
                  [&_th]:!border
                  [&_th]:!border-border
                  [&_th]:!bg-primary/10
                  [&_th]:!p-4
                  [&_th]:!text-primary
                  [&_td]:!border
                  [&_td]:!border-border
                  [&_td]:!p-4
                  [&_td]:!text-muted-foreground
                  [&_tr]:!bg-transparent
                  [&_img]:mx-auto
                  [&_img]:my-8
                  [&_img]:block
                  [&_img]:rounded-[2rem]
                  [&_img]:border
                  [&_img]:border-border
                  [&_img]:shadow-[0_16px_50px_rgba(120,80,70,0.12)]
                  [&_p]:mb-5
                  [&_p]:leading-[1.9]
                  [&_p]:text-muted-foreground
                  [&_h2]:mt-12
                  [&_h2]:mb-6
                  [&_h2]:border-l-4
                  [&_h2]:border-primary
                  [&_h2]:pl-5
                  [&_h2]:text-3xl
                  [&_h2]:font-bold
                  [&_h2]:text-foreground
                  [&_h3]:mt-8
                  [&_h3]:text-2xl
                  [&_h3]:font-bold
                  [&_h3]:text-foreground
                  [&_li]:mb-1
                  [&_li]:text-muted-foreground
                  [&_strong]:text-foreground
                "
                dangerouslySetInnerHTML={{ __html: cleanedHtml }}
              />
            ) : (
              post.body && (
                <PortableText value={post.body as any} components={ptComponents} />
              )
            )}
          </article>

          <aside
            aria-label="醫療資訊聲明"
            className="mt-14 rounded-2xl border border-border bg-card/70 p-5 text-sm leading-7 text-muted-foreground"
          >
            本文僅提供一般健康與體重管理資訊，不能取代醫師診斷、處方或個別化醫療建議。
            若你有疾病、正在服藥、懷孕，或考慮使用處方減重藥物，請先由合格醫療專業人員評估。
          </aside>

          <section
            aria-labelledby="article-author"
            className="mt-10 rounded-3xl border border-border bg-white/70 p-6 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              ARTICLE AUTHOR
            </p>

            <h2 id="article-author" className="mt-2 text-xl font-bold">
              關於作者
            </h2>

            <div className="mt-5 flex items-start gap-4">
              {post.authorImage && (
                <img
                  src={urlFor(post.authorImage)
                    .width(160)
                    .height(160)
                    .fit("crop")
                    .auto("format")
                    .url()}
                  alt={authorName}
                  className="h-16 w-16 rounded-full border border-border object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}

              <div>
                <Link
                  href={authorUrl}
                  rel="author"
                  className="font-bold text-foreground transition-colors hover:text-primary"
                >
                  {authorName}
                </Link>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {post.authorBio ||
                    "負責整理健康減重、體重管理與減重醫療相關資訊，並依網站編輯政策持續檢查與更新內容。"}
                </p>
              </div>
            </div>
          </section>

          <div className="mt-10">
            <ShareBar />
          </div>

          {relatedPosts.length > 0 && (
            <section
              aria-labelledby="related-articles"
              className="mt-16 border-t border-border pt-12"
            >
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  RELATED ARTICLES
                </p>

                <h2
                  id="related-articles"
                  className="mt-2 text-3xl font-bold tracking-tight"
                >
                  延伸閱讀
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {relatedPosts.map((relatedPost) => {
                  const relatedImageUrl = relatedPost.mainImage
                    ? urlFor(relatedPost.mainImage)
                        .width(800)
                        .height(450)
                        .fit("crop")
                        .auto("format")
                        .url()
                    : ""

                  return (
                    <article
                      key={relatedPost._id}
                      className="overflow-hidden rounded-2xl border border-border bg-white/70 shadow-sm transition-transform hover:-translate-y-1"
                    >
                      {relatedImageUrl && (
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          aria-label={`閱讀文章：${relatedPost.title}`}
                        >
                          <img
                            src={relatedImageUrl}
                            alt={relatedPost.title}
                            className="aspect-video w-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </Link>
                      )}

                      <div className="p-5">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <h3 className="text-lg font-bold leading-snug transition-colors hover:text-primary">
                            {relatedPost.title}
                          </h3>
                        </Link>

                        {relatedPost.description && (
                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {removeRepeatedTitle(
                              stripHtml(relatedPost.description),
                              relatedPost.title
                            )}
                          </p>
                        )}

                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="mt-5 inline-flex text-sm font-semibold text-primary"
                        >
                          閱讀文章 →
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          )}

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-muted-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary"
            >
              ← 返回文章列表
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-muted-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary"
            >
              關於本站
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
