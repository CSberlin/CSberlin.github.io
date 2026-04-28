---
title: leetcode589
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-03-15 10:28:44
tags: ["n叉树","前序遍历"]
---

## 题目
给定一个 n 叉树的根节点  root ，返回 其节点值的 前序遍历 。n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。

## 测试用例
输入：root = [1,null,3,2,4,null,5,6]  
输出：[1,3,5,6,2,4]  

输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]  
输出：[1,2,3,6,7,11,14,4,8,12,5,9,13,10]

## 解题思路
1、递归写法  
根子树顺序访问节点并加入结果切片中
由于传切片作为参数在append时会分配新的地址空间，故最后递归返回时会导致空.故应传切片指针，谨防空指针问题。
2、非递归写法  
2.1 从根节点开始，从右到左入栈，出栈，访问后，将子节点从右到左入栈  
2.2 
- 每次入栈时都将当前节点的 uu 的第一个子节点压入栈中，直到当前节点为空节点为止。  
- 每次查看栈顶元素 p，如果节点 p 的子节点已经全部访问过，则将节点 p 的从栈中弹出，并从哈希表中移除，表示该以该节点的子树已经全部遍历过；如果当前节点 p 的子节点还有未遍历的，则将当前节点的 p 的下一个未访问的节点压入到栈中，重复上述的入栈操作。

## 代码1
```go

func preorder(root *Node) []int {
    // var p *[]int 直接会报空指针错误
    // var ans []int; var p *[]int = &ans也可
    ans := make([]int,0)
    p := &ans
    preOrderTraverse(root,p)
    return ans
}

func preOrderTraverse(root *Node,p *[]int){
    if root==nil{
        return
    }
    *p = append(*p,root.Val)
    for _,node:=range root.Children{
        preOrderTraverse(node,p)
    }
}
```


## 代码2
```go
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Children []*Node
 * }
 */

func preorder(root *Node) (ans []int) {
    // 直接dfs:=func(){dfs()}在递归调用时会被编译器内部认为未定义dfs
    var dfs func(*Node)
    dfs = func(node *Node){
        if node==nil {
            return
        }
        ans = append(ans,node.Val)
        for _,val := range(node.Children){
            dfs(val)
        }
    }
    dfs(root)
    return
}
```

## 非递归
```go
func preorder(root *Node) (ans []int) {
    if root == nil {
        return
    }
    st := []*Node{root} //注意与*[]Node区别, 一个指针指向切片
    for len(st) > 0 {
        node := st[len(st)-1]
        st = st[:len(st)-1]
        ans = append(ans, node.Val) //node.Val等同于(*node).Val 括号不能去掉
        for i := len(node.Children) - 1; i >= 0; i-- {
            st = append(st, node.Children[i])
        }
    }
    return
}
```

```go
func preorder(root *Node) (ans []int) {
    if root == nil {
        return
    }
    st := []*Node{}
    nextIndex := map[*Node]int{}// 哈希表记录当前节点子树是否被访问完毕
    node := root
    for len(st) > 0 || node != nil {
        // 将非空节点的第一个子节点，逐个访问后入栈
        for node != nil {
            ans = append(ans, node.Val)
            st = append(st, node)
            if len(node.Children) == 0 {
                break
            }
            nextIndex[node] = 1
            node = node.Children[0] //迭代node
        }
        //抽取栈顶第一个非空节点
        node = st[len(st)-1]
        i := nextIndex[node]
        if i < len(node.Children) { // 对当前节点已访问的子树数量进行比较，少于子节点个数则更新哈希表和当前节点为其下一个子节点继续访问
            nextIndex[node] = i + 1
            node = node.Children[i]
        } else { // 若当前节点的子树已全访问完毕，弹出当前节点并对当前节点置空
            st = st[:len(st)-1]
            delete(nextIndex, node)
            node = nil
        }
    }
    return
}
```
## 踩坑
```go
package main

import "fmt"

func main() {
	ans := make([]int,0,100)
	ans = append(ans,1) // [1]
	test(ans)
	fmt.Println(ans[:10]) // [1,12,3,4,0,0,...,0]
	fmt.Println(ans) // [1] 调用函数部分的len不变
	test1(ans)
	fmt.Println(ans) // [3]
}

func test(ans []int){
	ans = append(ans,12,3,4)
}

func test1(ans []int){
	ans[0]=3
}
```