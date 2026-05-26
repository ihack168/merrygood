```ts
import React, {useState} from 'react'
import {defineField, defineType, set} from 'sanity'
import {Box, Button, Card, Flex, Stack, Text, TextInput} from '@sanity/ui'

function CommaSeparatedTagsInput(props: any) {
  const {value = [], onChange} = props
  const [inputValue, setInputValue] = useState('')

  const parseTags = (text: string) => {
    return text
      .split(/,|，|\n/)
      .map((tag) => tag.trim())
      .filter(Boolean)
  }

  const addTags = (text: string) => {
    const newTags = parseTags(text)

    if (!newTags.length) return

    const mergedTags = Array.from(new Set([...value, ...newTags]))

    onChange(set(mergedTags))
    setInputValue('')
  }

  const removeTag = (tagToRemove: string) => {
    const nextTags = value.filter((tag: string) => tag !== tagToRemove)
    onChange(set(nextTags))
  }

  return React.createElement(
    Stack,
    {space: 3},
    React.createElement(TextInput, {
      value: inputValue,
      placeholder: '例如：猛健樂,週纖達,瑞倍適',
      onChange: (event: any) => setInputValue(event.currentTarget.value),
      onPaste: (event: any) => {
        const text = event.clipboardData.getData('text')

        if (text.includes(',') || text.includes('，') || text.includes('\n')) {
          event.preventDefault()
          addTags(text)
        }
      },
      onKeyDown: (event: any) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          addTags(inputValue)
        }
      },
    }),

    React.createElement(
      Button,
      {
        text: '加入標籤',
        tone: 'primary',
        onClick: () => addTags(inputValue),
      }
    ),

    value.length > 0 &&
      React.createElement(
        Flex,
        {
          wrap: 'wrap',
          gap: 2,
        },
        value.map((tag: string) =>
          React.createElement(
            Card,
            {
              key: tag,
              padding: 2,
              radius: 2,
              tone: 'primary',
              shadow: 1,
            },
            React.createElement(
              Flex,
              {
                align: 'center',
                gap: 2,
              },
              React.createElement(Text, {size: 1}, tag),
              React.createElement(Button, {
                text: '×',
                mode: 'bleed',
                tone: 'critical',
                onClick: () => removeTag(tag),
              })
            )
          )
        )
      ),

    value.length === 0 &&
      React.createElement(
        Box,
        null,
        React.createElement(Text, {size: 1, muted: true}, '尚未新增標籤')
      )
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

          const uniqueId = Math.floor(Date.now() / 1000).toString().slice(-6)

          return encodeURIComponent(cleanTitle) + `-${uniqueId}`
        },
      },
      validation: (Rule) => Rule.required().error('Slug 是必填項目，否則前台無法點擊'),
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
      description: '直接貼上外部網站的圖片連結 (例如 https://...)，這將作為列表頁的封面圖。',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image (Sanity Upload)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body (Standard Editor)',
      type: 'blockContent',
    }),
    defineField({
      name: 'htmlContent',
      title: 'HTML Content (Excel Auto-post)',
      type: 'text',
      description: '這裡是存放原始 HTML 代碼。如果此欄位有內容，前端將優先顯示此處。',
    }),
    defineField({
      name: 'youtubeVideoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: '輸入 YouTube 影片 ID (例如: dQw4w9WgXcQ)，前端會自動顯示播放按鈕。',
    }),
    defineField({
      name: 'tags',
      title: '標籤 / 關鍵字',
      type: 'array',
      description: '可直接貼上：猛健樂,週纖達,瑞倍適，系統會自動拆成多個標籤。',
      of: [{type: 'string'}],
      components: {
        input: CommaSeparatedTagsInput,
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
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
```
