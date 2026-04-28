---
title: leetcode111
toc: true
mathjax: true
categories: leetcode
date: 2021-04-08 15:26:42
tags:
- 深搜
- 宽搜
---

#  题目
给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明：叶子节点是指没有子节点的节点。
<!-- more -->
## 输入

root = [3,9,20,null,null,15,7]

## 输出

2

## 输入

root = [2,null,3,null,4,null,5,null,6]

## 输出

5

# 解题思路1: 深搜

# 代码1
```java
class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;
        else if (root.left == null) return minDepth(root.right) + 1;
        else if (root.right == null) return minDepth(root.left) + 1;
        else return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
    }
}
```

# 解题思路2: 宽搜

# 代码2

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int minDepth(TreeNode* root) {
        if(root==NULL) return 0;
        int deep=1;
        bfs(root,deep);
        return deep;
    }
    void bfs(TreeNode* root,int &deep)
    {
        queue<TreeNode *> q;
        q.push(root);
        TreeNode* end=root;
        int level=1;
        while(!q.empty())
        {
            TreeNode* p = q.front();
            q.pop();
            if(p->left==NULL&&p->right==NULL)
            {
                deep=level;
                return;
            }
            if(p->left){q.push(p->left);}
            if(p->right){q.push(p->right);}
            if(p==end)
            {
                end = q.back();
                level++;
            }
        }
    }
};
```