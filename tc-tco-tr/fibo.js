"use strict";
//斐波那契数列

// 常规递归写法
function fibo(n) {
    if (n <= 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }
    return fibo(n - 1) + fibo(n - 2)
}

// 常规循环写法
function fibo2(n) {
    if (n <= 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }
    let x = 0,
        y = 1,
        sum = 0;
    for (let i = 2; i <= n; i++) {
        sum = x + y;
        x = y;
        y = sum;
    }
    return sum;
}

// 公式法
function fibo3(n) {
    if (n <= 0)
        return 0;
    else {
        const sqrtFive = Math.sqrt(5);
        const res = (Math.pow(0.5 + sqrtFive / 2, n) - Math.pow(0.5 - sqrtFive / 2, n)) / sqrtFive;
        return Math.round(res);
    }
}

// 尾递归写法
function fibo4(n, num1 = 1, num2 = 1) {
    if (n <= 0) {
        return 0;
    } else if (n === 1) {
        return num1;
    }
    return fibo4(n - 1, num2, num1 + num2);
}
function testTime(cb,...arg) {
    console.time(cb.name+' n为'+arg[0])
    cb(...arg)
    console.timeEnd(cb.name+' n为'+arg[0])
}
var n=40000
testTime(fibo,40)
testTime(fibo2,n)
testTime(fibo3,n)
testTime(fibo4,n)
//v7.10.1
/*
开启tco
node --stack_size=8000   --harmony_tailcalls  ./fibo.js
fibo n为40: 1187.191ms
fibo2 n为40000: 1.603ms
fibo3 n为40000: 0.139ms
fibo4 n为40000: 0.973ms
*/
/*
未开启tco
node --stack_size=8000    ./fibo.js
fibo n为40: 1128.403ms
fibo2 n为40000: 1.688ms
fibo3 n为40000: 0.125ms
fibo4 n为40000: 3.578ms
*/
