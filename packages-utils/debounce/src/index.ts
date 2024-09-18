export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate: boolean = false
): (...args: Parameters<T>) => void {
    let timerIdx: ReturnType<typeof setTimeout> | null = null;

    return function debouncedFunction(...args: Parameters<T>) {
        // save context of the function
        // @ts-ignore: Ignore 'this' implicitly has type 'any' error
        const context = this


        const latter = () => {
            timerIdx = null;
            // if immediate is true, the function is called at the beginning of the delay
            if (!immediate) func.apply(context, args);
        }

        // when immediate is true, it will be called in two cases:
        // 1. the function is only called before debounce starts 
        // 2. after the timmer is cleared
        const callNow = immediate && timerIdx === null;

        // remove old timmer
        if (timerIdx) {
            clearTimeout(timerIdx);
        }

        // record the new timmer
        timerIdx = setTimeout(latter, wait);

        // if immediate is true, the function is called at the beginning of the delay
        if (callNow) func.apply(context, args);
    }
}