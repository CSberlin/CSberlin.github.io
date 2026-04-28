---
title: leetcode33
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-04-25 15:13:25
tags: ["二分查找"]
---

## 题目
整数数组 nums 按升序排列，数组中的值 互不相同 。
在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
<!-- more -->

## 二分查找
https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/yi-wen-dai-ni-shua-bian-er-fen-cha-zhao-dtadq/

- if ( left < right )时，缩减范围用left = mid + 1和right = mid
  - right边界始终维护语义nums[right] >= target（以普通二分搜索举例），这条语义通过检测if ( nums[mid] >= target )来实现，所以right = mid而非right = mid - 1
  - 循环退出后需要检测right维护的语义是否正确，即if ( nums[right] >= target )，因为right的位置可能一直没动处于右边界且该位置从未被检测过语义，因为我们设置的循环条件是if ( left < right )，如果设置成if ( left <= right )的话，最后left == right == mid可能致死循环
- if ( left <= right)时，缩减范围用left = mid + 1和right = mid - 1
  - 中间直接检测if ( nums[mid] == target ) return mid，如果从未执行该语句而推出循环则说明未搜索到target
  - 条件检测用if ( left <= right )从而可以检测右边界的语义，从而就应该使用right = mid- 1而非right = mid

## 样例
- 1 <= nums.length <= 5000
- -10^4 <= nums[i] <= 10^4
- nums 中的每个值都 独一无二
- 题目数据保证 nums 在预先未知的某个下标上进行了旋转
- -10^4 <= target <= 10^4
输入：nums = [4,5,6,7,0,1,2], target = 0  
输出：4  
输入：nums = [4,5,6,7,0,1,2], target = 3  
输出：-1  
输入：nums = [1], target = 0  
输出：-1

## 思路
部分有序的二分查找。
将数组一分为二，其中一定有一个是有序的，另一个可能是有序，也能是部分有序。
此时有序部分用二分法查找。无序部分再一分为二，其中一个一定有序，另一个可能有序，可能部分有序。就这样循环. 

## 代码
```go
// 题解把查找范围 0-mid-n-1也是没有问题的，正常写法是查找范围 Left-mid-Right
func search(nums []int, target int) int {
    for l,r:=0,len(nums)-1; l<=r ;{
        mid := (l-r)>>1+r
        if nums[mid] == target{
            return mid
        }
        if nums[l]<nums[mid]{ // 如果左半部分有序
            // if (nums[0] <= target && target < nums[mid]) 
            if nums[l]>=target&&nums[mid]<target{
                r = mid - 1
            }else{
                l = mid + 1
            }
        }else{ // 如果右半部分有序
            // if (nums[mid] < target && target <= nums[n - 1]) 
            if nums[mid]<target&&nums[r]>=target{ // mid + 1 -1很容易数组小时越界
               l = mid + 1 
            }else{
                r = mid - 1
            }
        }
    }
    return -1
}
```