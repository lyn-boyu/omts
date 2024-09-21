/**
 * Merge Sort function that sorts an array using the provided comparator.
 * @param arr The array to be sorted.
 * @param compareFn A comparator function that defines the sort order. Optional.
 * @returns A new sorted array.
 */
export function mergeSort<T>(
    arr: T[],
    compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {

    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left, compareFn), mergeSort(right, compareFn), compareFn);
}

/**
 * Helper function to merge two sorted arrays.
 * @param left The left half of the array.
 * @param right The right half of the array.
 * @param compareFn A comparator function that defines the sort order.
 * @returns A merged and sorted array.
 */
function merge<T>(
    left: T[],
    right: T[],
    compareFn: (a: T, b: T) => number
): T[] {

    let result: T[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (compareFn(left[i], right[j]) <= 0) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i), right.slice(j));
}
