/**
 * Bucket Sort function that sorts an array of elements.
 * The number of buckets is determined by the square root of the array's length.
 * Elements are distributed into the buckets, and each bucket is sorted individually.
 * 
 * @param arr The array of elements to be sorted.
 * @param compareFn Optional custom comparison function to define the sorting order inside each bucket.
 *                  If not provided, the default comparison is used (ascending order for numbers).
 * @param bucketRangeOption Optional parameter to specify the range of each bucket. 
 *                          If not provided, it will be automatically calculated based on the data range.
 * @returns A sorted array of elements.
 */
export function bucketSort(arr: number[], compareFn?: (a: number, b: number) => number, bucketRangeOption?: number): number[] {

    // Return early if the array has 1 or fewer elements, as it is already sorted.
    if (arr.length <= 1) return arr;

    // Find the minimum and maximum values in the array (assuming numeric values for bucket calculations).
    const minValue = Math.min(...(arr as unknown as number[]));  // Type casting to number[] for bucket calculations
    const maxValue = Math.max(...(arr as unknown as number[]));

    // Calculate the number of buckets based on the square root of the array's length.
    const bucketCount = Math.floor(Math.sqrt(arr.length));

    // Determine the range of each bucket.
    const bucketRange = bucketRangeOption ?? (maxValue - minValue) / bucketCount;

    // Create an array of empty buckets. Each bucket will store an array of elements.
    const buckets = Array.from({ length: bucketCount }, () => [] as number[]);

    // Distribute elements into the appropriate bucket based on their value.
    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        // Ensure that the bucket index does not exceed the number of buckets.
        const bucketIdx = Math.min(bucketCount - 1, Math.floor((value as unknown as number - minValue) / bucketRange));
        buckets[bucketIdx].push(value);
    }

    // TODO 1:
    // Use parallel processing, such as Web Workers (in browsers) or threads (in Node.js),
    // to sort buckets in parallel for performance improvement.

    // TODO 2:
    // Optimize the sorting algorithm for each bucket based on the bucket size:
    // - For small buckets, use insertion sort for its time complexity close to O(n) for small arrays.
    // - For large buckets, use more efficient algorithms like quicksort or mergesort.

    const comparator = compareFn ?? ((a, b) => a - b)
    const isDesc = comparator(1, 2) > 0
    // Sort each bucket using the provided compare function (or the default if not provided).
    // After sorting, we merge buckets in the correct order.
    const sortedBuckets = buckets.map(bucket => bucket.sort(comparator));

    // If compareFn is specified, we respect the sorting order during the merge
    // For ascending order, we merge buckets as they are.
    // For descending order, we reverse the buckets order.
    return sortedBuckets.reduce((acc, bucket) => isDesc ? bucket.concat(acc) : acc.concat(bucket), []);

}
