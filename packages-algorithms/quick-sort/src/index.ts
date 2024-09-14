export function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter((num) => num < pivot);
    const right = arr.filter((num) => num > pivot);
    const middle = arr.filter((num) => num === pivot);

    return [...quickSort(left), ...middle, ...quickSort(right)];
}