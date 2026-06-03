# HCs blog

这是基于 Hexo + NexT 的个人博客仓库。当前仓库已补齐 2021 年使用的 NexT 主题模板，2026 年及之后的新文章会按同一模板生成。

## 从 GitHub clone 后使用

```bash
git clone https://github.com/CSberlin/CSberlin.github.io.git
cd CSberlin.github.io
npm install
npm run check
npm run clean
npm run build
npm run server
```

本地预览默认地址：`http://localhost:4000`。

## 新建文章

```bash
npx hexo new "文章标题"
```

生成的 Markdown 位于 `source/_posts/文章标题.md`，默认 Front Matter 来自 `scaffolds/post.md`，包含：

- `toc: true`：显示目录
- `mathjax: true`：支持数学公式
- `categories` / `tags`：分类和标签
- `copyright: true`：文章版权信息

写文章时必须保留文件开头的 Front Matter。`title` 和 `date` 会决定页面标题、发表时间和生成路径；如果缺失，Hexo 会显示“未命名”，并可能使用文件修改时间。

文章正文不需要添加“本文由 AI 自动生成”等署名；`npm run check` 会拦截这类固定尾注，避免发布到线上。

写完后执行：

```bash
npm run check
npm run clean
npm run build
```

生成结果会输出到 `public/`，固定链接格式为 `/:year/:month/:day/:title/`，例如 `date: 2026-04-11 17:10:00` 会生成到 `public/2026/04/11/...`。

## 日常写博客流程

每次准备写新文章时，建议按下面顺序操作：

```bash
# 1. 进入博客仓库
cd CSberlin.github.io

# 2. 拉取最新源码，避免多台电脑写作时冲突
git pull

# 3. 新建文章
npx hexo new "文章标题"

# 4. 编辑 source/_posts/文章标题.md

# 5. 检查文章 Front Matter
npm run check

# 6. 清理并重新生成静态站点
npm run clean
npm run build

# 7. 本地预览
npm run server
```

本地确认没问题后，提交源码并推送到 GitHub：

```bash
# 提交 Markdown、配置、主题等源码改动
git add .
git commit -m "add post: 文章标题"
git push
```

推送到 `master` 后，GitHub Actions 会自动构建 Hexo 并发布到 GitHub Pages。

注意：不要手动编辑 `public/` 里的文件。`public/` 是 Hexo 构建产物，应该通过 `npm run build` 自动生成。

## 在另一台电脑写博客

第一次在新电脑上写博客，需要先准备环境：

1. 安装 Git。
2. 安装 Node.js，建议使用 Node.js LTS 版本。
3. 配置 GitHub SSH key 或确认 HTTPS 推送权限可用。

然后执行：

```bash
# 1. 克隆源码仓库
git clone https://github.com/CSberlin/CSberlin.github.io.git

# 2. 进入仓库
cd CSberlin.github.io

# 3. 安装依赖
npm install

# 4. 检查文章元数据
npm run check

# 5. 本地构建验证
npm run clean
npm run build

# 6. 本地预览
npm run server
```

之后就可以按“日常写博客流程”新建、预览、提交和发布文章。

多台电脑协作时，写文章前先 `git pull`，写完文章后及时 `git push`，确保另一台电脑能拿到最新源码。

## Front Matter 示例

```yaml
---
title: 文章标题
date: 2026-04-11 17:10:00
toc: true
mathjax: true
categories: 分类名
tags:
  - 标签1
  - 标签2
copyright: true
---
```

## 发布

当前仓库采用 GitHub Actions 发布。日常只需要把源码推送到 `master`：

```bash
git push
```

推送后，GitHub 会自动执行 `.github/workflows/pages.yml`：

1. 安装依赖。
2. 执行 `npm run check` 检查文章元数据。
3. 执行 `npm run clean && npm run build` 生成 `public/`。
4. 将 `public/` 作为 GitHub Pages 站点发布。

不需要手动提交或编辑 `public/`，也不需要本地执行 `npm run deploy`。
