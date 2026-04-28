---
title: leetcode2055
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-03-08 15:56:39
tags: ["前缀和","二分查找"]
---

## 题目
给你一个长桌子，桌子上盘子和蜡烛排成一列。给你一个下标从 0 开始的字符串 s ，它只包含字符 '*' 和 '|' ，其中 '*' 表示一个 盘子 ，'|' 表示一支 蜡烛 。
<!-- more -->
同时给你一个下标从 0 开始的二维整数数组 queries ，其中 queries[i] = [lefti, righti] 表示 子字符串 s[lefti...righti] （包含左右端点的字符）。对于每个查询，你需要找到 子字符串中 在 两支蜡烛之间 的盘子的 数目 。如果一个盘子在 子字符串中 左边和右边 都 至少有一支蜡烛，那么这个盘子满足在 两支蜡烛之间 。

比方说，s = "||**||**|*" ，查询 [3, 8] ，表示的是子字符串 "*||**|" 。子字符串中在两支蜡烛之间的盘子数目为 2 ，子字符串中右边两个盘子在它们左边和右边 都 至少有一支蜡烛。
请你返回一个整数数组 answer ，其中 answer[i] 是第 i 个查询的答案。

## 样例
输入：s = "**|**|***|", queries = [[2,5],[5,9]]  
输出：[2,3]  
解释：  
- queries[0] 有两个盘子在蜡烛之间。
- queries[1] 有三个盘子在蜡烛之间。

## 解题思路
对于每个区间的查询，我们关心的是以下信息:  
左边端点右边第一个蜡烛的位置  
右边端点左边第一个蜡烛的位置  
这两个蜡烛之间有多少盘子

## 代码
```go
func platesBetweenCandles(s string, queries [][]int) []int {
    n := len(s)
    presum, lefts, rights := make([]int, n + 1), make([]int, n), make([]int, n)
    for i, j, l, r := 0, n - 1, -1, -1; i < n; i++{//  for循环中每次更改的元素只能有一个
        if s[i] == '*' {// golang中的字符串元素比较  
            presum[i + 1] = presum[i] + 1
        } else {
            presum[i + 1] = presum[i]
            l = i
        }
        if s[j] == '|' {
            r = j
        }
        lefts[i] = l
        rights[j] = r
        j--
    }
    ans := make([]int, len(queries))
    for i := 0; i < len(queries); i++ {
        if rights[queries[i][0]] >= 0 && lefts[queries[i][1]] >= 0 && lefts[queries[i][1]] > rights[queries[i][0]] {
            ans[i] = presum[lefts[queries[i][1]]] - presum[rights[queries[i][0]]]
        }
    }
    return ans
}
```

## 相似题目
leetcode 304, 303, 525, 724, 1004, 1154, 1480, 1588