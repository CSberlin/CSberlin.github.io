---
title: leetcode22
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-26 23:12:34
tags: ["回溯"]
---

## 题目
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
<!-- more -->

## 样例
- 1 <= n <= 8
输入：n = 3  
输出：["((()))","(()())","(())()","()(())","()()()"]  
输入：n = 1  
输出：["()"]

## 思路
需要维护往下搜索的括号合法性
- 当左括号 < n时可以添加左括号
- 当右括号数 < 左括号数时可以加右括号

## 代码
```go
func generateParenthesis(n int) (ans []string){
    var dfsParenthesis func (int,int,string)
    dfsParenthesis = func(leftcnt int,rightcnt int,tmpString string){
        if len(tmpString) == 2*n{
            ans = append(ans,tmpString)
        }
        if leftcnt < n{
            tmpString += "("
            dfsParenthesis(leftcnt+1,rightcnt,tmpString)
            tmpString = tmpString[:len(tmpString)-1]
        }
        if rightcnt < leftcnt{
            tmpString += ")"
            dfsParenthesis(leftcnt,rightcnt+1,tmpString)
            tmpString = tmpString[:len(tmpString)-1]
        }
    }
    dfsParenthesis(0,0,"")
    return
}
```