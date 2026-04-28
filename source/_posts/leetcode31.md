---
title: leetcode31
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-26 10:36:18
tags: ["简单模拟"]
---
整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。

例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。
<!-- more -->
例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。
给你一个整数数组 nums ，找出 nums 的下一个排列。

必须 原地 修改，只允许使用额外常数空间。

## 样例
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 100
输入：nums = [1,2,3]  
输出：[1,3,2]  
输入：nums = [3,2,1]  
输出：[1,2,3]  
输入：nums = [1,1,5]  
输出：[1,5,1]

## 思路
1. 从数组尾部len(nums)-1开始寻找第一个出现 nums[i+1] > nums[i] 的位置 , i+1以后的元素呈降序排列
2. 从数组尾部len(nums)-1到i+1寻找第一个下标j，使得nums[j] > nums[i]，交换nums[j],nums[i]
3. 随后将i+1到len(nums)-1改成升序
4. 如果i=-1整体成降序，直接反转整个数组

## 代码
```go
func nextPermutation(nums []int)  {
    i := 0
    n := len(nums)
    for i=n-2;i>=0;i--{
        if nums[i+1]>nums[i]{
            break
        }
    }
    if i==-1{
        reverse(nums,0,n-1)
    }else{
        for j:=n-1;j>i;j--{
            if nums[j]>nums[i]{
                nums[i],nums[j] = nums[j],nums[i]
                reverse(nums,i+1,n-1)
                break
            }
        }
    }
}

func reverse(nums []int,left,right int){
    for left<right{
        nums[left],nums[right] = nums[right],nums[left]
        left++
        right--
    }
}
```