---
title: leetcode172
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-22 15:54:07
tags: ["数学"]
---

## 题目
给定一个整数 n ，返回 n! 结果中尾随零的数量。
提示 n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1

## 样例
- 0 <= n <= 104
输入：n = 3  
输出：0  
解释：3! = 6 ，不含尾随 0  

输入：n = 5
输出：1
解释：5! = 120 ，有一个尾随 0  

输入：n = 0
输出：0

## 思路1
发现只有5 * 2生成尾随0，以2为因子的数比5多，只要计算所有数有多少个5，把所有5加起来即为答案
有TLE风险
## 代码1
```go
func trailingZeroes(n int) int {
    count:=0
    for i:=1;i<=n;i++{
        tmp := i
        for tmp%5==0{
            count += 1
            tmp /= 5
        }
    }   
    return count
}
```

## 思路2
进阶 ... * (1 * 5) * ... * (1 * 5 * 5) * ... * (2 * 5 * 5) * ... * (3 * 5 * 5) * ... * n

每隔 5 个数，出现一个 5，每隔 25 个数，出现 2 个 5，每隔 125 个数，出现 3 个 5... 以此类推。
最终 5 的个数就是 n / 5 + n / 25 + n / 125 ...

```go
func trailingZeroes(n int) int {
    count:=0
    for n>0{
        n /= 5
        count += n
    }   
    return count
}
```