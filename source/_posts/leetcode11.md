---
title: leetcode11
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-03-09 16:47:05
tags: ["双指针"]
---

## 题目
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。说明：你不能倾斜容器。  

<img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg">

## 样例
输入：[1,8,6,2,5,4,8,3,7]  
输出：49   
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。具体可参考leetcode官方题解。

输入：height = [1,1]  
输出：1

## 说明
- n == height.length
- 2 <= n <= 10^5
- 0 <= height[i] <= 10^4
左右指针分别指向数组的左右两端，移动数字较小的那个指针。移动大的话，如果移动后的值变大，还是取决于小的。如果变小，那就更小了。

## 代码
```go
func maxArea(height []int) int {
    left,right:=0,len(height)-1
    ans:=0
    for left<right{
        tmp:=min(height[left],height[right])*(right-left)
        if tmp>ans{
            ans = tmp
        }
        if(height[left]>height[right]){
            right--
        }else{
            left++
        }
    }
    return ans
}

func min(a,b int)int{
    if a>b{
        return b
    }
    return a
}
```
