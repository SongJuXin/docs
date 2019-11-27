## 前言
我是先学的react，连学带使用有两年，后来学的vue，用了不到1年，可能是先入为主的原因，觉得vue的使用上有好多不能理解和不合理的地方，于是想从源码入手。

参照着几篇原理的文章以及官方文档和vue源码（2.6.10），断断续续研究了1个月。这算是第一次比较深入的研究源码，总算是对vue从实例化，到渲染，到数据更新，再渲染等过程有一个认识了，不再是靠记忆或者孰能生巧来理解生命周期了，但是vue的实现上感觉好多不合理的地方。
### 1.修改其他模块的内容
- 关于监听者模式的实现上

分别有observe，Watcher，Dep模块。Watcher依赖Dep，修改Dep.target；observe依赖Dep,以new Dep（）的形式调用，Dep里面又用到了Dep.target，一个模块竟然能被外部所修改它的属性。简化后就是说:
```javascript
//B.js
export default class B {
    constructor() {
        console.log('B.a 是',B.a)
    }
}
//index.js
import B from './B'
B.a=2
new B()//B.a 是 2
```
程序竟然直接修改了依赖方法的内部属性，这完全跟模块化相违背了吧。

- 其他形式的修改依赖组件的内容

这个就不举例子了，全都是，根本无法追踪数据的变化，任何地方都可能修改。这种编程模式，设计模式是什么，真的好混乱，跟我之前理解的面向对象编程，函数式编程都不沾边
### 2.模板里面的函数调用 
- 事件的行为很怪异，比如<my-button @getn="getNumber()" />与<my-button @getn="getNumber" />没有区别
### 3.模板满足不了一些场景
- template能满足大部分场景，但是一些场景还是不能兼顾，需要使用render方法，实际开发中当然不会用`h()`方法,使用jsx可能比较好，但是使用jsx就使用不了绝大多数的指令（v-model、v-for等），而开发需要保证风格一致，不会这里使用template，那里使用render，所以只有使用jsx了，导致template闲置。

## 参考资料
https://www.cnblogs.com/leaf930814/p/9014200.html
https://www.jianshu.com/p/123146abdd1a
https://www.jb51.net/article/107927.htm
https://cn.vuejs.org/v2/guide/installation.html
https://www.cnblogs.com/suyuanli/p/9655699.html
