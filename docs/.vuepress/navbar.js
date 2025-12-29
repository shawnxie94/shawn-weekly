import { getContentSidebar, getYearSidebar } from './utils/sidebar'

export const navbar = [
  {
    text: '主页',
    link: '/'
  },
  {
    text: '目录',
    prefix: '/content/',
    children: getContentSidebar(),
  },
  {
    text: '总结',
    prefix: '/collection/',
    children: getYearSidebar(),
  },
  {
    text: '博客',
    link: 'https://shawnxie.top/',
  },
  {
    text: '订阅',
    link: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwODY0ODQzOQ==&action=getalbum&album_id=3492416248238096386#wechat_redirect',
  },
]
