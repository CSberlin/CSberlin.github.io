---
title: leetcode39
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-26 23:07:53
tags: ["回溯"]
---

## 题目
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 
对于给定的输入，保证和为 target 的不同组合数少于 150 个。
<!-- more -->

## 样例
- 1 <= candidates.length <= 30
- 1 <= candidates[i] <= 200
- candidate 中的每个元素都 互不相同
- 1 <= target <= 500

输入：candidates = [2,3,6,7], target = 7  
输出：[[2,2,3],[7]]  
输入: candidates = [2,3,5], target = 8  
输出: [[2,2,2,2],[2,3,3],[3,5]]  
输入: candidates = [2], target = 1  
输出: []

## 思路
1. 经典回溯，保证输出不重复
2. 排序后剪枝

## 代码
```go
func combinationSum(candidates []int, target int) (ans [][]int) {
    var dfs func(int,int)
    tmpSlice := []int{}
    sort.Ints(candidates)
    dfs = func(index,target int){
        if target==0{
            ans = append(ans,append([]int{}, tmpSlice...))
            return
        }
        for i:=index;i<len(candidates);i++{ // i从index开始遍历，保证答案不重复
            if target-candidates[i]<0{ //预剪枝
                break
            }
            tmpSlice = append(tmpSlice,candidates[i])
            dfs(i,target-candidates[i])
            tmpSlice = tmpSlice[:len(tmpSlice)-1]
        }
    }
    dfs(0,target)
    return
}
```