function curry(fn) {
  return function curried(...args) {
    if(args.length<fn.length){
      return function (...args1){
        return curried(...args,...args1)
      }
    }
    return  fn(...args)
  };
}
function  curry1(fn,...args){
  return function curried(...arg1s){
    const newArgs=[...args,...arg1s]
    if(newArgs.length<fn.length){
      return curry1(fn,...newArgs)
    }
    return  fn(...newArgs)
  }
}
function  curry2(fn){
  let args=[]
  return function help(...arg1s){
    args=[...args,...arg1s]
    if(args.length<fn.length){
      return help
    }
    const exArgs=[...args]
    args=[]
    return  fn(...exArgs)
  }
}



const add = (a,b,c)=>a+b+c
const curriedAdd = curry(add);
const curriedAdd1 = curry1(add);
const curriedAdd2 = curry2(add);

console.log(curriedAdd(1)(2)(3)); // Outputs 6
console.log(curriedAdd1(1)(2)(3)); // Outputs 6
console.log(curriedAdd2(1)(2)(3)); // Outputs 6

console.log(curriedAdd(4,5)(6)); // Outputs 15
console.log(curriedAdd1(4,5)(6)); // Outputs 15
console.log(curriedAdd2(4,5)(6)); // Outputs 15

console.log(curriedAdd(1)(2,3)); // Outputs 5
console.log(curriedAdd1(1)(2,3)); // Outputs 5
console.log(curriedAdd2(1)(2,3)); // Outputs 5
