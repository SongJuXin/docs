//合并两个有序数组，如给[0,1,3,5],[2,4,6]，返回新数组[0,1,2,3,5,6]
//mergeArr3是性能最高的，也是归并排序中merge方法。
var arr1=getOrderArr(100000)
var arr2=getOrderArr(100000)
function getRandom(m,n) {
    return Math.floor(Math.random()*(n-m))+m
}
function getOrderArr(n) {
    let arr=[]
    for(let i=1;i<n;i++){
        arr.push(getRandom(i,i+2))
    }
    return arr
}

function mergeArr(arr1,arr2) {
    const len1=arr1.length
    const len2=arr2.length
    for(let i=0;i<len2;i++){
        for(let j=0;j<arr1.length;j++){
            if(arr2[i]<=arr1[j]){
                arr1.splice(j,0,arr2[i])
                break
            }else{
                if(j==arr1.length-1){
                    arr1.push(arr2[i])
                    break
                }
            }
        }
    }
    return arr1
}
function mergeArr1(arr1,arr2){
    let i=0;j=0
    const len1=arr1.length
    const len2=arr2.length
    while (i<len1+len2-1){
        if(arr2[j]<=arr1[i]){
            arr1.splice(i,0,arr2[j])
            j++
        } else if(i==arr1.length-1){
            arr1.push(arr2[j])
            j++

        }
        i++
    }
    return arr1
}
function mergeArr2(arr1,arr2){
    let i=0;j=0
    let arr=[]
    const len1=arr1.length
    const len2=arr2.length
    while (i<len1||j<len2){
        if(!arr1[i]){
            arr.push(arr2[j])
            j++
            continue
        }
        if(!arr2[j]){
            arr.push(arr1[i])
            i++
            continue
        }
      if(arr1[i]<arr2[j]){
          arr.push(arr1[i])
          i++
      }else{
          arr.push(arr2[j])
          j++
      }
    }
    return arr
}
//mergeArr3最优
function mergeArr3(arr1,arr2){
    arr1=arr1.slice()
    let i=0;j=0
    let arr=[]
    const len1=arr1.length
    const len2=arr2.length
    while (i<len1&&j<len2){
        if(arr1[i]<arr2[j]){
            arr.push(arr1[i])
            i++
        }else{
            arr.push(arr2[j])
            j++
        }
    }
    while (i<len1){
        arr.push(arr1[i])
        i++
    }
    while (j<len2){
        arr.push(arr2[j])
        j++
    }
    return arr
}
function mergeArr4(arr1,arr2) {
    arr1=arr1.slice()

    let i=0;j=0
    let arr=[]
    while (arr1[i]||arr2[j]){
        if(!arr1[i]){
            arr.push(arr2.shift())
            continue
        }
        if(!arr2[j]){
            arr.push(arr1.shift())
            continue
        }
        if(arr1[i]<arr2[j]){
            arr.push(arr1.shift())
        }else{
            arr.push(arr2.shift())
        }
    }
    return arr
}

function mergeArray(arr1,arr2) {
    var ind1 = 0; //标记arr1的对比元素的初始索引值
    var ind2 = 0; //标记arr2的对比元素的初始索引值
    var arr = []; //作为输出的新数组
    while (ind1 < arr1.length && ind2 < arr2.length) { //当arr1和arr2元素均未全部存入arr中，则从第一个元素开始进行比较，将较小的那个元素存入arr
        if (arr1[ind1] <= arr2[ind2]) {
            arr.push(arr1.slice(ind1, ind1 + 1)[0]); //若arr1的对比元素小于arr2的对比元素，则将arr1的对比元素存入arr中
            ind1++;
        } else {
            arr.push(arr2.slice(ind2, ind2 + 1)[0]);
            ind2++;
        }
    }
    while (ind1 < arr1.length) { //当arr2的元素已全部存入arr中，则直接将arr1剩余的所有元素依次存入arr
        arr.push(arr1.slice(ind1, ind1 + 1)[0]);
        ind1++;
    }
    while (ind2 < arr2.length) { //当arr1的元素已全部存入arr中,则直接将arr2剩余的所有元素依次存入arr
        arr.push(arr2.slice(ind2, ind2 + 1)[0]);
        ind2++;
    }
    return arr;
}
//mergeArr(arr1,arr2)

console.time('merger')
mergeArr3(arr1,arr2)
console.timeEnd('merger')
// console.log(mergeArr(arr1,arr2))
// console.log(mergeArr1(arr1,arr2))
// console.log(mergeArr2(arr1,arr2))
//  console.log(mergeArr3(arr1,arr2))
//  console.log(mergeArr4(arr1,arr2))
// console.log(mergeArray(arr1,arr2))
