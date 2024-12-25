import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { cachePlugin } from '@vuepress/plugin-cache'
import { feedPlugin } from '@vuepress/plugin-feed'
import { umamiAnalyticsPlugin } from '@vuepress/plugin-umami-analytics'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    hostname: 'https://weekly.shawnxie.top',
    logo: 'https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/image-sjql.png',
    repo: 'https://github.com/Xiaoxie1994/shawn-weekly',
    editLink: false,
    subSidebar: 'auto',
    contributors: false,
    navbar: [
      {
        text: '主页',
        link: '/'
      },
      {
        text: '合集',
        prefix: '/collection/',
        children: [
          {
            text: '2024',
            link: '2024.md'
          }
        ],
      },
      {
        text: '信息源',
        link: '/source/read_source.md',
      },
      {
        text: '订阅',
        link: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwODY0ODQzOQ==&action=getalbum&album_id=3492416248238096386#wechat_redirect',
      }
    ],
    sidebar: {
      displayAllHeaders: false,
      '/': [
        {
          text: '主页',
          collapsible: true,
          link: '/'
        },
        {
          text: '合集',
          prefix:'collection/',
          collapsible: true,
          children: [
            {
              text: '2024年周刊合集（01期 - 30期）',
              link: '2024.md'
            }
          ],
        },
        {
          text: '周刊',
          prefix:'content/',
          collapsible: true,
          children: [
            {
              text: '2024',
              prefix:'2024/',
              collapsible: true,
              children: [
                {
                  text: '第 29 期：宇宙的尽头是上岸',
                  link: '29.md'
                },
                {
                  text: '第 28 期：小机器人是什么鬼啊？',
                  link: '28.md'
                },
                {
                  text: '第 27 期：移动的移动充电宝',
                  link: '27.md'
                },
                {
                  text: '第 26 期：无痛写作',
                  link: '26.md'
                },
                {
                  text: '第 25 期：第一生产力',
                  link: '25.md'
                },
                {
                  text: '第 24 期：伟大的母亲',
                  link: '24.md'
                },
                {
                  text: '第 23 期：MAGA!',
                  link: '23.md'
                },
                {
                  text: '第 22 期：4 > 1',
                  link: '22.md'
                },
                {
                  text: '第 21 期：惬意',
                  link: '21.md'
                },
                {
                  text: '第 20 期：折腾要趁早',
                  link: '20.md'
                },
                {
                  text: '第 19 期：物理学不存在了',
                  link: '19.md'
                },
                {
                  text: '第 18 期：啪的一下，假期就没了！',
                  link: '18.md'
                },
                {
                  text: '第 17 期：牛市来了？',
                  link: '17.md'
                },
                {
                  text: '第 16 期：白嫖AI的最佳时间',
                  link: '16.md'
                },
                {
                  text: '第 15 期：中秋节快乐',
                  link: '15.md'
                },
                {
                  text: '第 14 期：什么是完美副业？',
                  link: '14.md'
                },
                {
                  text: '第 13 期：肉，好次！',
                  link: '13.md'
                },
                {
                  text: '第 12 期：热 & 累！',
                  link: '12.md'
                },
                {
                  text: '第 11 期：猴哥，我好急啊！',
                  link: '11.md'
                },
                {
                  text: '第 10 期：太阳神鸟',
                  link: '10.md'
                },
                {
                  text: '第 9 期：Queen Wen！！！',
                  link: '9.md'
                },
                {
                  text: '第 8 期：奥运会热度不高？',
                  link: '8.md'
                },
                {
                  text: '第 7 期：Fight！',
                  link: '7.md'
                },
                {
                  text: '第 6 期：陶冶情操！',
                  link: '6.md'
                },
                {
                  text: '第 5 期：小魔女太可爱了！',
                  link: '5.md'
                },
                {
                  text: '第 4 期：Steam夏季促销开始啦！',
                  link: '4.md'
                },
                {
                  text: '第 3 期：基于“智能体”创造自发展的冒险镇',
                  link: '3.md'
                },
                {
                  text: '第 2 期：房地产降温',
                  link: '2.md'
                },
                {
                  text: '第 1 期：起点！',
                  link: '1.md'
                }
              ]
            }
          ],
        },
      ],
    },
  }),
  lang: 'zh-CN',
  title: '肖恩技术周刊',
  description: '记录有价值的技术内容',
  head: [
    [
      'link',{ rel: 'icon', href: 'https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/image-sjql.png' }
    ],
    [
      'meta',{ name: 'google-site-verification', content: 'rBr3QpOiV6jhzWBKMvyt2NUZOPlgtVBms1Fmq6u--1s' }
    ],
    [
      'meta',{ name: 'msvalidate.01', content: '2F1791A628BF53E1505F40AA9EBF45AD' }
    ]
  ],
  plugins: [
    slimsearchPlugin({
      indexContent: true,
      suggestion: true,
      locales: {
        '/': {
          placeholder: '搜索',
        }
      },
    }),
    feedPlugin({
      hostname: 'https://weekly.shawnxie.top',
      rss: true,
      count: 100000,
    }),
    umamiAnalyticsPlugin({
      id: '3b366c06-d035-411e-a013-8efbabbdad43',
      link: 'https://cloud.umami.is/script.js'
    }),
    // 放到最后
    cachePlugin({
      type: 'filesystem',
    }),
  ],
})
