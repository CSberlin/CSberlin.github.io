---
title: leetcode1
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2021-04-18 21:56:04
tags: [哈希表，双指针,求和]
---

# 题目

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
你可以按任意顺序返回答案。
<!-- more -->
# 示例1
##  输入
nums = [2,7,11,15], target = 9
## 输出
[0,1]
## 解释
因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

# 示例2
## 输入
nums = [3,2,4], target = 6
## 输出
[1,2]

# 解题思路1
暴力

# 代码
```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    // （能写++i就写++i，把变量能放在循环外面就放外面）
    int n = nums.size();
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}
```

# 解题思路2
unordered_map模拟哈希表，哈希表内存储元素次序

# 代码2
```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> hash_map;
    int n=nums.size();
    for(int i=0;i<n;++i)
    {
        auto it = hash_map.find(target-nums[i]);
        if(it!=hash_map.end())
        {
            return {it->second,i};
        }
        else{
            hash_map[nums[i]] = i;
        }
    }
    return {};
}
```
