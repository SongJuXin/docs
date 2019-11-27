"use strict";
//阶乘

//非尾调用
function  factorial(n) {
    if(n==1)return 1
    return factorial(n-1)*n
}
//尾调用
function fact2(n,a=1) {
    if(n==1)return a
    return fact2(n-1,a*n)
}
//循环
function fact3(n) {
    let result=1
    for(let i=1;i<=n;i++){
        result*=i
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
testTime(factorial,n)
testTime(fact2,n)
testTime(fact3,n)
//v7.10.1
/*
未开启tco
 node --stack_size=8000     ./fact.js
fact n为80000: 6.221ms
fact2 n为80000: 6.967ms
fact3 n为80000: 2.511ms
*/
/*
开启tco
 node --stack_size=8000   --harmony_tailcalls  ./fact.js
fact n为80000: 6.289ms
fact2 n为80000: 1.768ms
fact3 n为80000: 2.060ms
* */


