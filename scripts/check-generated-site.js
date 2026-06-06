const assert = require('assert');
const fs = require('fs');
const path = require('path');
const Hexo = require('hexo');
const { JSDOM, ResourceLoader } = require('jsdom');

const fixtureMarker = 'rendering-acceptance-fixture';

async function generateRenderingFixture(rootDir) {
  const fixturePath = path.join(rootDir, 'test', 'fixtures', 'rendering.md');
  const tempDir = fs.mkdtempSync(path.join(rootDir, '.hexo-rendering-acceptance-'));
  const sourceDir = path.join(tempDir, 'source');
  const publicDir = path.join(tempDir, 'public');
  const hexo = new Hexo(rootDir, { silent: true, output: tempDir });

  try {
    fs.cpSync(path.join(rootDir, 'source'), sourceDir, { recursive: true });
    fs.copyFileSync(fixturePath, path.join(sourceDir, '_posts', 'rendering-acceptance-fixture.md'));

    await hexo.init();
    hexo.source_dir = sourceDir + path.sep;
    hexo.source.base = hexo.source_dir;
    hexo.public_dir = publicDir + path.sep;
    await hexo.call('generate', { force: true });

    const fixturePage = path.join(publicDir, 'rendering-acceptance-fixture', 'index.html');
    assert(fs.existsSync(fixturePage), 'generated rendering fixture page is missing');
    return fs.readFileSync(fixturePage, 'utf8');
  } finally {
    await hexo.exit();
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

async function checkRenderingFixture(rootDir) {
  const html = await generateRenderingFixture(rootDir);
  const mathjaxBundle = fs.readFileSync(require.resolve('mathjax-full/es5/tex-mml-chtml.js'));
  let mathjaxRequests = 0;

  class LocalMathJaxLoader extends ResourceLoader {
    fetch(url, options) {
      if (options.element?.tagName === 'SCRIPT' && /mathjax.*\/tex-mml-chtml\.js$/.test(url)) {
        mathjaxRequests++;
        return Promise.resolve(mathjaxBundle);
      }
      return null;
    }
  }

  const dom = new JSDOM(html, {
    url: 'https://example.test/rendering-acceptance-fixture/',
    resources: new LocalMathJaxLoader(),
    runScripts: 'dangerously'
  });

  try {
    const { document } = dom.window;
    assert(document.body.textContent.includes(fixtureMarker), 'generated fixture page content is missing');
    assert(document.querySelector('.github-emoji'), 'generated fixture emoji was not converted to GitHub emoji output');
    assert(!document.body.textContent.includes(':rocket:'), 'generated fixture still contains the unconverted emoji shortcode');
    assert(document.querySelector('figure.highlight.js'), 'generated fixture code block was not highlighted');
    assert(document.body.textContent.includes('const answer = 42;'), 'generated fixture code block content is missing');

    const deadline = Date.now() + 10000;
    while (!dom.window.MathJax?.startup?.promise && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert(dom.window.MathJax?.startup?.promise, 'generated fixture MathJax loader timed out');
    await dom.window.MathJax.startup.promise;

    const containers = [...document.querySelectorAll('mjx-container')];
    assert.strictEqual(mathjaxRequests, 1, 'generated fixture did not load MathJax exactly once');
    assert.strictEqual(containers.length, 2, 'generated fixture inline and block formulas did not both generate mjx-container');
    assert(containers.some((container) => !container.hasAttribute('display')), 'generated fixture inline formula did not generate an inline mjx-container');
    assert(containers.some((container) => container.getAttribute('display') === 'true'), 'generated fixture block formula did not generate a display mjx-container');
  } finally {
    dom.window.close();
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
  const feed = read('atom.xml');
  assert(feed.startsWith('<?xml version="1.0" encoding="utf-8"?>\n<feed '), 'feed is not Atom XML');
  assert(feed.includes('<entry>'), 'feed has no entries');

  const search = read('search.xml');
  assert(search.startsWith('<?xml version="1.0" encoding="utf-8"?>\n<search>'), 'search index is not XML');
  assert(search.includes('<title>leetcode977</title>'), 'search index is missing representative post');
  assert(search.includes('<content><![CDATA['), 'search index has no post content');

  await checkRenderingFixture(rootDir);

  console.log('Checked generated site output and actual NexT MathJax loader rendering for MathJax, emoji, and code blocks.');
}

if (require.main === module) {
  checkGeneratedSite().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
