---
title: leetcode23
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-25 14:48:27
tags: ["分治"]
---

## 题目
给你一个链表数组，每个链表都已经按升序排列。  
请你将所有链表合并到一个升序链表中，返回合并后的链表。
<!-- more -->

## 样例
- k == lists.length
- 0 <= k <= 10^4
- 0 <= lists[i].length <= 500
- -10^4 <= lists[i][j] <= 10^4
- lists[i] 按 升序 排列
- lists[i].length 的总和不超过 10^4

输入：lists = [[1,4,5],[1,3,4],[2,6]]  
输出：[1,1,2,3,4,4,5,6]  
输入：lists = []  
输出：[]  
输入：lists = [[]]  
输出：[]

## 思路1
1. 暴力 先合并两个再维护ans变量继续合并。合并两有序链表模板。

## 代码1
```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeKLists(lists []*ListNode) *ListNode {
    if len(lists)==0||(len(lists)==1&&lists[0] == nil){
        return nil
    }
    var ans *ListNode = nil
    for _, list := range lists{
        ans = mergeTwoLists(ans,list)
    }
    return ans
}

func mergeTwoLists(list1,list2 *ListNode) *ListNode{
    if list1==nil||list2==nil{
        if list1==nil{
            return list2
        }else{
            return list1
        }
    }
    head := new(ListNode)
    tail,p1,p2 := head,list1,list2
    
    for p1!=nil&&p2!=nil{
        if p1.Val<=p2.Val{
            tail.Next = p1
            p1 = p1.Next    
        }else{
            tail.Next = p2
            p2 = p2.Next
        }
        tail = tail.Next
    }
    if p1!=nil{
        tail.Next = p1
    }else{
        tail.Next = p2
    }
    return head.Next
}
```

## 思路2
分治后合并

## 代码2
```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeKLists(lists []*ListNode) *ListNode {
    return merge(lists,0,len(lists)-1)
}

func merge(list []*ListNode,left,right int) *ListNode{
    if left>right{
        return nil
    }
    if left == right{
        return list[left]
    }
    mid := (left-right)>>1+right
    return mergeTwoLists(merge(list,left,mid),merge(list,mid+1,right))
}

func mergeTwoLists(list1,list2 *ListNode) *ListNode{
    if list1==nil||list2==nil{
        if list1==nil{
            return list2
        }else{
            return list1
        }
    }
    head := new(ListNode)
    tail,p1,p2 := head,list1,list2
    
    for p1!=nil&&p2!=nil{
        if p1.Val<=p2.Val{
            tail.Next = p1
            p1 = p1.Next    
        }else{
            tail.Next = p2
            p2 = p2.Next
        }
        tail = tail.Next
    }
    if p1!=nil{
        tail.Next = p1
    }else{
        tail.Next = p2
    }
    return head.Next
}
```
