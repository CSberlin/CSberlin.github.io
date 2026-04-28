---
title: leetcode9
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-27 15:24:40
tags: ["简单模拟"]
---

## 题目
给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

## 样例
- -2^31 <= x <= 2^31 - 1
输入：x = 121  
输出：true  
输入：x = -121  
输出：false  
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。  
输入：x = 10  
输出：false  
解释：从右向左读, 为 01 。因此它不是一个回文数。

## 思路
无需将字符串转化为数组后进行比较，注意尾部为0的情况
- 直接将数字后半部分进行反转，若为回文则与前半部分相等
- 或者将整个数字反转，反转后溢出则false，不溢出且相等则true

## 代码
```go
func isPalindrome(x int) bool {
    if x<0 || (x%10==0 && x !=0 ){ // 要对尾部为0数做处理
        return false
    }
    //反转一半
    reverseX := 0
    for x > reverseX{
        reverseX = reverseX * 10 + x%10
        x /= 10
    }
    return x==reverseX||x==reverseX/10 //分奇偶
}
```