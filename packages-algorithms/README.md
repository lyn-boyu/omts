# Comparison of Sorting Algorithms




| **Sorting Algorithm** | **Time Complexity (Best)** | **Time Complexity (Average)** | **Time Complexity (Worst)** | **Space Complexity** | **Stability** | **Description** | **Use Cases** | **NPM Package Link** |
|-----------------------|----------------------------|-------------------------------|-----------------------------|----------------------|---------------|-----------------|---------------|----------------------|
| **Bubble Sort**        | O(n)                       | O(n²)                         | O(n²)                       | O(1)                 | Stable        | Simple but inefficient. Compares and swaps adjacent elements repeatedly. | Good for small datasets or when data is mostly sorted. | [Bubble Sort](https://www.npmjs.com/package/@omts/bubble-sort) |
| **Bucket Sort**        | O(n + k)                   | O(n + k)                      | O(n²)                       | O(n + k)             | Stable        | Distributes elements into buckets, sorts each bucket, then merges. Efficient for uniformly distributed data. | Best for data with a known range and uniform distribution. | [Bucket Sort](https://www.npmjs.com/package/@omts/bucket-sort) |
| **Counting Sort**      | O(n + k)                   | O(n + k)                      | O(n + k)                    | O(k)                 | Stable        | Counts occurrences of each element, sorts by reconstructing the array based on these counts. | Suitable for small integer datasets where `k` (range of values) is not much larger than `n` (number of elements). | [Counting Sort](https://www.npmjs.com/package/@omts/counting-sort) |
| **Merge Sort**         | O(n log n)                 | O(n log n)                    | O(n log n)                  | O(n)                 | Stable        | Divides the array into halves, sorts each half, and merges them. | Good for large datasets, but uses extra space. | [Merge Sort](https://www.npmjs.com/package/@omts/merge-sort) |
| **Quick Sort**         | O(n log n)                 | O(n log n)                    | O(n²)                       | O(log n) (with recursion) | Unstable      | Selects a pivot and partitions the array into elements smaller or larger than the pivot. Then sorts the partitions recursively. | Generally the fastest sort for large datasets, but worst-case performance can be poor without optimizations (e.g., random pivots). | [Quick Sort](https://www.npmjs.com/package/@omts/quick-sort) |

 

## Key Insights:
- **Bubble Sort** is inefficient for large datasets but simple to implement. Its main advantage is when the input is mostly sorted, where it can achieve a time complexity of O(n).
  
- **Bucket Sort** works best when the data is uniformly distributed over a known range. It can achieve O(n) time complexity in the best case, but it requires additional space for the buckets.

- **Counting Sort** is efficient for small integer datasets with a limited range of values. It is O(n + k) in time and O(k) in space, where `k` is the range of input values.

- **Merge Sort** guarantees O(n log n) time complexity in all cases and is stable, making it useful when a stable sort is required. However, it requires additional space, which is a trade-off.

- **Quick Sort** is typically the fastest algorithm in practice for large datasets, but it has a worst-case time complexity of O(n²) if poor pivot choices are made. It can be optimized with randomized pivots.

Each sorting algorithm has different strengths and weaknesses, so the choice of which to use depends on the specific use case, data characteristics, and constraints such as time and space complexity.
