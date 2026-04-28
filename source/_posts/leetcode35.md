---
title: leetcode35
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-02-22 10:45:57
tags: ['查找','二分查找']
---

# 题目
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 `O(log n)` 的算法。

## 输入
nums = [1,3,5,6], target = 5
## 输出
2

## 输入
nums = [1,3,5,6], target = 2
## 输出
1

# 思路
- 给出一个已经从小到大排序后的数组，要求在数组中找到插入 target 元素的位置。 
- 经典的二分搜索的变种题，在有序数组中找到最后一个比 target 小的元素。

# 代码
```go
func searchInsert(nums []int, target int) int {
    var low,high int=0,len(nums)
    var mid int = low+((high-low)>>1)
    for low<high {//注意是小于
        if nums[mid]==target{
            return mid
        }else if nums[mid]<target{
            low = mid+1
        }else{
            high=mid
        }
        mid = low+(high-low)>>1
    }
    return low
}
```