---
title: leetcode48
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-25 14:58:47
tags: ["模拟"]
---

## 题目
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。  
你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
<!-- more -->

## 样例
- n == matrix.length == matrix[i].length
- 1 <= n <= 20
- -1000 <= matrix[i][j] <= 1000

输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]  
输出：[[7,4,1],[8,5,2],[9,6,3]]  
输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]  
输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

## 思路1
开辟额外数组模拟

## 代码1
```go
func rotate(matrix [][]int)  {
    rotateMatrix := make([][]int,len(matrix)) 
    for i,_ := range matrix[0]{
        rotateMatrix[i] = make([]int,len(matrix[i]))
    }
    k,l:=0,0
    for i:=len(matrix)-1;i>=0;i--{
        k = 0
        for j:=0;j<len(matrix[0]);j++{
            rotateMatrix[k][l] = matrix[i][j]
            k++
        }
        l++
    }
    copy(matrix,rotateMatrix)
}
```

## 思路2
对于90 180 270旋转数组，多尝试水平，竖直，主对角线翻转

## 代码2
```go
func rotate(matrix [][]int)  {
    // 水平翻转
    for i:=0;i<len(matrix)/2;i++{
        for j:=0;j<len(matrix[0]);j++{
            matrix[i][j],matrix[len(matrix)-i-1][j] = matrix[len(matrix)-i-1][j],matrix[i][j]
        }
    }

    // 对角线翻转
    for i:=0;i<len(matrix);i++{
        for j:=0;j<i;j++{
            matrix[i][j],matrix[j][i] = matrix[j][i],matrix[i][j]
        }
    }
}
```

## 思路3
查找旋转规律,通过查找旋转到的对应位置，用一个中间变量存储后进行旋转
- 当 n 为偶数时，我们需要枚举 n^2 / 4 = (n/2)(n/2) 个位置 ：
- 当 n 为奇数时，由于中心的位置经过旋转后位置不变，我们需要枚举 (n^2-1) / 4 = ((n-1)/2)((n+1)/2)个位置

## 代码3
```go
func rotate(matrix [][]int)  {
    n := len(matrix)
    for i:=0;i<n/2;i++{
        for j:=0;j<(n+1)/2;j++{
            matrix[i][j],matrix[n-j-1][i],matrix[n-i-1][n-j-1],matrix[j][n-i-1] = matrix[n-j-1][i],matrix[n-i-1][n-j-1],matrix[j][n-i-1],matrix[i][j]
        }
    }
}
```