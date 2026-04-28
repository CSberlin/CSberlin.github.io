---
title: leetcode80
date: 2021-04-08 11:38:41
categories: leetcode
tags: 
- 双指针
---

# 题目

给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 最多出现两次 ，返回删除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。nums 升序
<!-- more -->
# 解题思路1
自己写的一个模拟删除过程，维护一个计数器够数了就减

## 代码1

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int len = nums.size();
        int cnt=1;
        for(int i=1;i<len;i++)
        {
            if(nums[i]==nums[i-1])
            {
                cnt++;
            }
            else
            {
                cnt=1;
            }
            if(cnt==3)
            {
                nums.erase(nums.begin()+i);
                cnt--;
                len--;
                i--;
            }
        }
        return len;
    }
};
```

# 解题思路2
- 慢指针表示处理出的数组的长度，快指针表示已经检查过的数组的长度
- 即 nums[left],nums[right] 表示待检查的第一个元素，nums[left−1] 为上一个应该被保留的元素所移动到的指定位置.
- 检查上上个应该被保留的元素 nums[left-2] 是否和当前待检查元素 nums[right] 相同。当且仅当 nums[left-2]=nums[right]时，当前待检查元素 nums[right] 不应该被保留

- 用left-2内的元素都已经合法，通过right与left-2的比较，表示当前的元素欲检查的元素是否需要将left指向的元素更新
    - 如果相同，right指针继续往后移，left指针不动。
    - 如果不相同，right指针指向的值要覆盖掉left指向的值，然后他们同时往后移一步

## 代码2(网上的双指针题解)

```java
    public int removeDuplicates(int[] nums) {
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            if (left < 2 || nums[right] != nums[left - 2])
                nums[left++] = nums[right];
        }
        return left;
    }
```