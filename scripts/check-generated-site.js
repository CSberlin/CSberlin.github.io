const assert = require('assert');
const fs = require('fs');
const path = require('path');

function checkGeneratedSite() {
  const rootDir = path.join(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const read = (relativePath) => {
    const filePath = path.join(publicDir, relativePath);
    assert(fs.existsSync(filePath), `missing generated file: ${relativePath}`);
    return fs.readFileSync(filePath, 'utf8');
  };
  const packageJson = require(path.join(rootDir, 'package.json'));
  const searchGenerators = Object.keys(packageJson.dependencies)
    .filter((name) => name.startsWith('hexo-generator-search'));
  assert.deepStrictEqual(searchGenerators, ['hexo-generator-searchdb'], 'expected exactly one search generator');

  const searchOutputs = fs.readdirSync(publicDir, { recursive: true })
    .filter((relativePath) => path.basename(relativePath) === 'search.xml');
  assert.deepStrictEqual(searchOutputs, ['search.xml'], 'expected exactly one generated search.xml');

  const home = read('index.html');
  assert(home.includes('class="post-title-link"'), 'home page has no post links');
  assert(/title="本文字数"[\s\S]*?<span>[\d.]+k?<\/span>/.test(home), 'home page has no word count value');
  assert(/title="阅读时长"[\s\S]*?<span>(?:\d+ 分钟|\d+:\d{2})<\/span>/.test(home), 'home page has no reading time value');
  assert(home.includes('.github-emoji {'), 'GitHub emoji filter styles are missing');

  const post = read('2022/02/22/leetcode977/index.html');
  assert(post.includes('<title>leetcode977'), 'representative post title is missing');
  assert(post.includes('<figure class="highlight go">'), 'representative code block is missing');
  assert(/title="本文字数"[\s\S]*?<span>[\d.]+k?<\/span>/.test(post), 'post has no word count value');
  assert(/title="阅读时长"[\s\S]*?<span>(?:\d+ 分钟|\d+:\d{2})<\/span>/.test(post), 'post has no reading time value');
  assert(/title="站点总字数">[\d.]+[km]<\/span>/.test(post), 'site total word count is missing');
  assert(/title="站点阅读时长">(?:\d+ 分钟|\d+:\d{2})<\/span>/.test(post), 'site total reading time is missing');
  assert(post.includes('mathjax@3/es5/tex-mml-chtml.js'), 'MathJax 3 loader is missing');

  const feed = read('atom.xml');
  assert(feed.startsWith('<?xml version="1.0" encoding="utf-8"?>\n<feed '), 'feed is not Atom XML');
  assert(feed.includes('<entry>'), 'feed has no entries');

  const search = read('search.xml');
  assert(search.startsWith('<?xml version="1.0" encoding="utf-8"?>\n<search>'), 'search index is not XML');
  assert(search.includes('<title>leetcode977</title>'), 'search index is missing representative post');
  assert(search.includes('<content><![CDATA['), 'search index has no post content');

  console.log('Checked generated home, post, metadata, MathJax, emoji, feed, and unique search output.');
}

if (require.main === module) {
  checkGeneratedSite();
}
