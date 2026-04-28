---
title: leetcode693
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-22 15:27:09
tags: ["异或","位运算"]
---

## 题目
给定一个正整数，检查它的二进制表示是否总是 0、1 交替出现：
换句话说，就是二进制表示中相邻两位的数字永不相同。

## 思路
1. 遍历O(N)
2. 位运算O(1)，**利用+1异或生成全1**，加1生成全0，与0必为0。养成加括号的条件
题目给出条件为正整数，负数题目不成立

## 代码
```go
func hasAlternatingBits(n int) bool {
    if n==1 {
        return true
    }
    now:=n%2
    n=n>>1
    for n!=0 {
        next:=n%2
        n=n>>1
        if next^now!=1{
            return false
        }else{
            now=next
        }
    }
    return true
}
```

```go
func hasAlternatingBits(n int) bool {
    a := n ^ n>>1
    return a&(a+1) == 0
}
```

## 类似
- 137 190 191 260 405 461 477 526