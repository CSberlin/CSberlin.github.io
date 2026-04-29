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
  - superpowers
  - AI coding
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

## 与 Superpowers 的横向对比

如果把 Claude Code 生态里的工具分成两类，**oh-my-claudecode** 更偏“执行编排”，而 **Superpowers** 更偏“工程方法论”。前者关心如何把一个复杂任务拆分给多个 agent 并行推进，后者关心如何让 Claude Code 按更稳定、更可验证的开发流程工作。

两者并不是简单的替代关系，更像是两个不同层面的增强：OMC 提高吞吐量，Superpowers 提高过程质量。

| 维度 | oh-my-claudecode | Superpowers |
| --- | --- | --- |
| 核心定位 | 多智能体编排、自动化执行 | 结构化开发流程、TDD、调试、评审 |
| 主要目标 | 让多个 Claude/Codex/Gemini 实例协同完成任务 | 让 Claude Code 按严谨工程流程推进任务 |
| 典型能力 | `/autopilot`、`/team`、`/ccg`、多模型协作 | brainstorming、TDD、debugging、execute-plan、code review |
| 优势 | 并行能力强，适合大任务拆分 | 稳定性更强，质量控制更好 |
| 代价 | token 消耗更高，结果合并成本更高 | 流程更重，单次任务启动更慢 |
| 适合场景 | 多模块开发、批量修复、大规模重构、并行评审 | 需求澄清、复杂 bug、测试驱动开发、严肃工程交付 |
| 性能特征 | 可能缩短等待时间，但增加总调用成本 | 可能增加前期时间，但减少返工成本 |

### 效果差异

OMC 的效果主要来自“并行”。当任务可以被自然拆成多个边界清晰的子任务时，多个 agent 可以同时推进，整体等待时间会明显下降。例如多模块重构、批量修复 lint/test 问题、并行阅读不同代码区域，都是适合 OMC 的场景。

但并行不等于一定更好。多 agent 同时工作时，容易出现三个问题：

1. **重复劳动**：不同 agent 可能分析同一段上下文，造成 token 浪费。
2. **结果冲突**：多个 agent 修改相邻文件或同一抽象层时，合并成本会上升。
3. **上下文漂移**：每个 agent 看到的信息不完全一致，最后产出的方案可能风格不同。

Superpowers 的效果则主要来自“约束”。它通过 brainstorming、计划、TDD、debug、review 等步骤限制模型直接跳到实现阶段。这样做的短期速度不一定最快，但更容易得到可解释、可验证、可维护的结果。

换句话说，OMC 更像“提高产能的并行执行器”，Superpowers 更像“降低跑偏概率的工程护栏”。

### 性能与成本分析

从性能角度看，需要区分两个指标：

- **Wall-clock time**：用户等待任务完成的真实时间。
- **Total compute/token cost**：所有 agent 合计消耗的模型调用成本。

OMC 可能显著降低 wall-clock time。例如一个任务被拆成 4 个独立模块，单 agent 串行需要 40 分钟，多 agent 并行可能 15-20 分钟完成。但是总 token 消耗通常会上升，因为每个 agent 都需要读取上下文、制定计划、执行和验证。

Superpowers 往往不会追求最短 wall-clock time。它会把时间花在需求澄清、测试设计、边界条件讨论和复盘上。短期看更慢，但如果任务复杂度高，后期返工更少，整体交付成本反而更低。

因此，两者的性能结论可以概括为：

| 目标 | 更适合的工具 | 原因 |
| --- | --- | --- |
| 快速探索方案 | OMC | 可以并行尝试多个方向 |
| 快速批量改代码 | OMC | 多 agent 可分文件/分模块执行 |
| 复杂需求澄清 | Superpowers | 更强调问题定义和验收标准 |
| 高质量重构 | Superpowers + OMC | 先定计划和测试，再并行执行 |
| 修疑难 bug | Superpowers | 系统化 debug 比盲目并行更重要 |
| 大规模代码审查 | OMC + Superpowers | 并行阅读，统一 review 标准 |

### 组合使用策略

最理想的方式不是二选一，而是组合使用：

1. **先用 Superpowers 做需求澄清**：明确目标、边界、验收标准和测试策略。
2. **再用 OMC 做任务拆分和并行执行**：把模块化、低耦合的部分交给多个 agent。
3. **最后回到 Superpowers 做 review 和验证**：统一检查代码质量、测试覆盖和设计一致性。

一个更稳的工作流可以是：

```text
brainstorm / plan
        ↓
拆分任务边界
        ↓
/team 并行执行
        ↓
统一合并与测试
        ↓
review / debug / polish
```

这个组合的核心思想是：**用 Superpowers 保证方向正确，用 OMC 提高执行吞吐量**。

## 使用建议

OMC 最适合处理“可以拆分、可以并行、结果容易合并”的任务。如果任务本身高度耦合，例如核心架构设计、复杂状态机重构、疑难线上 bug，盲目开多个 agent 反而可能制造噪音。

更推荐的实践是：

- 小任务：直接用 Claude Code 或 OMC 的 `/autopilot`。
- 中等任务：先手动描述清楚目标，再用 OMC 拆分执行。
- 大任务：先用结构化流程产出计划，再用 `/team` 并行执行。
- 高风险任务：必须保留人工 review、测试验证和回滚策略。

对个人开发者来说，OMC 的价值在于把“一个人盯着一个 AI 慢慢做事”变成“一个人管理多个 AI 同时推进”。但这也意味着用户角色发生变化：你不再只是提 prompt 的人，而更像一个任务调度者和结果审核者。

## 总结

oh-my-claudecode 降低了 Claude Code 的使用门槛，让开发者专注于“做什么”而非“怎么做”。它的核心价值不是替代 Claude Code，而是在 Claude Code 之上增加任务编排、多 agent 协作和多模型协同能力。

和 Superpowers 相比，OMC 更重执行效率，Superpowers 更重工程可靠性。前者适合提高吞吐量，后者适合降低返工率。真正高效的 AI coding 工作流，往往不是选择某一个工具，而是把“结构化思考”和“并行执行”结合起来：先把问题定义清楚，再让多个 agent 高效完成可拆分的部分，最后通过测试和 review 收敛质量。

---

*本文由 AI 自动生成*
