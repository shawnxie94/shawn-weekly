import { getContentSidebar, getYearSidebar } from './utils/sidebar'

export const sidebar = {
  displayAllHeaders: false,
  '/': [
    {
      text: '主页',
      collapsible: true,
      link: '/'
    },
    {
      text: '总结',
      prefix: 'collection/',
      collapsible: true,
      children: getYearSidebar(),
    },
    {
      text: '周刊',
      prefix: 'content/',
      collapsible: true,
      children: getContentSidebar(),
    },
  ],
}
