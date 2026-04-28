---
title: leetcode16
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-03-18 23:21:46
tags: ["双指针","查找","数组"]
---

## 题目
给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在恰好一个解。
<!-- more -->

## 样例
输入：nums = [-1,2,1,-4], target = 1  
输出：2  
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。  

输入：nums = [0,0,0], target = 1  
输出：0  

- 3 <= nums.length <= 1000
- -1000 <= nums[i] <= 1000
- -10^4 <= target <= 10^4

## 思路
时间复杂度O(N^2)
空间复杂度O(len(nums))
- 注意衡量最接近时使用绝对值
- 先排序，倒数两个元素查找使用双指针

## 代码
```go
func threeSumClosest(nums []int, target int) int {
	var desnums []int
	desnums = nums
	sort.Ints(desnums)
	diff := 20005
	ans := 0
	for i := 0; i < len(desnums); i++ {
		for j, k := i+1, len(desnums)-1; j < k; {
			distance := abs(desnums[i] + desnums[j] + desnums[k] - target)
			tmp := desnums[i] + desnums[j] + desnums[k] - target
			if distance == 0 {
				return distance + target
			}
			if distance < diff {
				diff = distance
				ans = tmp + target
			}
			if tmp>0{
				k--
			}else{
				j++
			}
		}
	}
	return ans
}

func abs(num int) int {
	if num >= 0 {
		return num
	}
	return -num
}
```


