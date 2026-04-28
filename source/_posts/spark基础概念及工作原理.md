---
title: spark基础概念及工作原理
toc: true
mathjax: true
categories: 大数据
copyright: true
date: 2024-09-07 21:09:18
tags: ["大数据", "spark"]
---
# spark生态
(TODO: 放个高清图)
- 支持多种编程语言, 资源调度层支持local, standalone, yarn和k8s模式
- 提供丰富组件对应应用场景, spark core + Streaming, SQL, MLLib, R, GraphX等
- 多种存储介质, hdfs, hhive, aws, hbase, es, mysql, pg读写, 实时计算flume, kafka读写
- 数据格式丰富 txt, json, csv等格式, 数据压缩和海量查询有优势

# spark相对于hadoop的优势
1. 高性能: spark具有hadoop MR的所有优点, 且中间结果不需要写存储到HDFS, 直接保存到内存, 在内存做处理
2. 高容错: 
   1. 血统(Lineage)数据恢复: RDD(Resilient Distributed Dataset): 分布在一组节点中只读数据集合, 集合弹性且相互依赖. RDD中内容丢失可以根据血统关系重建.
   2. CheckPoint容错: 两种检测方式 -- 冗余数据和日志记录更新操作.
3. 通用性: 提供了除MR更丰富的操作, action(collect, reduce, save...)和transformations (map, union, join, filter...), shuffle, partition, 控制中间结果存储


# spark原理和特点
(TODO: 放张高清思维导图)

> spark core: 包括基础配置, 存储系统, 计算层, 调度原理

## spark基础配置
- spark context是spark应用程序入口, 隐藏了网络通信, 分布式部署, 消息通信... 开放人员根据sparkContext等api进行开放即可
- sparkRpc基于netty实现, 分为同步和异步. **事件总线**用于sparkContext组建间交换, 属于监听者模式化, 采用异步调用. 度量系统用于系统监控

## spark存储系统
- 优先考虑各节点内存, 内存存不下写磁盘, 可以控制远程调用到存储

## spark调度系统
> 包括DAGScheduler和TaskScheduler组成
- DAGScheduler把一个Job根据RDD间依赖, 划分成**多个Stage**, 对划分后的**每个**Stage抽象**为一个或者多个Task**组成的任务集, 随后交给TaskScheduler做Task的任务调度
- 调度算法: FIFO,FAIR

## spark sql
(TODO: 没大看懂, 回来再看看)
[spark参与计算的数据类型区别](https://github.com/heibaiying/BigData-Notes/blob/master/notes/SparkSQL_Dataset%E5%92%8CDataFrame%E7%AE%80%E4%BB%8B.md)
> 基于sql数据处理, 简化分布式数据集处理, 提供两种数据抽象, DataFrame和DataSet
- RDD, 相当于java里的进程能看到的对象, 但并不能看到对象内字段具体的内容
- DataFrame是分布式的Row对象的集合。DataFrame相当于结构化数据, 哪些列，每列的名称和类型各是什么。DataFrame多了数据的**结构信息**.
- Dataset可以认为是DataFrame的一个特例，主要区别是Dataset每一个record存储的是一个强类型值而不是一个Row。

## spark streaming
支持流数据的可伸缩和容错

# spark运行模式及集群角色

## spark运行模式
## spark集群角色
(TODO: 集群角色图)
> 集群管理节点cluster manager, 工作节点worker, 执行器executor, 驱动器driver, 应用程序application.
1. Cluster Manager
集群管理器, 存在Master进程中, 区分部署模式, 用于应用程序申请的资源管理
2. worker
worker是spark工作节点, 用于提交任务
- 通过注册机向cluster manager汇报cpu, 内存等
- 