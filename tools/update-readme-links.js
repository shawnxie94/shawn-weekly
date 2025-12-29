#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const contentDir = path.join(projectRoot, 'docs/content');
const collectionDir = path.join(projectRoot, 'docs/collection');
const readmePath = path.join(projectRoot, 'docs/README.md');

function getLatestIssue() {
  const years = fs.readdirSync(contentDir)
    .filter(f => fs.statSync(path.join(contentDir, f)).isDirectory())
    .sort((a, b) => parseInt(b) - parseInt(a));

  if (years.length === 0) return null;

  const latestYear = years[0];
  const issues = fs.readdirSync(path.join(contentDir, latestYear))
    .filter(f => f.endsWith('.md'))
    .map(f => parseInt(f.replace('.md', '')))
    .sort((a, b) => b - a);

  if (issues.length === 0) return null;

  return {
    year: latestYear,
    issue: issues[0],
    link: `/content/${latestYear}/${issues[0]}.html`
  };
}

function getLatestSummary() {
  const summaries = fs.readdirSync(collectionDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const year = parseInt(f.replace('.md', ''));
      return { year, file: f };
    })
    .filter(item => !isNaN(item.year))
    .sort((a, b) => b.year - a.year);

  if (summaries.length === 0) return null;

  const latest = summaries[0];
  return {
    year: latest.year,
    link: `/collection/${latest.file.replace('.md', '.html')}`
  };
}

function updateReadme(latestIssue, latestSummary) {
  let content = fs.readFileSync(readmePath, 'utf-8');

  const issueMatch = content.match(/(text: 新一期\s+link: )(.*?)(\n)/);
  const summaryMatch = content.match(/(text: 总结\s+link: )(.*?)(\n)/);

  if (issueMatch && latestIssue) {
    content = content.replace(
      issueMatch[1] + issueMatch[2] + issueMatch[3],
      issueMatch[1] + latestIssue.link + issueMatch[3]
    );
    console.log(`✅ Updated latest issue link: ${latestIssue.link} (Year ${latestIssue.year}, Issue ${latestIssue.issue})`);
  }

  if (summaryMatch && latestSummary) {
    content = content.replace(
      summaryMatch[1] + summaryMatch[2] + summaryMatch[3],
      summaryMatch[1] + latestSummary.link + summaryMatch[3]
    );
    console.log(`✅ Updated latest summary link: ${latestSummary.link} (Year ${latestSummary.year})`);
  }

  fs.writeFileSync(readmePath, content, 'utf-8');
}

function main() {
  console.log('🔍 Scanning for latest articles...\n');

  const latestIssue = getLatestIssue();
  const latestSummary = getLatestSummary();

  if (latestIssue) {
    console.log(`📰 Latest issue: Year ${latestIssue.year}, Issue ${latestIssue.issue}`);
    console.log(`   Link: ${latestIssue.link}`);
  } else {
    console.log('❌ No issues found');
  }

  if (latestSummary) {
    console.log(`\n📊 Latest summary: Year ${latestSummary.year}`);
    console.log(`   Link: ${latestSummary.link}`);
  } else {
    console.log('❌ No summaries found');
  }

  if (latestIssue || latestSummary) {
    updateReadme(latestIssue, latestSummary);
    console.log('\n✨ README.md has been updated!');
  }
}

main();
