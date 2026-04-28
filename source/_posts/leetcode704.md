---
title: leetcode704
toc: true
mathjax: true
categories: leetcode
date: 2022-02-22 10:31:45
tags:
- 查找
- 二分查找
---- 

# 题目
给定一个 `n` 个元素有序的（升序）整型数组 `nums` 和一个目标值 target ，写一个函数搜索 `nums` 中的 `target`，如果目标值存在返回下标，否则返回 `-1`。

<!-- more -->

## 样例
输入 nums = [-1,0,3,5,9,12], target = 9  
输出 4  
解释 9 出现在 nums 中并且下标为 4

# 解题思路
二分查找模板题

# 代码1
```go
func search(nums []int, target int) int {
    var low,high int = 0,len(nums)-1
    var mid = (low-high)>>1+high
    for low<=high{
        if nums[mid]==target{
            return mid
        }else if nums[mid]<target{
            low = mid+1
        }else{
            high = mid-1
        }
        mid = (low-high)>>1+high
    }
    return -1
}
```