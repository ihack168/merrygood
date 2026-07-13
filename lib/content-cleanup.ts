/**
 * 去除 htmlContent 開頭跟頁面自己渲染的標題/主圖重複的部分
 * @param hasMainImage 頁面上方是否已經渲染過 mainImage 主圖 —— 只有在有主圖時,才砍掉內文開頭的圖片
 *
 * ⚠️ 修正重點:
 * 原本的版本「先砍標題、後砍圖片」,但實際內容常常是
 *   <img ...><div><h1>標題</h1><p>...
 * 標題前面除了圖片,還多包了一層 <div>。先砍標題那一步因為 <h1> 不在字串最前面
 * (最前面是 <img>) 會直接匹配失敗、被跳過,砍完圖片後 <h1> 前面又多了一層 <div>,
 * 也不會再匹配。改成「先砍圖片、再砍標題」,並讓砍標題的 regex 能穿過開頭可能存在
 * 的一層 <div> wrapper,兩種常見結構(有無外層 div)都能正確處理。
 */
export function stripDuplicateLeadContent(
  html: string,
  title: string,
  hasMainImage: boolean
): string {
  if (!html) return html;

  let result = html.trim();

  const normalize = (s: string) =>
    s.replace(/\s+/g, "").replace(/[「」『』"'：:，,。.]/g, "");

  const normalizedTitle = normalize(title || "");

  // 1) 先砍開頭重複的圖片(只有頁面上方確實有渲染主圖時才砍)
  if (hasMainImage) {
    const figureMatch = result.match(/^\s*<figure[^>]*>[\s\S]*?<\/figure>\s*/i);
    if (figureMatch) {
      result = result.slice(figureMatch[0].length).trim();
    } else {
      const pWrappedImgMatch = result.match(/^\s*<p>\s*<img[^>]*\/?>\s*<\/p>\s*/i);
      if (pWrappedImgMatch) {
        result = result.slice(pWrappedImgMatch[0].length).trim();
      } else {
        const imgMatch = result.match(/^\s*<img[^>]*\/?>\s*/i);
        if (imgMatch) {
          result = result.slice(imgMatch[0].length).trim();
        }
      }
    }
  }

  // 2) 再砍開頭重複的標題。允許前面多包一層 <div>(常見把整篇內容包在一個
  //    wrapper div 裡,標題是 div 裡的第一個元素),砍完標題後把 <div> 開頭標籤還原回去,
  //    避免動到後面內容跟結尾 </div> 的配對。
  const leadingDivMatch = result.match(/^\s*<div[^>]*>\s*/i);
  const afterDiv = leadingDivMatch
    ? result.slice(leadingDivMatch[0].length)
    : result;

  const h1Match = afterDiv.match(/^\s*<h1[^>]*>([\s\S]*?)<\/h1>\s*/i);
  if (h1Match) {
    const h1Text = h1Match[1].replace(/<[^>]+>/g, "");
    const normalizedH1 = normalize(h1Text);

    if (
      normalizedTitle &&
      (normalizedH1 === normalizedTitle ||
        normalizedH1.includes(normalizedTitle) ||
        normalizedTitle.includes(normalizedH1))
    ) {
      const remainder = afterDiv.slice(h1Match[0].length);
      result = (leadingDivMatch ? leadingDivMatch[0] + remainder : remainder).trim();
    }
  }

  return result;
}

/**
 * 把內文中「所有」<h1> 標籤降級成 <h2>,不管出現在內文哪個位置(開頭、被 div 包住、前面有圖片都一樣處理)
 * 因為頁面上方一定已經渲染過一次 <h1>{post.title}</h1>,內文絕對不該再帶 <h1>。
 * 這是最後一道防線:就算 stripDuplicateLeadContent 因為標題文字差異太大沒有精準匹配到、
 * 沒能整段砍掉,至少不會讓頁面上出現兩個 <h1>,傷害 SEO 的唯一標題訊號。
 */
export function demoteAllH1(html: string): string {
  if (!html) return html;
  return html
    .replace(/<h1([^>]*)>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>");
}

/**
 * 轉換內容中殘留、未被正確轉成 <strong> 的 markdown 粗體語法 **text**
 * 只處理標籤「外面」的文字節點,避免污染到屬性(如 alt="**xxx**")或既有標籤結構
 */
export function convertLeftoverMarkdownBold(html: string): string {
  if (!html) return html;

  const parts = html.split(/(<[^>]+>)/);

  return parts
    .map((part, i) => {
      const isTag = i % 2 === 1;
      if (isTag) return part;
      return part.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    })
    .join("");
}

/**
 * 整合處理:清洗完整的 htmlContent
 * @param hasMainImage 頁面上方是否已渲染主圖,決定要不要砍內文開頭的重複圖片
 */
export function sanitizePostHtml(
  html: string,
  title: string,
  hasMainImage: boolean
): string {
  if (!html) return html;
  let result = stripDuplicateLeadContent(html, title, hasMainImage);
  result = demoteAllH1(result);
  result = convertLeftoverMarkdownBold(result);
  return result;
}