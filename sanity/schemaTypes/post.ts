import React, {useState} from 'react'
import {defineField, defineType, set} from 'sanity'
import {Stack, TextInput, Flex, Card, Text, Button} from '@sanity/ui'

function TagsInput(props: any) {
  const {value = [], onChange} = props
  const [input, setInput] = useState('')

  const addTags = (raw: string) => {
    if (!raw) return

    const tags = raw
      .split(/,|，|\n/)
      .map((tag) => tag.trim())
      .filter(Boolean)

    if (!tags.length) return

    const merged = [...new Set([...value, ...tags])]

    onChange(set(merged))
    setInput('')
  }

  const removeTag = (tag: string) => {
    onChange(set(value.filter((t: string) => t !== tag)))
  }

  return (
    <Stack space={3}>
      <TextInput
        value={input}
        placeholder="輸入：a,b,c,d,e"
        onChange={(e) => setInput(e.currentTarget.value)}
        onPaste={(e) => {
          const text = e.clipboardData.getData('text')

          if (text.includes(',') || text.includes('，') || text.includes('\n')) {
            e.preventDefault()
            addTags(text)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            addTags(input)
          }
        }}
      />

      <Button
        text="新增 Tags"
        tone="primary"
        onClick={() => addTags(input)}
      />

      <Flex wrap="wrap" gap={2}>
        {value.map((tag: string) => (
          <Card
            key={tag}
            padding={2}
            radius={2}
            tone="primary"
          >
            <Flex align="center" gap={2}>
              <Text>{tag}</Text>

              <Button
                text="×"
                mode="bleed"
                tone="critical"
                onClick={() => removeTag(tag)}
              />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Stack>
  )
}

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',

      options: {
        source: 'title',
        maxLength: 96,

        slugify: (input) => {
          const cleanTitle = input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\u4e00-\u9fa5a-z0-9-]/g, '')
            .substring(0, 15)

          const uniqueId = Math.floor(Date.now() / 1000)
            .toString()
            .slice(-6)

          return encodeURIComponent(cleanTitle) + `-${uniqueId}`
        },
      },

      validation: (Rule) =>
        Rule.required().error('Slug 是必填項目，否則前台無法點擊'),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),

    defineField({
      name: 'imageUrl',
      title: 'External Image URL (外部圖片網址)',
      type: 'url',
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',

      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',

      of: [
        {
          type: 'reference',
          to: {type: 'category'},
        },
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),

    defineField({
      name: 'htmlContent',
      title: 'HTML Content',
      type: 'text',
    }),

    defineField({
      name: 'youtubeVideoId',
      title: 'YouTube Video ID',
      type: 'string',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',

      of: [{type: 'string'}],

      components: {
        input: TagsInput,
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },

    prepare(selection) {
      const {author} = selection

      return {
        ...selection,
        subtitle: author && `by ${author}`,
      }
    },
  },
})