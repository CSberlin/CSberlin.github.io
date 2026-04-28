---
title: java入门笔记
date: 2023-10-31 12:00:00
toc: true
mathjax: true
categories: Java
tags:
  - Java
copyright: true
---

# 学习路线

1. 首先要学习Java SE，掌握Java语言本身、Java核心开发技术以及Java标准库的使用；
2. 如果继续学习Java EE，那么Spring框架、数据库开发、分布式架构就是需要学习的；
3. 如果要学习大数据开发，那么Hadoop、Spark、Flink这些大数据平台就是需要学习的，他们都基于Java或Scala开发；
4. 如果想要学习移动开发，那么就深入Android平台，掌握Android App开发。

# Java 简介

## JDK

- java：这个可执行程序其实就是JVM，运行Java程序，就是启动JVM，然后让JVM执行指定的编译后的代码；
- javac：这是Java的编译器，它用于把Java源码文件（以`.java`后缀结尾）编译为Java字节码文件（以`.class`后缀结尾）；
- jar：用于把一组`.class`文件打包成一个`.jar`文件，便于发布；
- javadoc：用于从Java源码中自动提取注释并生成文档；
- jdb：Java调试器，用于开发阶段的运行调试。

Java是将代码编译成一种“字节码”，它类似于抽象的CPU指令，然后，针对不同平台编写虚拟机，不同平台的虚拟机负责加载字节码并执行，这样就实现了“一次编写，到处运行”的效果。

- Java SE：Standard Edition

- Java EE：Enterprise Edition（Java SE+大量的API和库）

- Java ME：Micro Edition（嵌入式设备的“瘦身版”）

- JDK：Java Development Kit（Java源码编译成Java字节码，提供编译器、调试器）

- JRE：Java Runtime Environment（运行Java字节码的虚拟机）

- JSR规范：Java Specification Request（标准化JVM的内存模型到Web程序接口）
- JCP组织：Java Community Process（负责审核JSR组织）

# Java 程序基础

## java程序基本结构

- 类名要求

  - 类名必须以英文字母开头，后接字母，数字和下划线的组合
  - 习惯以大写字母开头

-  方法名要求
  - 命名和`class`一样，但是首字母小写

    > 类命名
    >
    > - Hello
    > - NoteBook
    > - VRPlayer

- 注释

  - 特殊的多行注释需要写在类和方法的定义处，可以用于自动创建文档。

  ``` java
  /**
   * 可以用来自动创建文档的注释
   * 
   */

## 变量和数据类型

- 引用：String 字符串
  - 内部存储一个“地址”，指向某个对象在内存中的位置
- 常量：定义变量前加final修饰
- var关键字：相当于C++ auto

## 浮点数

整数运算除数0时报错，而浮点数运算在除数为`0`时，不会报错，但会返回几个特殊值：

- `NaN`表示Not a Number
- `Infinity`表示无穷大
- `-Infinity`表示负无穷大

## 布尔运算

- 短路运算
  - 与运算在确定第一个值为`false`后，不再继续计算，而是直接返回`false`。
  - 对于`||`运算，只要能确定第一个值为`true`，后续计算也不再进行，而是直接返回`true`。

## 字符串

- 字符串可以用`"""..."""`表示多行字符串（Text Blocks）

- 字符串不可变特性

  - 字符串的不可变是指字符串内容不可变。
    - 变的不是字符串，而是变量`s`的“指向”。
      1. 执行`String s = "hello";`时，JVM虚拟机先创建字符串`"hello"`，然后，把字符串变量`s`指向它
      2. 执行`s = "world";`时，JVM虚拟机先创建字符串`"world"`，然后，把字符串变量`s`指向它
      3. 原来的字符串`"hello"`还在，只是我们无法通过变量`s`访问它而已

- 区分空值`null`和空字符串`""`，空字符串是一个有效的字符串对象，它不等于`null`。

  - ```java
    String s2; // 没有赋初值值，s2也是null
    ```

## 数组

- 数组是引用类型，并且数组大小不可变

# 流程控制

## 输入输出

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); // 创建Scanner对象
        System.out.print("Input your name: "); // 打印提示
        String name = scanner.nextLine(); // 读取一行输入并获取字符串
        System.out.print("Input your age: "); // 打印提示
        int age = scanner.nextInt(); // 读取一行输入并获取整数
        System.out.printf("Hi, %s, you are %d\n", name, age); // 格式化输出
    }
}
```

- 创建`Scanner`对象并传入`System.in`。`System.out`代表标准输出流，而`System.in`代表标准输入流。
- 使用`scanner.nextLine()`，要读取用户输入的整数，使用`scanner.nextInt()`。`Scanner`会自动转换数据类型，因此不必手动转换。

## 判断

### if 判断

- 判断值类型的变量是否相等，可以使用`==`运算符。

- 判断引用类型的变量是否相等，`==`表示“引用是否相等”，即是否指向同一个对象。
- 要判断引用类型的变量内容是否相等，必须使用`equals()`方法

```java 
public class Main {
    public static void main(String[] args) {
        String s1 = null;
        if (s1.equals("hello")) {
            System.out.println("hello");
        }
    }
}
```

- 变量`s1`为`null`，会报`NullPointerException`
  - 短路运算
  - if ("hello".equals(s)) { ... }

### switch 判断

- `switch`语句升级为更简洁的表达式语法，使用类似模式匹配（Pattern Matching）的方法，保证只有一种路径会被执行，并且不需要`break`语句

```java
public class Main {
    public static void main(String[] args) {
        String fruit = "apple";
        switch (fruit) {
        case "apple" -> System.out.println("Selected apple");
        case "pear" -> System.out.println("Selected pear");
        case "mango" -> {
            System.out.println("Selected mango");
            System.out.println("Good choice!");
        }
        default -> System.out.println("No fruit selected");
        }
    }
}
```

- 

# 数组操作

## 数组遍历

```java 
public class Main {
    public static void main(String[] args) {
        int[] ns = { 1, 4, 9, 16, 25 };
        for (int n : ns) {
            System.out.println(n);
        }
    }
}
```

- 缺点：无法拿到数组索引

- 使用`Arrays.toString()`可以快速获取数组内容。

## 数组排序

- 使用Java标准库提供的`Arrays.sort()`进行排序

## 命令行参数

Java程序的入口是`main`方法，而`main`方法可以接受一个命令行参数，它是一个`String[]`数组。

```java
public class Main {
    public static void main(String[] args) {
        for (String arg : args) {
            if ("-version".equals(arg)) {
                System.out.println("v 1.0");
                break;
            }
        }
    }
}
```

程序必须在命令行执行，先编译

```shell
$ javac Main.java
```

执行

```shell
$ java Main -version
v 1.0
```



