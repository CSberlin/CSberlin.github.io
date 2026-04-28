---
title: leetcode2044
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-03-18 23:27:24
tags: ["数组","回溯","位运算","状态DP"]
---

## 题目
给你一个整数数组 nums ，请你找出 nums 子集 按位或 可能得到的 最大值 ，并返回按位或能得到最大值的 不同非空子集的数目 。
如果数组 a 可以由数组 b 删除一些元素（或不删除）得到，则认为数组 a 是数组 b 的一个 子集 。如果选中的元素下标位置不一样，则认为两个子集 不同 。
对数组 a 执行 按位或 ，结果等于 a[0] OR a[1] OR ... OR a[a.length - 1]（下标从 0 开始）。
<!-- more -->

## 样例
输入：nums = [3,1]  
输出：2  
解释：子集按位或能得到的最大值是 3 。有 2 个子集按位或可以得到 3 ：  
- [3]
- [3,1]

输入：nums = [2,2,2]  
输出：7  
解释：[2,2,2] 的所有非空子集的按位或都可以得到 2 。总共有 23 - 1 = 7 个子集。  

输入：nums = [3,2,1,5]  
输出：6  

## 思路
- 1 <= nums.length <= 16
- 1 <= nums[i] <= 10^5

> 1. 暴力: 遍历数组中每个元素，选每个元素选或者不选，总共2^16个状态。符合结果时，计数器增加。
```go
func countMaxOrSubsets(nums []int) int {
    maxOr := 0
    count := 0
    for i:=1;i<(1<<len(nums));i++{ //从第0位到最长第16位
        or := 0
        for j:=0;j<len(nums);j++{ //遍历最长16位
            if((i>>j)&1==1){ //判断该数取还是不取
                or = or | nums[j]
            }
        }
        if (maxOr<or){
            maxOr = or
            count = 1
        }else if maxOr==or{
            count++
        }
    }
    return count
}
```
> 2. DFS: 
- 路径: 目前已经做了的选择集合
- 选择列表: 还有哪些列表可选
- 结束条件

```go
func countMaxOrSubsets(nums []int) (cnt int) {
    maxOr := 0
    for _,val := range nums{
        maxOr = maxOr|val
    }
    
    var dfs func(int,int)
    dfs = func(pos,or int){
        if or==maxOr{
            // 剪枝 
            cnt+=1<<(len(nums)-pos)
            return
        }
        if pos==len(nums){// 结束条件
            return
        }

        // 选择
        dfs(pos+1,or|nums[pos])
        dfs(pos+1,or)
    }
    dfs(0,0)
    return
}
```


