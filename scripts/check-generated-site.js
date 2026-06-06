const assert = require('assert');
const fs = require('fs');
const path = require('path');
const Hexo = require('hexo');
const { stripHTML } = require('hexo-util');
const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');
const { CHTML } = require('mathjax-full/js/output/chtml.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');

const fixtureMarker = 'rendering-acceptance-fixture';

async function checkRenderingFixture(rootDir) {
  const fixturePath = path.join(rootDir, 'test', 'fixtures', 'rendering.md');
  const hexo = new Hexo(rootDir, { silent: true });
  await hexo.init();

  try {
    const rendered = await hexo.post.render(fixturePath, {
      source: fixturePath,
      excerpt: ''
    });
    const content = rendered.content;

    assert(content.includes(fixtureMarker), 'rendering fixture content is missing');
    assert(content.includes('<span class="github-emoji"'), 'fixture emoji was not converted to GitHub emoji output');
    assert(!content.includes(':rocket:'), 'fixture still contains the unconverted emoji shortcode');
    assert(content.includes('<figure class="highlight js">'), 'fixture code block was not highlighted');
    assert(stripHTML(content).includes('const answer = 42;'), 'fixture code block content is missing');

    const adaptor = liteAdaptor();
    RegisterHTMLHandler(adaptor);
    const document = mathjax.document(content, {
      InputJax: new TeX({ packages: AllPackages }),
      OutputJax: new CHTML()
    });
    document.render();
    const typeset = adaptor.outerHTML(adaptor.root(document.document));
    const containers = typeset.match(/<mjx-container\b/g) || [];

    assert.strictEqual(containers.length, 2, 'fixture inline and block formulas did not both generate mjx-container');
    assert(/<mjx-container\b(?![^>]*\bdisplay=)/.test(typeset), 'fixture inline formula did not generate an inline mjx-container');
    assert(/<mjx-container\b[^>]*\bdisplay="true"/.test(typeset), 'fixture block formula did not generate a display mjx-container');
  } finally {
    await hexo.exit();
  }
}

async function checkGeneratedSite() {
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
  const publishedFixture = fs.readdirSync(publicDir, { recursive: true })
    .filter((relativePath) => /\.(?:html|xml)$/.test(relativePath))
    .find((relativePath) => read(relativePath).includes(fixtureMarker));
  assert.strictEqual(publishedFixture, undefined, `rendering fixture leaked into public output: ${publishedFixture}`);

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

  await checkRenderingFixture(rootDir);

  console.log('Checked generated site output and fixture rendering for MathJax, emoji, and code blocks.');
}

if (require.main === module) {
  checkGeneratedSite().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
