---
title: leetcode977
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-02-22 11:08:39
tags: [双指针]
---


# 题目
给你一个按 `非递减顺序` 排序的整数数组 `nums`，返回 `每个数字的平方` 组成的新数组，要求也按 `非递减顺序` 排序。

<!-- more -->
## 输入
nums = [-4,-1,0,3,10]
## 输出
[0,1,9,16,100]
## 解释
平方后，数组变为 [16,1,0,9,100]  
排序后，数组变为 [0,1,9,16,100]

# 解题思路
- 有序（通过有序降低复杂度）
- 1、平方大的数从最小或者最大产生，直接从数组最后一位开始生成
- 2、找到负数与非负数分界，指针一减一加。每次比较两指针，从头生成，低序。

# 我的代码
```go
func sortedSquares(nums []int) []int {
	//注意ans []int若长度为0，也就是nil。直接索引将会报错。
	//刁钻案例[0],[-5,-3,-2,-1](不能通过查找，非负元素记录下标实现)
	var ans []int
	var i int = 0
	for i=0;i<len(nums);i++{
		if(nums[i]>0) {
			break
		}
	}
	var pos1,pos2 int = i-1,i
	i = 0
	for pos1>=0&&pos2<len(nums){
		if nums[pos1]*nums[pos1]>nums[pos2]*nums[pos2]{
			ans = append(ans,nums[pos2]*nums[pos2])
			pos2++
		}else{
			ans = append(ans,nums[pos1]*nums[pos1])
			pos1--
		}
	}
	for pos1>=0{
		ans = append(ans,nums[pos1]*nums[pos1])
		pos1--
	}
	for pos2<len(nums){
		ans = append(ans,nums[pos2]*nums[pos2])
		pos2++
	}
	return ans
}
```
# 代码2
```go
func sortedSquares(A []int) []int {
ans := make([]int, len(A))
for i, k, j := 0, len(A)-1, len(ans)-1; i <= j; k-- {
    if A[i]*A[i] > A[j]*A[j] {
      ans[k] = A[i] * A[i]
      i++
    } else {
        ans[k] = A[j] * A[j]
        j--
    }
    return ans 
}

```

# 代码3
```go
func sortedSquares(nums []int) []int {
    n := len(nums)
    lastNegIndex := -1
    for i := 0; i < n && nums[i] < 0; i++ {
        lastNegIndex = i
    }

    ans := make([]int, 0, n)
    for i, j := lastNegIndex, lastNegIndex+1; i >= 0 || j < n; {
        if i < 0 {
            ans = append(ans, nums[j]*nums[j])
            j++
        } else if j == n {
            ans = append(ans, nums[i]*nums[i])
            i--
        } else if nums[i]*nums[i] < nums[j]*nums[j] {
            ans = append(ans, nums[i]*nums[i])
            i--
        } else {
            ans = append(ans, nums[j]*nums[j])
            j++
        }
    }

    return ans
}
```