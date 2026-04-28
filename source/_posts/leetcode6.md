---
title: leetcode6
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-10 23:41:43
tags: ["字符串","规律"]
---

## 题目
将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
<!-- more -->

## 测试样例
输入：s = "PAYPALISHIRING", numRows = 3  
输出："PAHNAPLSIIGYIR"

输入：s = "PAYPALISHIRING", numRows = 4  
输出："PINALSIGYAHRPI"

输入：s = "A", numRows = 1  
输出："A"

## 思路1
维护ansSlice []string,直接上下移动将字母加到对应位置
维护flag 如果到头了反向

## 代码1
```go
func convert(s string, numRows int) (ans string) {
    if numRows==1 {
        return s
    }
    index,flag := 0,1
    ansSlice := make([]string,numRows,numRows)
    for _,value := range s{
        ansSlice[index] += string(value)
        index = index+flag
        if index==numRows-1||index==0{ 
            flag = -flag
        }
    }
    for _,value := range ansSlice{
        ans += value
    }
    return
}
```

## 思路2
找每一行下一个字母对应的规律
numRows=4、step=2*numRows-2
第0行： 0 - 6 - 12 - 18===》下标间距 6 - 6 - 6===》step - step - step  
第1行： 1 - 5 - 7 - 11 - 13==> 下标间距 4 - 2 - 4 - 2 ==> 下标间距step-2*1(行)-2*1(行)-step-2*1(行)-2*1(行) 以此类推

```go
func convert(s string, numRows int) (ans string) {
    if numRows==1 {
        return s
    }
    lenS := len(s)
    step := 2*numRows-2
    for i:=0;i<numRows;i++{
        add := 2*i
        index := i
        for index<lenS{
            ans += string(s[index])
            add = step-add
            if (i==0)||(i==numRows-1){
                index += step
            }else {
                index += add
            }
        }
    }
    return
}
```