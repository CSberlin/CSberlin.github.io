---
title: leetcode504
toc: true
mathjax: true
categories: leetcode
copyright: true
date: 2022-03-07 16:13:57
tags: ["进制转换","字符串"]
---

## 题目
给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。
<!-- more -->

## 输入
num = 100

## 输出
"202"

## 输入
num = -7

## 输出
"-10"

## 注意：
-107 <= num <= 107
可能是负的，先处理负号
可能是0
可能范围很大，需要处理

## 代码

```c++
class Solution {
public:
    string convertToBase7(int num) {
        return tenToR(num, 7);
    }
private:
    const string words = "0123456789abcdef";
    string tenToR(int num, const int R) {
        // 特判0
        if (num == 0) {
            return "0";
        }
        // 处理负数
        long long n = num;
        string flag;
        if (n < 0) {
            flag = "-";
            n = -n;
        }

        string s;
        while(n) {
            int idx = n%R;
            n /= R;
            s += words[idx];
        }
        reverse(s.begin(), s.end());
        return flag + s;
    }
};
```

```go
func convertToBase7(num int) string {
    if num == 0 {
        return "0"
    }
    negative := num < 0
    if negative {
        num = -num
    }
    s := []byte{}
    for num > 0 {
        s = append(s, '0'+byte(num%7))
        num /= 7
    }
    if negative {
        s = append(s, '-')
    }
    for i, n := 0, len(s); i < n/2; i++ {
        s[i], s[n-1-i] = s[n-1-i], s[i]
    }
    return string(s)
}
```