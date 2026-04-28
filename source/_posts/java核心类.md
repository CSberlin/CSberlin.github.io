---
title: java核心类
date: 2021-10-11 12:00:00
toc: true
mathjax: true
categories: Java
tags:
  - Java
copyright: true
---

# String

## 比较

- 必须使用`equals()`方法而不能用`==`。

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "hello";
        System.out.println(s1 == s2);
        System.out.println(s1.equals(s2));
    }
}
//true true

public class Main {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "HELLO".toLowerCase();
        System.out.println(s1 == s2);
        System.out.println(s1.equals(s2));
    }
}
// false true
```



- 两个字符串用`==`和`equals()`比较都为`true`，但实际上那只是Java编译器在编译期，会自动把所有相同的字符串当作一个对象放入常量池，自然`s1`和`s2`的引用就是相同的。
- 字符串操作不改变原字符串内容，而是返回新字符串；

## 常用接口

```java
// 是否包含子串:
"Hello".contains("ll"); // true
"Hello".indexOf("l"); // 2
"Hello".lastIndexOf("l"); // 3
"Hello".startsWith("He"); // true
"Hello".endsWith("lo"); // true
"Hello".substring(2); // "llo"

"  \tHello\r\n ".trim(); // "Hello"


"".isEmpty(); // true，因为字符串长度为0
"  ".isEmpty(); // false，因为字符串长度不为0
"  \n".isBlank(); // true，因为只包含空白字符
" Hello ".isBlank(); // false，因为包含非空白字符

s.replace('l', 'w'); // "hewwo"，所有字符'l'被替换为'w'

String s = "A,,B;C ,D";
s.replaceAll("[\\,\\;\\s]+", ","); // "A,B,C,D"

String s = "A,B,C,D";
String[] ss = s.split("\\,"); // {"A", "B", "C", "D"}

String[] arr = {"A", "B", "C"};
String s = String.join("***", arr); // "A***B***C"

// 格式化
String s = "Hi %s, your score is %d!";
        System.out.println(s.formatted("Alice", 80));
        System.out.println(String.format("Hi %s, your score is %.2f!", "Bob", 59.5));

String.valueOf(45.67); // "45.67"

int n1 = Integer.parseInt("123"); // 123
int n2 = Integer.parseInt("ff", 16); // 按十六进制转换，255

//转换编码后，就不再是char类型，而是byte类型表示的数组。
byte[] b1 = "Hello".getBytes(); // 按系统默认编码转换，不推荐
byte[] b2 = "Hello".getBytes("UTF-8"); // 按UTF-8编码转换
byte[] b2 = "Hello".getBytes("GBK"); // 按GBK编码转换
byte[] b3 = "Hello".getBytes(StandardCharsets.UTF_8); // 按UTF-8编码转换

//把已知编码的byte[]转换为String
byte[] b = ...
String s1 = new String(b, "GBK"); // 按GBK转换
String s2 = new String(b, StandardCharsets.UTF_8); // 按UTF-8转换
```

- `contains()`方法的参数是`CharSequence` `CharSequence`是`String`的父类。

- 使用`trim()`方法可以移除字符串首尾空白字符。空白字符包括空格，`\t`，`\r`，`\n`：

- 另一个`strip()`方法也可以移除字符串首尾空白字符。类似中文的空格字符`\u3000`也会被移除

- 任意基本类型或引用类型转换为字符串，使用静态方法`valueOf()`



```java
public class Main {
    public static void main(String[] args) {
        char[] cs = "Hello".toCharArray();
        String s = new String(cs);
        System.out.println(s);
        cs[0] = 'X';
        System.out.println(s);
    }
}
//Hello 
//Hello 
```



- `String`的不变性设计可以看出，如果传入的对象有可能改变，我们需要复制而不是直接引用。

- `String`则以`byte[]`存储：如果`String`仅包含ASCII字符，则每个`byte`存储一个字符，否则，每两个`byte`存储一个字符，这样做的目的是为了节省内存。

# StringBuilder

- 为了高效拼接字符串，Java标准库提供了`StringBuilder`，它是一个可变对象，可以预分配缓冲区，往`StringBuilder`中新增字符时，不会创建新的临时对象。

```java
public class Main {
    public static void main(String[] args) {
        var sb = new StringBuilder(1024);
        sb.append("Mr ")
          .append("Bob")
          .append("!")
          .insert(0, "Hello, ");
        System.out.println(sb.toString());
    }
}
```



> 普通的字符串`+`操作，并不需要将其改写为`StringBuilder`，因为Java编译器在编译时就自动把多个连续的`+`操作编码为`StringConcatFactory`的操作。在运行期，`StringConcatFactory`会自动把字符串连接操作优化为数组复制或者`StringBuilder`操作。

# StringJoin

- StringJoiner 用分隔符拼接数组的需求

```Java
public class Main {
    public static void main(String[] args) {
        String[] names = {"Bob", "Alice", "Grace"};
        var sj = new StringJoiner(", ");
        for (String name : names) {
            sj.add(name);
        }
        System.out.println(sj.toString());
    }
}
//Bob, Alice, Grace 


public class Main {
    public static void main(String[] args) {
        String[] names = {"Bob", "Alice", "Grace"};
        var sj = new StringJoiner(", ", "Hello ", "!");
        for (String name : names) {
            sj.add(name);
        }
        System.out.println(sj.toString());
    }
}
//Hello Bob, Alice, Grace! 

String[] names = {"Bob", "Alice", "Grace"};
var s = String.join(", ", names);
```



