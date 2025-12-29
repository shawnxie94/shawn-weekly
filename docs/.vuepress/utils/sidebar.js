import fs from 'fs';
import path from 'path';

const getPageTitle = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const titleMatch = fileContent.match(/^#\s+(.*)$/m);
  if (!titleMatch) return null;
  
  let title = titleMatch[1];
  const shortTitleMatch = title.match(/技术周刊（第 (\d+) 期）：(.+)/);
  if (shortTitleMatch) {
    title = `第 ${shortTitleMatch[1]} 期：${shortTitleMatch[2]}`;
  }
  return title;
};

export const getContentSidebar = () => {
  const contentDir = path.resolve(__dirname, '../../content');
  const sidebar = [];
  const years = fs.readdirSync(contentDir)
    .filter(year => fs.statSync(path.join(contentDir, year)).isDirectory() && year !== 'picture')
    .sort((a, b) => parseInt(b) - parseInt(a));
    
  years.forEach(year => {
    const yearSidebar = { text: year, prefix: `${year}/`, collapsible: true, children: [] };
    fs.readdirSync(path.join(contentDir, year)).forEach(file => {
      if (!file.endsWith('.md')) return;
      
      const filePath = path.join(contentDir, year, file);
      const title = getPageTitle(filePath);
      const link = `${path.basename(file, path.extname(file))}.md`;
      
      if (title) {
        yearSidebar.children.push({ text: title, link });
      }
    });
    
    yearSidebar.children.sort((a, b) => {
      const numA = parseInt(a.text.match(/第 (\d+) 期/)[1], 10);
      const numB = parseInt(b.text.match(/第 (\d+) 期/)[1], 10);
      return numB - numA;
    });
    
    sidebar.push(yearSidebar);
  });
  
  return sidebar;
};

export const getYearSidebar = () => {
  const collectionDir = path.resolve(__dirname, '../../collection');
  const sidebar = [];
  
  const files = fs.readdirSync(collectionDir)
    .filter(file => path.extname(file) === '.md')
    .sort((a, b) => {
      const yearA = parseInt(path.basename(a, '.md'));
      const yearB = parseInt(path.basename(b, '.md'));
      return yearB - yearA;
    });
  
  files.forEach(file => {
    const filePath = path.join(collectionDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const titleMatch = fileContent.match(/^#\s+(.*)$/m);
    const title = titleMatch ? titleMatch[1] : `${path.basename(file, '.md')}年总结`;
    sidebar.push({ text: title, link: `${path.basename(file)}` });
  });
  
  return sidebar;
};
