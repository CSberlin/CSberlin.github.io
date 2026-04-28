---
title: java面向对象编程
date: 2023-11-14 12:00:00
toc: true
mathjax: true
categories: Java
tags:
  - Java
copyright: true
---

# 方法

## private 方法

定义`private`方法的理由是内部方法是可以调用`private`方法



```java
public class Main {
    public static void main(String[] args) {
        Person ming = new Person();
        ming.setBirth(2008);
        System.out.println(ming.getAge());
    }
}

class Person {
    private String name;
    private int birth;
}

public void setBirth(int birth) {
    this.birth = birth;
}

public int getAge() {
    return calcAge(2019); // 调用private方法
}

// private方法:
private int calcAge(int currentYear) {
    return currentYear - this.birth;
}
```
`calcAge()`是一个`private`方法，外部代码无法调用，但是，内部方法`getAge()`可以调用它。

`Person`类只定义了`birth`字段，没有定义`age`字段，获取`age`时，通过方法`getAge()`返回的是一个实时计算的值，并非存储在某个字段的值。这说明方法可以封装一个类的对外接口，调用方不需要知道也不关心`Person`实例在内部到底有没有`age`字段。



## this 变量

在方法内部，可以使用一个隐含的变量`this`，它始终指向当前实例。因此，通过`this.field`就可以访问当前实例的字段。如果没有命名冲突，可以省略`this`。如果有局部变量和字段重名，那么局部变量优先级更高，就必须加上`this`。

```java
class Person {
    private String name;
    public void setName(String name) {
        this.name = name;
    }
}
```



## 可变参数

 可变参数用`类型...`定义，可变参数相当于数组类型

```java
class Group {
    private String[] names;

    public void setNames(String... names) {
        this.names = names;
    }
}
```

可以把可变参数改写为`String[]`类型

```java
 public void setNames(String[] names) {
        this.names = names;
    }
```

调用方需要自己先构造`String[]`,调用方可以传入`null`

```java
Group g = new Group();
g.setNames(new String[] {"Xiao Ming", "Xiao Hong", "Xiao Jun"});
```

可变参数可以保证无法传入`null`，因为传入0个参数时，接收到的实际值是一个空数组而不是`null`

## 参数绑定

- 基本类型参数传递，是调用方值的复制。双方各自的后续修改，互不影响。
- 引用类型参数的传递，调用方的变量，接收方的参数变量，指向的是同一个对象。双方任意一方对这个对象的修改，都会影响对方

# 构造函数

- 调用构造方法，必须用`new`操作符。

## 默认构造方法

- 如果一个类没有定义构造方法，编译器会自动为我们生成一个默认构造方法，它没有参数，也没有执行语句
- 自定义了一个构造方法，那么，编译器就*不再*自动创建默认构造方法
- 如果既要能使用带参数的构造方法，又想保留不带参数的构造方法，那么只能把两个构造方法都定义出来
- 也可以对字段直接进行初始化，最终根据调用的构造方法确定
- 可以定义多个构造方法，在通过`new`操作符调用的时候，编译器通过构造方法的参数数量、位置和类型自动区分
- 一个构造方法可以调用其他构造方法，这样做的目的是便于代码复用。调用其他构造方法的语法是`this(…)`

```java
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person(String name) {
        this(name, 18); // 调用另一个构造方法Person(String, int)
    }

    public Person() {
        this("Unnamed"); // 调用另一个构造方法Person(String)
    }
}
```

## 方法重载

- 定义：如果有一系列方法，它们的功能都是类似的，只有参数有所不同，那么，可以把这一组方法名做成*同名*方法。这种方法名相同，但各自的参数不同，称为方法重载（`Overload`）。
- 方法重载的返回值类型通常都是相同的。
- 方法重载的目的是，功能类似的方法使用同一名字，调用起来更简单

# 继承

## protected

- 继承子类无法访问父类的`private`字段或者`private`方法

- `protected`关键字可以把字段和方法的访问权限控制在继承树内部，一个`protected`字段和方法可以被其子类，以及子类的子类所访问

  ## super

  - `super`关键字表示父类（超类）。子类引用父类的字段时，可以用`super.fieldName`。

    ```java
    class Student extends Person {
        public String hello() {
            return "Hello, " + super.name;
        }
    }
    ```

  - 这里使用`super.name`，或者`this.name`，或者`name`，效果都是一样的。编译器会自动定位到父类的`name`字段。

  - 任何`class`的构造方法，第一行语句必须是调用父类的构造方法。如果没有明确地调用父类的构造方法，编译器会帮我们自动加一句`super();`

    ```java
    class Student extends Person {
        protected int score;
    
        public Student(String name, int age, int score) {
            super(); // 自动调用父类的构造方法
            this.score = score;
        }
    }
    ```

    此时`Person`类并没有无参数的构造方法，因此，编译失败。改`super`父类调用方法

    ```java
    public Student(String name, int age, int score) {
            super(name, age); // 调用父类的构造方法Person(String, int)
            this.score = score;
        }
    ```

  - 如果父类没有默认的构造方法，子类就必须显式调用`super()`并给出参数以便让编译器定位到父类的一个合适的构造方法。

  - 子类*不会继承*任何父类的构造方法。子类默认的构造方法是编译器自动生成的，不是继承的。

## 阻止继承

Java 15开始，允许使用`sealed`修饰class，并通过`permits`明确写出能够从该class继承的子类名称。

定义一个`Shape`类

```java
public sealed class Shape permits Rect, Circle, Triangle {
    ...
}
```

- 上述`Shape`类就是一个`sealed`类，它只允许指定的3个类继承它
- `Ellipse`并未出现在`Shape`的`permits`列表中。这种`sealed`类主要用于一些框架，防止继承被滥用

## 向上、向下转型

- `Person`类型的变量，如果指向`Student`类型的实例，对它进行操作。把一个子类类型安全地变为父类类型的赋值，被称为向上转型（upcasting）

- 把一个父类类型强制转型为子类类型，就是向下转型（downcasting）

  ```java
  Student s2 = (Student) p2; // runtime error! ClassCastException!
  ```

  - 不能把父类变为子类，因为子类功能比父类多，多的功能无法凭空变出来。

    ```java
    Person p = new Student();
    if (p instanceof Student) {
        // 只有判断成功才会向下转型:
        Student s = (Student) p; // 一定会成功
    }
    
    
    //Java 14开始，判断instanceof后，可以直接转型为指定变量，避免再次强制转型。
    public class Main {
        public static void main(String[] args) {
            Object obj = "hello";
            if (obj instanceof String s) {
                // 可以直接使用变量s:
                System.out.println(s.toUpperCase());
            }
        }
    }
    ```

## 组合与继承

- 继承是is关系，组合是has关系 

- 具有has关系不应该使用继承，而是使用组合，即`Student`可以持有一个`Book`实例

- ```java
  class Student extends Person {
      protected Book book;
      protected int score;
  }
  ```

# 多态

- 重写是子类对父类的允许访问的方法的实现过程进行重新编写, 返回值和形参都不能改变。**即外壳不变，核心重写！**

  重写的好处在于子类可以根据需要，定义特定于自己的行为。 也就是说子类能够根据需要实现父类的方法。

- 重载(overloading) 是在一个类里面，方法名字相同，而参数不同。返回类型可以相同也可以不同。

  每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。

- 如果方法签名不同，就是Overload，Overload方法是一个新方法；如果方法签名相同，并且返回值也相同，就是`Override`。

```java
class Person {
    public void run() { … }
}

class Student extends Person {
    // 不是Override，因为参数不同:
    public void run(String s) { … }
    // 不是Override，因为返回值不同:
    public int run() { … }
}
```

加上`@Override`可以让编译器帮助检查是否进行了正确的覆写。

- 引用类型为`Person`的变量，调用其`run()`方法，调用的是`Student`的`run()`方法
- Java的实例方法调用是基于运行时的实际类型的动态调用，而非变量的声明类型。
- 多态的特性就是，运行期才能动态决定调用的子类方法。

```java
public class Main {
    public static void main(String[] args) {
        // 给一个有普通收入、工资收入和享受国务院特殊津贴的小伙伴算税:
        Income[] incomes = new Income[] {
            new Income(3000),
            new Salary(7500),
            new StateCouncilSpecialAllowance(15000)
        };
        System.out.println(totalTax(incomes));
    }
}
public static double totalTax(Income... incomes) {
    double total = 0;
    for (Income income: incomes) {
        total = total + income.getTax();
    }
    return total;
}

class Income {
    protected double income;

    public Income(double income) {
        this.income = income;
    }
    
    public double getTax() {
        return income * 0.1; // 税率10%
    }
}

class Salary extends Income {
    public Salary(double income) {
        super(income);
    }

    @Override
    public double getTax() {
        if (income <= 5000) {
            return 0;
        }
        return (income - 5000) * 0.2;
    }

}

class StateCouncilSpecialAllowance extends Income {
    public StateCouncilSpecialAllowance(double income) {
        super(income);
    }

    @Override
    public double getTax() {
        return 0;
    }

}
```


- 利用多态，`totalTax()`方法只需要和`Income`打交道，它完全不需要知道`Salary`和`StateCouncilSpecialAllowance`的存在，就可以正确计算出总的税。如果我们要新增一种稿费收入，只需要从`Income`派生，然后正确覆写`getTax()`方法就可以。把新的类型传入`totalTax()`，不需要修改任何代码。

- 在编译阶段，只是检查参数的引用类型。

  然而在运行时，Java 虚拟机(JVM)**指定对象的类型并且运行该对象的方法**。

  因此在上面的例子中，之所以能编译成功，是因为 Animal 类中存在 move 方法，然而运行时，运行的是特定对象的方法。

  ```java
  public class TestDog{
     public static void main(String args[]){
        Animal a = new Animal(); // Animal 对象
        Animal b = new Dog(); // Dog 对象
   
        a.move();// 执行 Animal 类的方法
        b.move();//执行 Dog 类的方法
        b.bark();//报错，因为b的引用类型Animal没有bark方法。
     }
  }
  ```

  

  



## 覆写Object方法

因为所有的`class`最终都继承自`Object`，而`Object`定义了几个重要的方法：

- `toString()`：把instance输出为`String`；
- `equals()`：判断两个instance是否逻辑相等；
- `hashCode()`：计算一个instance的哈希值。

在必要的情况下，我们可以覆写`Object`的这几个方法。

```java
class Person {
    ...
    // 显示更有意义的字符串:
    @Override
    public String toString() {
        return "Person:name=" + name;
    }

    // 比较是否相等:
    @Override
    public boolean equals(Object o) {
        // 当且仅当o为Person类型:
        if (o instanceof Person) {
            Person p = (Person) o;
            // 并且name字段相同时，返回true:
            return this.name.equals(p.name);
        }
        return false;
    }

    // 计算hash:
    @Override
    public int hashCode() {
        return this.name.hashCode();
    }
}
```

## 调用super

在子类的覆写方法中，如果要调用父类的被覆写的方法，可以通过`super`来调用。

## final

- `final`修饰符有多种作用：
  - `final`修饰的方法可以阻止被覆写；
  - `final`修饰的class可以阻止被继承；
  - `final`修饰的field必须在创建对象时初始化，随后不可修改。

# 抽象类

- 一个`class`定义了方法，但没有具体执行代码，这个方法是抽象方法，抽象方法用`abstract`修饰。把一个方法声明为`abstract`，表示它是一个抽象方法，本身没有实现任何方法语句。因为这个抽象方法本身是无法执行的，所以，`Person`类也无法被实例化。把`Person`类本身也声明为`abstract`，才能正确编译它。

- ```java
  abstract class Person {
      public abstract void run();
  }
  ```

- 因为无法执行抽象方法，因此这个类也必须申明为抽象类（abstract class）。

- ```java
  abstract class Person {
      public abstract void run();
  }
  ```

- `Person`类定义了抽象方法`run()`，那么，在实现子类`Student`的时候，就必须覆写`run()`方法。如果不实现抽象方法，则该子类仍是一个抽象类

## 面向抽象编程

面向抽象编程的本质就是：

- 上层代码只定义规范（例如：`abstract class Person`）；
- 不需要子类就可以实现业务逻辑（正常编译）；
- 具体的业务逻辑由不同的子类实现，调用者并不关心。

- 抽象类本身被设计成只能用于被继承，因此，抽象类可以强迫子类实现其定义的抽象方法，否则编译会报错。因此，抽象方法实际上相当于定义了“规范”。

  ```java
  Person s = new Student();
  Person t = new Teacher();
  
  // 不关心Person变量的具体子类型:
  s.run();
  t.run();
  ```

对其进行方法调用，并不关心`Person`类型变量的具体子类型

# 接口

- `interface`，就是比抽象类还要抽象的纯抽象接口，因连字段都不能有。表示一个接口类型和一组方法签名，而编程接口泛指接口规范，如方法签名，数据格式，网络协议等。
- 抽象方法本质上是定义接口规范：即规定高层类的接口，从而保证所有子类都有相同的接口实现
- 一个抽象类没有字段，所有方法全部都是抽象方法，可以把该抽象类改写为接口：`interface`。

```java
interface Person {
    void run();
    String getName();
}
class Student implements Person {
    private String name;

    public Student(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        System.out.println(this.name + " run");
    }

    @Override
    public String getName() {
        return this.name;
    }
}
```

- Java中，一个类只能继承自另一个类，不能从多个类继承。一个类可以实现多个`interface`。

- ```java
  class Student implements Person, Hello { // 实现了两个interface
      ...
  }
  ```

- 方法签名由方法名称和一个参数列表（方法的参数的顺序和类型）组成

|            | abstract class       | interface                   |
| :--------- | :------------------- | :-------------------------- |
| 继承       | 只能extends一个class | 可以implements多个interface |
| 字段       | 可以定义实例字段     | 不能定义实例字段            |
| 抽象方法   | 可以定义抽象方法     | 可以定义抽象方法            |
| 非抽象方法 | 可以定义非抽象方法   | 可以定义default方法         |

## 接口继承

- `interface`继承自`interface`使用`extends`，它相当于扩展了接口的方法。

```java
interface Hello {
    void hello();
}

interface Person extends Hello {
    void run();
    String getName();
}
```

## 继承关系

- 公共逻辑适合放在`abstract class`中，具体逻辑放到各个子类，而接口层次代表抽象程度。

- 使用的时候，实例化的对象永远只能是某个具体的子类，但总是通过接口去引用它，因为接口比抽象类更抽象

```java
List list = new ArrayList(); // 用List接口引用具体子类的实例
Collection coll = list; // 向上转型为Collection接口
Iterable it = coll; // 向上转型为Iterable接口
```

## default

实现类可以不必覆写`default`方法。`default`方法的目的是，当我们需要给接口新增一个方法时，会涉及到修改全部子类。如果新增的是`default`方法，那么子类就不必全部修改，只需要在需要覆写的地方去覆写新增方法。

# 静态字段和静态方法

## 静态字段

- 用`static`修饰的字段，称为静态字段：`static field`
- 实例字段在每个实例中都有自己的一个独立“空间”，但是静态字段只有一个共享“空间”，所有实例都会共享该字段。
- 用类名来访问静态字段。可以把静态字段理解为描述`class`本身的字段（非实例字段）

## 静态方法

- 调用实例方法必须通过一个实例变量，而调用静态方法则不需要实例变量，通过类名就可以调用。

- 静态方法属于`class`而不属于实例，因此，静态方法内部，无法访问`this`变量，也无法访问实例字段，它只能访问静态字段。

- 静态方法经常用于工具类。例如：
  - Arrays.sort()
  - Math.random()

- 静态方法也经常用于辅助方法。Java程序的入口`main()`也是静态方法。

## 接口的静态字段

- `interface`是一个纯抽象类，所以它不能定义实例字段。但是，`interface`是可以有静态字段的，并且静态字段必须为`final`类型。
- 因为`interface`的字段只能是`public static final`类型，编译器会自动把该字段变为`public static final`类型。

# 包

- 没有定义包名的`class`，它使用的是默认包，非常容易引起名字冲突。使用`package`来解决名字冲突。

  > 小明的`Person`类存放在包`ming`下面，因此，完整类名是`ming.Person`；
  >
  > 小红的`Person`类存放在包`hong`下面，因此，完整类名是`hong.Person`；
  >
  > 小军的`Arrays`类存放在包`mr.jun`下面，因此，完整类名是`mr.jun.Arrays`；

```ascii
package_sample
└─ src
    ├─ hong
    │  └─ Person.java
    │  ming
    │  └─ Person.java
    └─ mr
       └─ jun
          └─ Arrays.java
```

小军的`Arrays.java`文件：

```java
package mr.jun; // 申明包名mr.jun

public class Arrays {
}
```

- **包没有父子关系。java.util和java.util.zip是不同的包，两者没有任何继承关系。

  在`src`目录下执行`javac`命令

```shell
javac -d ../bin ming/Person.java hong/Person.java mr/jun/Arrays.java
```

```ascii
package_sample
└─ bin
   ├─ hong
   │  └─ Person.class
   │  ming
   │  └─ Person.class
   └─ mr
      └─ jun
         └─ Arrays.class
```

## import

- 小明的`ming.Person`类，如果要引用小军的`mr.jun.Arrays`类。

```java
// Person.java
package ming;

// 导入完整类名:
import mr.jun.Arrays;

public class Person {
    public void run() {
        Arrays arrays = new Arrays();
    }
}
```

Java编译器最终编译出的`.class`文件只使用*完整类名*，因此，在代码中，当编译器遇到一个`class`名称时：

- 如果是完整类名，就直接根据完整类名查找这个`class`；
- 如果是简单类名，按下面的顺序依次查找：
  - 查找当前`package`是否存在这个`class`；
  - 查找`import`的包是否包含这个`class`；
  - 查找`java.lang`包是否包含这个`class`。
  - 无法确定类名，编译报错

编写class的时候，编译器会自动帮我们做两个import动作：

- 默认自动`import`当前`package`的其他`class`；
- 默认自动`import java.lang.*`。但类似java.lang.reflect这些包仍需要手动导入。
- 如果有两个`class`名称相同，例如，`mr.jun.Arrays`和`java.util.Arrays`，那么只能`import`其中一个，另一个必须写完整类名

## 工程实践包管理

为了避免名字冲突，我们需要确定唯一的包名。推荐的做法是使用倒置的域名来确保唯一性。例如：

- org.apache
- org.apache.commons.log
- com.liaoxuefeng.sample

子包就可以根据功能自行命名。

要注意不要和`java.lang`包的类重名，即自己的类不要使用这些名字：

- String
- System
- Runtime
- ...

要注意也不要和JDK常用类重名：

- java.util.List
- java.text.Format
- java.math.BigInteger
- ...

# 作用域

- `public`、`protected`、`private`修饰符。这些修饰符可以用来限定访问作用域。

## public

- 定义为`public`的`class`、`interface`可以被其他任何类访问，不在一个包的类也可以。

- 定义为`public`的`field`、`method`可以被其他类访问，前提是首先有访问`class`的权限

## private

- 定义为`private`的`field`、`method`无法被其他类访问
- `private`访问权限被限定在`class`的内部，而且与方法声明顺序*无关*。推荐把`private`方法放到后面，因为`public`方法定义了类对外提供的功能，阅读代码的时候，应该先关注`public`方法
- 定义在一个`class`内部的`class`称为嵌套类（`nested class`），嵌套类拥有访问`private`的权限。

## protected

- `protected`作用于继承关系。定义为`protected`的字段和方法可以被子类访问，以及子类的子类

## package

- 一个类允许访问同一个`package`的没有`public`、`private`修饰的`class`，以及没有`public`、`protected`、`private`修饰的字段和方法。

## 实践

- 如果不确定是否需要`public`，就不声明为`public`，即尽可能少地暴露对外的字段和方法。

- 把方法定义为`package`权限有助于测试，因为测试类和被测试类只要位于同一个`package`，测试代码就可以访问被测试类的`package`权限方法。

- 一个`.java`文件只能包含一个`public`类，但可以包含多个非`public`类。如果有`public`类，文件名必须和`public`类的名字相同。

# 内部类

- 通常情况下，我们把不同的类组织在不同的包下面，对于一个包下面的类来说，它们是在同一层次，没有父子关系
- 还有一种类，它被定义在另一个类的内部，所以称为内部类（Nested Class）

## Inner Class

```java
class Outer {
    class Inner {
        // 定义了一个Inner Class
    }
}
```

- `Outer`是一个普通类，而`Inner`是一个Inner Class，它与普通类有个最大的不同，就是Inner Class的实例不能单独存在，必须依附于一个Outer Class的实例。

```java
Outer.Inner inner = outer.new Inner();
```

- 因为Inner Class的作用域在Outer Class内部，所以能访问Outer Class的`private`字段和方法。

- 编译后的`.class`文件可以发现，`Outer`类被编译为`Outer.class`，而`Inner`类被编译为`Outer$Inner.class`

## Anonymous Class



```java
class Outer {
    private String name;
    Outer(String name) {
    this.name = name;
}

  void asyncHello() {
      Runnable r = new Runnable() {
          @Override
          public void run() {
              System.out.println("Hello, " + Outer.this.name);
          }
      };
      new Thread(r).start();
  }
}
```
- `Runnable`本身是接口，接口是不能实例化的，所以这里实际上是定义了一个实现了`Runnable`接口的匿名类，并且通过`new`实例化该匿名类，然后转型为`Runnable`。在定义匿名类的时候就必须实例化它
- 匿名类和Inner Class一样，可以访问Outer Class的`private`字段和方法。之所以我们要定义匿名类，是因为在这里我们通常不关心类名，比直接定义Inner Class可以少写很多代码。
- 编译后的`.class`文件可以发现，`Outer`类被编译为`Outer.class`，而匿名类被编译为`Outer$1.class`。如果有多个匿名类，Java编译器会将每个匿名类依次命名为`Outer$1`、`Outer$2`、`Outer$3`
- 除了接口外，匿名类也完全可以继承自普通类

## Static Nested Class

- Static Nested Class是独立类，但拥有Outer Class的`private`访问权限
