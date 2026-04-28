---
title: leetcode20
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-19 22:47:50
tags: ["栈"]
---

## 题目
给定一个只包括 '('，')'，'{'，'}'，'[' ,']' 的字符串 s ，判断字符串是否有效。
<!-- more -->
有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

## 测试用例
输入：s = "()"  
输出：true  
输入：s = "(]"  
输出：false  
输入：s = "([)]"  
输出：false  
输入：s = "(("
输出：false
输入：s = "("
输出：false  
输入：s = ")"
输出：false

## 思路
栈模拟，注意出栈时判断栈空；空串；结束后栈还是空的

## 代码
```go
func isValid(s string) bool { // 挺奇怪的这题range s出来的是rune类型的
    sLen := len(s)
    if sLen%2==1 || sLen==0{ // ""
        return false
    }
    pairs := map[rune]rune{
        '(':')',
        '[':']',
        '{':'}',
    }
    byteStack := []rune{}
    for _,char := range s{
        if _,ok := pairs[char];ok{
            byteStack = append(byteStack,char) //append 可以覆盖原来象征性减少的切片删除尾元素
        }else{
            if len(byteStack)==0{ // ]
                return false
            }
            if pairs[byteStack[len(byteStack)-1]] != char{
                return false
            }
            byteStack = byteStack[:len(byteStack)-1]
        }
    }
    return len(byteStack)==0 // (
}
```