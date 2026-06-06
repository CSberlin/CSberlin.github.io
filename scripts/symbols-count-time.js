const { stripHTML } = require('hexo-util');

const config = Object.assign({
  symbols: true,
  time: true,
  total_symbols: true,
  total_time: true,
  exclude_codeblock: false,
  awl: 4,
  wpm: 275,
  suffix: 'mins.'
}, hexo.config.symbols_count_time);

function symbols(post) {
  return post.length;
}

function formatTime(minutes, suffix) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.max(1, Math.floor(minutes - hours * 60));
  return hours < 1
    ? `${remainingMinutes} ${suffix}`
    : `${hours}:${String(remainingMinutes).padStart(2, '0')}`;
}

function totalSymbols(site) {
  return site.posts.reduce((total, post) => total + symbols(post), 0);
}

if (config.symbols) {
  hexo.extend.helper.register('symbolsCount', (post) => {
    const count = symbols(post);
    if (count > 9999) return `${Math.round(count / 1000)}k`;
    if (count > 999) return `${Math.round(count / 100) / 10}k`;
    return count;
  });
}

if (config.time) {
  hexo.extend.helper.register('symbolsTime', (post, awl = config.awl, wpm = config.wpm, suffix = config.suffix) => {
    return formatTime(Math.round(symbols(post) / (awl * wpm)), suffix);
  });
}

if (config.total_symbols) {
  hexo.extend.helper.register('symbolsCountTotal', (site) => {
    const count = totalSymbols(site);
    return count < 1000000
      ? `${Math.round(count / 1000)}k`
      : `${Math.round(count / 100000) / 10}m`;
  });
}

if (config.total_time) {
  hexo.extend.helper.register('symbolsTimeTotal', (site, awl = config.awl, wpm = config.wpm, suffix = config.suffix) => {
    return formatTime(Math.round(totalSymbols(site) / (awl * wpm)), suffix);
  });
}

if (config.symbols || config.time || config.total_symbols || config.total_time) {
  hexo.extend.filter.register('after_post_render', (data) => {
    const content = config.exclude_codeblock
      ? data.content.replace(/<pre>.*?<\/pre>/gs, '')
      : data.content;
    data.length = stripHTML(content).replace(/\s+/g, '').length;
  }, 0);
}
