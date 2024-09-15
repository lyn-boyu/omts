export function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return arr;

  const maxVal = Math.max(...arr);
  const minVal = Math.min(...arr);
  const range = maxVal - minVal + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  // Step 1: Count the occurrences of each element
  for (const num of arr) {
    count[num - minVal]++;
  }

  // Step 2: Update the count array to contain actual positions
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // Step 3: Build the output array
  for (let i = arr.length - 1; i >= 0; i--) {
    const offset = arr[i] - minVal;
    const outputIndex = count[offset] - 1;
    output[outputIndex] = arr[i];
    count[offset]--;
  }

  return output;
}
