---
title: leetcode17
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-22 12:03:34
tags: ["回溯"]
---
## 题目
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

## 样例
- 0 <= digits.length <= 4
- digits[i] 是范围 ['2', '9'] 的一个数字。

输入：digits = "23"  
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]  
输入：digits = ""  
输出：[]  
输入：digits = "2"  
输出：["a","b","c"]  

## 思路
排列问题，回溯思想，在某个节点加一个元素往下搜，换一个继续。
- 路径: 目前已经做了的选择集合
- 选择列表: 还有哪些列表可选
- 结束条件: 但索引长度等于数组长度

## 代码
```go
var digitsMap = map[byte]string{
    '2':"abc",
    '3':"def",
    '4':"ghi",
    '5':"jkl",
    '6':"mno",
    '7':"pqrs",
    '8':"tuv",
    '9':"wxyz",
}

func letterCombinations(digits string) (ans []string){
    if len(digits)==0{
        return []string{}
    }

    var dfs func(string, int, string)
    dfs = func(digits string,index int,tmpStr string){
        if index==len(digits){
            ans = append(ans,tmpStr)
        }else{
            for _,char := range digitsMap[digits[index]]{
                tmpStr += string(char)
                dfs(digits,index+1,tmpStr)
                tmpStr = tmpStr[:len(tmpStr)-1]
            }
        }
    }
    dfs(digits,0,"")
    return
}
```