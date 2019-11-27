"use strict";
//汉诺塔

//非尾调用
function hannoi(n) {
    if(n==1)return 1
    return hannoi(n-1)*2+1
}
//尾调用
function hannoi1(n,a=1) {
    if(n==1)return a
    return hannoi1(n-1,a*2+1)
}
//公式法
function hannoi2(n) {
    return 2**n-1
}
//循环
function hannoi3(n) {
    let result=0
    for(let i=0;i<n;i++){
        result=result*2+1
    }
    return result
}
//打印函数执行时间
function testTime(cb,...arg) {
    console.time(cb.name+' n为'+arg[0])
    cb(...arg)
    console.timeEnd(cb.name+' n为'+arg[0])
}
var n=80000
testTime(hannoi,n)
testTime(hannoi1,n)
testTime(hannoi2,n)
testTime(hannoi3,n)
//v7.10.1
/*
未开启tco
 node --stack_size=8000    ./hanoi.js
hannoi n为80000: 7.434ms
hannoi1 n为80000: 6.921ms
hannoi2 n为80000: 0.070ms
hannoi3 n为80000: 0.692ms
* */

/*
开启tco
 node --stack_size=8000   --harmony_tailcalls  ./hanoi.js
hannoi n为80000: 7.713ms
hannoi1 n为80000: 1.555ms
hannoi2 n为80000: 0.069ms
hannoi3 n为80000: 0.720ms
* */
