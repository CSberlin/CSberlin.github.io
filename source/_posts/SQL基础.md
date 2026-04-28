---
title: SQL基础
date: 2021-06-16 12:00:00
toc: true
mathjax: true
categories: 数据库
tags:
  - SQL
  - 数据库
copyright: true
---

# 主键

- 主键是关系表中记录的唯一标识。主键的选取非常重要：主键不要带有业务含义，而应该使用BIGINT自增或者GUID类型。主键也不应该允许`NULL`。

- 所以，选取主键的一个基本原则是：不使用任何业务相关的字段作为主键。

  因此，身份证号、手机号、邮箱地址这些看上去可以唯一的字段，均*不可*用作主键。

- 作为主键最好是完全业务无关的字段，我们一般把这个字段命名为`id`。常见的可作为`id`字段的类型有：

  1. 自增整数类型：数据库会在插入数据时自动为每一条记录分配一个自增整数，这样我们就完全不用担心主键重复，也不用自己预先生成主键；
  2. 全局唯一GUID类型：使用一种全局唯一的字符串作为主键，类似`8f55d96b-8acc-4636-8cb8-76bf8abc2f57`。GUID算法通过网卡MAC地址、时间戳和随机数保证任意计算机在任意时间生成的字符串都是不同的，大部分编程语言都内置了GUID算法，可以自己预算出主键。

- 关系数据库实际上还允许通过多个字段唯一标识记录，即两个或更多的字段都设置为主键，这种主键被称为联合主键。

  - 没有必要的情况下，尽量不使用联合主键，因为它给关系表带来了复杂度的上升。



# 外键

- 一对多

  - 由于一个班级可以有多个学生，在关系模型中，这两个表的关系可以称为“一对多”，即一个`classes`的记录可以对应多个`students`表的记录。
  - 在`students`表中，通过`class_id`的字段，可以把数据与另一张表关联起来，这种列称为`外键`。

  ```sql
  ALTER TABLE students
  ADD CONSTRAINT fk_class_id
  FOREIGN KEY (class_id)
  REFERENCES classes (id);
  ```

  ```sql
  ALTER TABLE students
  DROP FOREIGN KEY fk_class_id;
  ```

- 多对多
  - 多对多关系实际上是通过两个一对多关系实现的，即通过一个中间表，关联两个一对多关系，就形成了多对多关系
  - 例如，一个老师可以对应多个班级，一个班级也可以对应多个老师，因此，班级表和老师表存在多对多关系。
  - 通过中间表`teacher_class`可知`teachers`到`classes`的关系
- 一对一
  - 把一个大表拆成两个一对一的表，目的是把经常读取和不经常读取的字段分开，以获得更高的性能

# 索引

- 通过使用索引，可以让数据库系统不必扫描整个表，而是直接定位到符合条件的记录，这样就大大加快了查询速度。

- 关系数据库会自动对其创建主键索引。使用主键索引的效率是最高的，因为主键会保证绝对唯一。

  ```sql
  ALTER TABLE students
  ADD INDEX idx_score (score);
  ```

  

 ## 唯一索引

- 设计关系数据表的时候，看上去唯一的列，例如身份证号、邮箱地址等，因为他们具有业务含义，因此不宜作为主键

  ```sql
  # 给该学生表姓名列添加一个唯一索引
  ALTER TABLE students
  ADD UNIQUE INDEX uni_name (name);
```
  
  ```sql
  # 只对某一列添加一个唯一约束而不创建唯一索引
  ALTER TABLE students
  ADD CONSTRAINT uni_name UNIQUE (name);
```

# 查询

## 基本查询

```sql
# SELECT * FROM <表名>
# 计算100+200
SELECT 100+200;
# 测试数据库是否连接
SELECT 1;
```



## 条件查询

```sql
SELECT * FROM <表名> WHERE <条件表达式>
SELECT * FROM students WHERE score >= 80 AND gender = 'M';
SELECT * FROM students WHERE (score < 80 OR score > 90) AND gender = 'M';
```



## 投影查询

```sql
# SELECT 列1, 列2, 列3 FROM ...时，还可以给每一列起个别名，这样，结果集的列名就可以与原表的列名不同。它的语法是SELECT 列1 别名1, 列2 别名2, 列3 别名3 FROM ...
SELECT id, score points, name FROM students;
SELECT id, score points, name FROM students WHERE gender = 'M';
```

## 排序

- 使用`ORDER BY`可以对**结果集**进行排序

```sql
# 查询结果集通常是按照id排序的，也就是根据主键排序。加上ORDER BY子句。例如按照成绩从低到高进行排序
SELECT id, name, gender, score FROM students ORDER BY score;
#低到高
SELECT id, name, gender, score FROM students ORDER BY score DESC;
#使用ORDER BY score DESC, gender表示先按score列倒序，如果有相同分数的，再按gender列排序
SELECT id, name, gender, score FROM students ORDER BY score DESC, gender;
#如果有WHERE子句，那么ORDER BY子句要放到WHERE子句后面。例如，查询一班的学生成绩，并按照倒序排序：
SELECT id, name, gender, score
FROM students
WHERE class_id = 1
ORDER BY score DESC;
```

## 分页查询

- 使用SELECT查询时，如果结果集数据量很大，比如几万行数据，放在一个页面显示的话数据量太大，不如分页显示
- 分页实际上就是从结果集中“截取”出第M~N条记录。这个查询可以通过`LIMIT <M> OFFSET <N>`子句实现。
- `LIMIT`总是设定为`pageSize`；
- `OFFSET`计算公式为`pageSize * (pageIndex - 1)`。

```sql
# 每页3条记录。要获取第1页的记录，可以使用LIMIT 3 OFFSET 0：
SELECT id, name, gender, score
FROM students
ORDER BY score DESC
LIMIT 3 OFFSET 0;
#查询第2页，那么我们只需要“跳过”头3条记录，也就是对结果集从3号记录开始查询，把OFFSET设定为3
SELECT id, name, gender, score
FROM students
ORDER BY score DESC
LIMIT 3 OFFSET 3;
#查询第4页的时候，OFFSET应该设定为9
SELECT id, name, gender, score
FROM students
ORDER BY score DESC
LIMIT 3 OFFSET 9;
```

- `OFFSET`超过了查询的最大数量并不会报错，而是得到一个空的结果集。

- 在MySQL中，`LIMIT 15 OFFSET 30`还可以简写成`LIMIT 30, 15`。

- OFFSET是可选的，如果只写`LIMIT 15`，那么相当于LIMIT 15 OFFSET 0
- 使用`LIMIT <M> OFFSET <N>`分页时，随着`N`越来越大，查询效率也会越来越低。



## 聚合查询

- 对于统计总数、平均数这类计算，SQL提供了专门的聚合函数，使用聚合函数进行查询，就是聚合查询，它可以快速获得结果。

```sql
-- 使用聚合查询:
SELECT COUNT(*) FROM students;
-- 使用聚合查询并设置结果集的列名为num:
SELECT COUNT(*) num FROM students;
SELECT COUNT(*) boys FROM students WHERE gender = 'M';
SELECT AVG(score) average FROM students WHERE gender = 'M';

-- 每页3条记录，通过聚合查询获得总页数
SELECT CEILING(COUNT(*) / 3) FROM students;
```



| 函数 | 说明                                   |
| :--- | :------------------------------------- |
| SUM  | 计算某一列的合计值，该列必须为数值类型 |
| AVG  | 计算某一列的平均值，该列必须为数值类型 |
| MAX  | 计算某一列的最大值                     |
| MIN  | 计算某一列的最小值                     |

- 如果聚合查询的`WHERE`条件没有匹配到任何行，`COUNT()`会返回0，而`SUM()`、`AVG()`、`MAX()`和`MIN()`会返回`NULL`：



### 分组

- `GROUP BY`子句指定了按`class_id`分组，因此，执行该`SELECT`语句时，会把`class_id`相同的列先分组，再分别计算。与ODERBY 先查询出结果再筛选不同。

```sql
SELECT class_id, COUNT(*) num FROM students GROUP BY class_id;

-- 因为在任意一个分组中，只有class_id都相同，name是不同的，SQL引擎不能把多个name的值放入一行记录中。因此，聚合查询的列中，只能放入分组的列。
SELECT name, class_id, COUNT(*) num FROM students GROUP BY class_id;

-- 使用多个列进行分组。例如，我们想统计各班的男生和女生人数：
SELECT class_id, gender, COUNT(*) num FROM students GROUP BY class_id, gender;

```



## 多表查询

- 这种多表查询又称笛卡尔查询，使用笛卡尔查询时要非常小心，由于结果集是目标表的行数乘积，对两个各自有100行记录的表进行笛卡尔查询将返回1万条记录，对两个各自有1万行记录的表进行笛卡尔查询将返回1亿条记录。

```sql
SELECT
    students.id sid,
    students.name,
    students.gender,
    students.score,
    classes.id cid,
    classes.name cname
FROM students, classes;

SELECT
    s.id sid,
    s.name,
    s.gender,
    s.score,
    c.id cid,
    c.name cname
FROM students s, classes c;

SELECT
    s.id sid,
    s.name,
    s.gender,
    s.score,
    c.id cid,
    c.name cname
FROM students s, classes c
WHERE s.gender = 'M' AND c.id = 1;
```

## 连接查询

### 内连接

1. 先确定主表，仍然使用`FROM <表1>`的语法；
2. 再确定需要连接的表，使用`INNER JOIN <表2>`的语法；
3. 然后确定连接条件，使用`ON <条件...>`，这里的条件是`s.class_id = c.id`，表示`students`表的`class_id`列与`classes`表的`id`列相同的行需要连接；
4. 可选：加上`WHERE`子句、`ORDER BY`等子句。

```sql
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
INNER JOIN classes c
ON s.class_id = c.id;
```

### 外连接

- INNER JOIN只返回同时存在于两张表的行数据，由于`students`表的`class_id`包含1，2，3，`classes`表的`id`包含1，2，3，4，所以，INNER JOIN根据条件`s.class_id = c.id`返回的结果集仅包含1，2，3。

- RIGHT OUTER JOIN返回右表都存在的行。如果某一行仅在右表存在，那么结果集就会以`NULL`填充剩下的字段。

- LEFT OUTER JOIN则返回左表都存在的行。如果我们给students表增加一行，并添加class_id=5，由于classes表并不存在id=5的行，所以，LEFT OUTER JOIN的结果会增加一行，对应的`class_name`是`NULL`：
- FULL OUTER JOIN，它会把两张表的所有记录全部选择出来，并且，自动把对方不存在的列填充为NULL
- ![image-20210616195108976](/Users/hc/Library/Application Support/typora-user-images/image-20210616195108976.png)

```sql
# 右连接
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
RIGHT OUTER JOIN classes c
ON s.class_id = c.id;
# 左连接
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
LEFT OUTER JOIN classes c
ON s.class_id = c.id;
# 全外连接
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
FULL OUTER JOIN classes c
ON s.class_id = c.id;
```



# 修改数据

- 增删改查，即CRUD：Create、Retrieve、Update、Delete

- 增、删、改，对应的SQL语句分别是：
  - INSERT：插入新记录；
  - UPDATE：更新已有记录；
  - DELETE：删除已有记录；

## 插入

- 基本语法是：INSERT INTO <表名> (字段1, 字段2, ...) VALUES (值1, 值2, ...);

- 要注意，字段顺序不必和数据库表的字段顺序一致，但值的顺序必须和字段顺序一致。也就是说，可以写`INSERT INTO students (score, gender, name, class_id) ...`，但是对应的`VALUES`就得变成`(80, 'M', '大牛', 2)`。

```sql
INSERT INTO students (class_id, name, gender, score) VALUES (2, '大牛', 'M', 80);
INSERT INTO students (class_id, name, gender, score) VALUES
  (1, '大宝', 'M', 87),
  (2, '二宝', 'M', 81);
```

```matlab
syms t,x,a1,a4,a3,a,b,c,J;
u(t)= a4./(exp(a1*t)+a2+exp(-a3*t)) 
J = (-1./2)diff(u(t)).^2+(1./2)*a*u(t).^2+1./3*b*u(t).^3+1./4*c*u(t).^4; % 
int(J, t, -inf,inf);
```

## 更新

- `UPDATE`语句的基本语法是：UPDATE <表名> SET 字段1=值1, 字段2=值2, ... WHERE ...;
- 在执行`UPDATE`语句时要非常小心，最好先用`SELECT`语句来测试`WHERE`条件是否筛选出了期望的记录集，然后再用`UPDATE`更新

```sql
UPDATE students SET name='大牛', score=66 WHERE id=1;
UPDATE students SET name='小牛', score=77 WHERE id>=5 AND id<=7;

-- 更新所有记录 要十分小心！！！
UPDATE students SET score=60;
```

## 删除

- 删除数据库表中的记录，我们可以使用`DELETE`语句。
- 和`UPDATE`类似，不带`WHERE`条件的`DELETE`语句会删除整个表的数据

- ```sql
  DELETE FROM <表名> WHERE ...;
  DELETE FROM students WHERE id=1;
  -- 删除整个表，小心！！！
  DELETE FROM students;
  ```

