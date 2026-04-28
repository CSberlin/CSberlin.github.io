---
title: leetcode15
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2021-04-18 22:37:33
tags: ["双指针","哈希表","查找","数组"]
---

# 题目 
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
<!-- more -->
相似题leetcode1

# 示例 1
## 输入
nums = [-1,0,1,2,-1,-4]
## 输出
[[-1,-1,2],[-1,0,1]]

# 示例 2：
## 输入
nums = []
## 输出
[]

# 示例 3：
## 输入
nums = [0]
## 输出
[]

# 解题思路1
注意：答案中不可以包含重复的三元组。  
排序后，通过保证每层循环的需要加入答案的下一个元素不与前一个相同，倒数两个for循环遍历的元素使用双指针
- 暴力 三个for
- 双指针 
  - 每次i,j,k循环进行搜索前，要进行去重操作
  - i,j,k 固定i值，右侧j为最左开始的指针，k为从最右测开始的指针

# 代码1

```cpp
vector<vector<int>> threeSum(vector<int>& nums) {
        int len = nums.size();
        sort(nums.begin(),nums.end());
        vector<vector<int> > ans;
        
        int target = 0;
        for(int i=0;i<len;++i)
        {
            if(i>0&&nums[i]==nums[i-1]) // 保证遍历的有序数组元素不与上一个相同
                continue;
            int k=len-1;
            for(int j=i+1;j<len;++j)
            {
                if(j>i+1&&nums[j]==nums[j-1]) // 保证遍历的有序数组元素不与上一个相同
                    continue;
                while(j<k&&nums[i]+nums[j]+nums[k]>target)
                    --k;
                if(j==k) break;
                if(nums[i]+nums[j]+nums[k]==target)
                    ans.push_back({nums[i],nums[j],nums[k]});
            }
        }
        return ans;
    }
```

```cpp
vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int> > ans;
        int len = nums.size();
        if(len<3) return ans;
        sort(nums.begin(),nums.end()); // 排序
        for (int i = 0; i < len ; i++) {
            if(nums[i] > 0) break; 
            if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
            int L = i+1;
            int R = len-1;
            while(L < R){
                int sum = nums[i] + nums[L] + nums[R];
                if(sum == 0){
                    ans.push_back({nums[i],nums[L],nums[R]});
                    while (L<R && nums[L] == nums[++L]); //去重
                    while (L<R && nums[R] == nums[--R]); //去重
                }
                else if (sum < 0) L++;
                else if (sum > 0) R--;
            }
        }        
        return ans;
    }
```

# 解题思路2
排序后，对有序数组的元素进行哈希表存储，哈希表值存储有序数组的下标
我们首先通过两层遍历，确定好前两位数字，那么我们只需要哈希表是否存在符合情况的第三位数字即可，跟暴力解法的思路类似，很容易理解，但是这里我们需要注意的情况就是，例如我们的例子为[-2 , 1 , 1],如果我们完全按照以上思路来的话，则会出现两个解，[-2 , 1 , 1]和[1 , 1, -2]。具体原因，确定 -2，1之后发现 1 在哈希表中，存入。确定 1 ，1 之后发现 -2 在哈希表中，存入。所以我们需要加入一个约束避免这种情况，那就是我们第三个数的索引大于第二个数时才存入。

# 代码2
```java
class Solution {//网上一个老哥的题解
    public List<List<Integer>> threeSum(int[] nums) {
       if(nums.length < 3){
           return new ArrayList<>();
       }
       //排序
       Arrays.sort(nums);
       HashMap<Integer,Integer> map = new HashMap<>();
       List<List<Integer>> resultarr = new ArrayList<>();
       //存入哈希表
       for(int i = 0; i < nums.length; i++){
           map.put(nums[i],i);
       }
       Integer t;
       int target = 0;
       for(int i = 0; i < nums.length; ++i){            
            target = -nums[i];
            //去重
            if(i > 0 && nums[i] == nums[i-1]){
                continue;
            }
            for(int j = i + 1; j < nums.length; ++j){
                if(j > i+1 && nums[j] == nums[j-1]){
                    continue;
                }             
                if((t = map.get(target - nums[j])) != null){
                    //符合要求的情况,存入
                    if(t > j){                      
                       resultarr.add(new ArrayList<>
                       (Arrays.asList(nums[i], nums[j], nums[t])));

                    } 
                    else{
                        break;
                    }                                                  
                }
            }
       }
       return resultarr;
    }
}
```