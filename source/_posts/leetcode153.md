---
title: leetcode153
toc: true
mathjax: true
categories: leetcode
date: 2021-04-09 11:04:07
tags:
- 查找
- 二分查找
---

# 题目
已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：
若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]
注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
<!-- more -->
## 输入
nums = [3,4,5,1,2]
## 输出
1
## 解释
原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。

## 输入
nums = [11,13,15,17]
## 输出
11
## 解释
原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。

# 解题思路1
暴力

# 代码1

```cpp
//78% 39.35%
int findMin(vector<int>& nums) {
        int len = nums.size();
        for(int i=1;i<len;i++)
        {
            if(nums[i]<nums[i-1])
            {
                return nums[i];
            }
        }
        return nums[0];
    }
```

# 解题思路2
二分查找 保证最小值在区间[low,high]之间 可以以值画图模拟
二分查找写法区别：
- low<=high low=mid+1,high=mid-1 判断时加nums[mid]==target判断（左中右）
- low < high low=mid,high=mid-1或者low=mid+1,high=mid  两边夹出结果（左右）

https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/


# 代码2
```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int low=0,mid,high = nums.size()-1;
        while(low<high)
        {
            mid = low+(high-low)/2;
            if(nums[mid]<nums[high])
                high = mid;
            else
                low = mid+1;
        }
        return nums[low];
    }
};
```