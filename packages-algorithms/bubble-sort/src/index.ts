/**
 * Bubble Sort function that sorts an array using the provided comparator.
 * @param arr The array to be sorted.
 * @param compareFn A comparator function that defines the sort order. Optional.
 * @returns A new sorted array.
 */
export function bubbleSort<T>(
    arr: T[],
    compareFn: (a: T, b: T) => number = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
): T[] {
    let swapped: boolean;

    // Keep looping until no elements are swapped
    do {
        swapped = false;

        // Loop through the array and swap adjacent elements if they are out of order
        for (let i = 0; i < arr.length - 1; i++) {
            // Compare using the provided comparator function
            if (compareFn(arr[i], arr[i + 1]) > 0) {
                // Swap the elements if they are in the wrong order
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    } while (swapped); // If no swaps were made, the array is sorted

    return arr;
}
