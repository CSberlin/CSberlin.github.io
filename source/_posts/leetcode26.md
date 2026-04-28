---
title: leetcode26
date: 2021-04-08 11:38:41
categories: leetcode
tags: 
- 双指针
---

# 题目
给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。nums 已按升序排列
<!-- more -->

# 解题思路1
自己写的一个模拟删除过程，维护一个计数器够数了就减
时间复杂度O(N)
空间复杂度O(1)

## 代码

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if(nums.size()==0) return 0;
        int i=0,len=nums.size();
        for(int j=1;j<len;j++)
        {
            if(nums[j]!=nums[i])
            {
                i++;
                nums[i] = nums[j];
            }
        }
        return i+1;
    }
};
```

- 双指针思路
```go
func removeDuplicates(nums []int) int {
    pos := 0
    for j:=0;j<len(nums);j++{
        if nums[pos]==nums[j]{
            continue
        }else{
            pos++
            nums[pos]=nums[j]
        }
    }
    return len(nums[:pos+1])
}
```