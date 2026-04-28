---
title: leetcode18
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2021-04-20 16:55:20
tags: ["双指针","查找","数组"]
---

## 题目
给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
<!-- more -->
- 0 <= a, b, c, d < n
- a、b、c 和 d 互不相同
- nums[a] + nums[b] + nums[c] + nums[d] == target
你可以按 任意顺序 返回答案 。

## 样例
输入：nums = [1,0,-1,0,-2,2], target = 0  
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]  

输入：nums = [2,2,2,2,2], target = 8  
输出：[[2,2,2,2]]

- 1 <= nums.length <= 200
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9

## 思路
保证每层循环的下一个遍历的元素不与上一个重复。最后需要遍历的两个元素通过双指针。  
最好先复制一个切片后再开始操作

## 代码
```go
func fourSum(nums []int, target int) (ans [][]int) {
    var copynums = nums
    sort.Ints(copynums)
    for i:=0;i<len(copynums);i++{
        if i>0&&copynums[i]==copynums[i-1]{ // 保证遍历的有序数组元素不与上一个相同
            continue
        }
        for j:=i+1;j<len(copynums);j++{
            if j>i+1&&copynums[j]==copynums[j-1]{
                continue
            }
            for k,l:=j+1,len(copynums)-1;k<l;{
                if k>j+1&&copynums[k]==copynums[k-1]{
                    k++
                    continue
                }
                tmp := copynums[i]+copynums[j]+copynums[k]+copynums[l]
                if tmp==target{
                    ans = append(ans,[]int{copynums[i],copynums[j],copynums[k],copynums[l]})
                    k++
                }else if tmp>target{
                    l--
                }else{
                    k++
                }
            }
        }
    }
    return
}
```
