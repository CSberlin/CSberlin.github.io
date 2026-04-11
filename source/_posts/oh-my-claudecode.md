---
title: oh-my-claudecode - Claude Code 多智能体编排框架
date: 2026-04-11 17:10:00
categories:
  - AI
  - Claude Code
  - 工具
tags:
  - claude-code
  - multi-agent
  - orchestration
  - OMC
---

# oh-my-claudecode - Claude Code 多智能体编排框架

## 概述

**oh-my-claudecode (OMC)** 是一个为 Claude Code 设计的多智能体编排系统，让用户无需学习复杂的 Claude Code 用法，直接通过自然语言指令完成复杂任务。

> 项目地址: https://github.com/Yeachan-Heo/oh-my-claudecode
> 
> 官方网站: https://yeachan-heo.github.io/oh-my-claudecode-website
> 
> npm 包: [oh-my-claude-sisyphus](https://www.npmjs.com/package/oh-my-claude-sisyphus)

## 核心特性

### 🤖 Autopilot - 自动执行

只需描述你想要做什么，OMC 自动完成规划和执行：

```
/autopilot "build a REST API for managing tasks"
```

### 👥 Team 模式 - 多智能体协作

支持同时启动多个 Claude/Codex/Gemini 实例协同工作：

```bash
/team 3:executor "fix all TypeScript errors"
```

Team 执行流程：
- `team-plan` → 规划
- `team-prd` → 需求分析
- `team-exec` → 执行
- `team-verify` → 验证
- `team-fix` → 修复（循环）

### 💬 Deep Interview - 需求分析

使用苏格拉底式提问帮你理清需求：

```
/deep-interview "I want to build a task management app"
```

### 🔄 双入口设计

| 方式 | 命令 | 说明 |
|-----|------|------|
| 终端 CLI | `omc setup` | 安装 npm 包后使用 |
| 会话技能 | `/setup` | 在 Claude Code 会话中直接使用 |

## 安装使用

### 方式一：Marketplace 安装（推荐）

```bash
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
/plugin install oh-my-claudecode
```

### 方式二：npm 全局安装

```bash
npm i -g oh-my-claude-sisyphus@latest
omc setup
```

## 常用命令

| 命令 | 功能 |
|------|------|
| `/setup` | 初始化配置 |
| `/autopilot <任务>` | 自动执行任务 |
| `/team N:executor <任务>` | 启动 N 个执行者 |
| `/deep-interview <需求>` | 深度需求分析 |
| `/ccg <任务>` | Codex + Gemini 混合编排 |

## 项目结构

```
oh-my-claudecode/
├── agents/          # 智能体定义
├── bridge/          # CLI 桥接层
├── commands/        # 命令实现
├── skills/          # 会话技能
├── templates/       # 项目模板
├── docs/            # 文档
└── .claude-plugin/  # 插件配置
```

## 适用场景

- **快速开发**: 用自然语言描述需求，自动完成代码编写
- **代码审查**: 多实例并行审查不同模块
- **复杂任务**: 自动分解任务并分配给专业智能体
- **需求梳理**: 通过深度访谈理清模糊想法

## 总结

oh-my-claudecode 降低了 Claude Code 的使用门槛，让开发者专注于"做什么"而非"怎么做"。零学习曲线，开箱即用。

---

*本文由 AI 自动生成*