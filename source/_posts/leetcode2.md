---
title: leetcode2
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-03-15 10:16:35
tags: ["数组","链表"]
---

## 题目
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
请你将两个数相加，并以相同形式返回一个表示和的链表。
你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg">
<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg">

## 测试用例
输入：l1 = [2,4,3], l2 = [5,6,4]  
输出：[7,0,8]  
解释：342 + 465 = 807.

输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]  
输出：[8,9,9,9,0,0,0,1]

输入：l1 = [0], l2 = [0]  
输出：[0]

输入：l1 = [1], l2 = [9,9,9,9,9,9]
输出：[0,0,0,0,0,0,1]

## 解题思路
首先注意到遍历完两个链表存在进位情况，需要分配新的节点。
其次使用for循环遍历到两个链表结尾。并逐个判断条件进位相加。

## tips：
- 创建节点指针，并分配新的节点 &{}
- 将两个不等长链表用一个for循环遍历到结尾
- 使用头节点统一操作，并作为变量命名返回(不改变函数签名)
## 代码
```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func addTwoNumbers(l1 *ListNode, l2 *ListNode) (head *ListNode) {
    var tail *ListNode
    carry:=0
    for l1!=nil||l2!=nil{
        m,n:=0,0
        if l1!=nil{
            m=l1.Val
            l1 = l1.Next
        }
        if l2!=nil{
            n=l2.Val
            l2 = l2.Next
        }
        
        sum := m+n+carry
        sum,carry = sum%10,sum/10
         
        if head==nil{
            head = &ListNode{Val:sum}
            tail = head
        }else{//妙
            tail.Next = &ListNode{Val:sum}
            tail = tail.Next
        }
    }
    if carry!=0{
        tail.Next = &ListNode{Val:carry}
    }
    return
}
```
