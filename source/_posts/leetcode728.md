---
title: leetcode728
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-22 15:43:09
tags: ["简单模拟"]
---

## 题目
自除数 是指可以被它包含的每一位数整除的数。  
例如，128 是一个 自除数 ，因为 128 % 1 == 0，128 % 2 == 0，128 % 8 == 0。  
自除数 不允许包含 0 。  
给定两个整数 left 和 right ，返回一个列表，列表的元素是范围 [left, right] 内所有的 自除数 

## 样例
输入：left = 1, right = 22  
输出：[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]  
输入：left = 47, right = 85  
输出：[48, 55, 66, 77]

## 思路
简单模拟

## 代码
```go
func isSelfDividing(num int) bool {
    for x := num; x > 0; x /= 10 {
        if d := x % 10; d == 0 || num%d != 0 {
            return false
        }
    }
    return true
}

func selfDividingNumbers(left, right int) (ans []int) {
    for i := left; i <= right; i++ {
        if isSelfDividing(i) {
            ans = append(ans, i)
        }
    }
    return
}
```