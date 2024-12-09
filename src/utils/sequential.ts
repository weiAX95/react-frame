function sequentialSearch(arr: number[], target: number) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(sequentialSearch(arr, 5)); // 输出: 4
