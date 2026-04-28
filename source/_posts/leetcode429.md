---
title: leetcode429
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-22 15:20:00
tags: ["DFS"]
---

## 题目
给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。
树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。
<!-- more -->

## 样例
- 树的高度不会超过 1000
- 树的节点总数在 [0, 10^4] 之间
输入：root = [1,null,3,2,4,null,5,6]
输出：[[1],[3,2,4],[5,6]]  
输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]  
输出：[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]

## 思路
维护一个含每层节点的切片

## 代码
```go
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Children []*Node
 * }
 */

func levelOrder(root *Node) [][]int {
    if root==nil{
        return nil
    }
    queue := []*Node{root}
    ans := [][]int{}

    for len(queue)!=0{
        qLen := len(queue) //取每一层的长度
        levelQueue := []int{}
        for i:=0;i<qLen;i++{ //遍历当前一层
            node := queue[0]
            queue = queue[1:]
            levelQueue = append(levelQueue,node.Val)
            for _,child := range node.Children{//加入新的一层
                queue = append(queue,child)
            }
        }
        // 将一层结果加入
        ans = append(ans,levelQueue)
    }
    return ans
}
```

```go
func levelOrder(root *Node) [][]int {
    if root==nil{
        return nil
    }
    queue := []*Node{root}
    ans := [][]int{}

    for len(queue)!=0{
        tmp := queue
        levelQueue := []int{}
        queue = nil
        for _,node := range tmp{ //遍历当前一层
            levelQueue = append(levelQueue,node.Val)
            //加入新的一层
            queue = append(queue,node.Children...)
        }
        // 将一层结果加入
        ans = append(ans,levelQueue)
    }
    return ans
}
```
