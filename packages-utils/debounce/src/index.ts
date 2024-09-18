export function debounce<T extends (...args: any[]) => any, Context = any>(
    func: T,
    wait: number,
    immediate: boolean = false
): (...args: Parameters<T>) => void {
    let timmerIdx: ReturnType<typeof setTimeout> | null = null;

    return function debouncedFunction(...args: Parameters<T>) {
        // save context of the function
        // @ts-ignore: Ignore 'this' implicitly has type 'any' error
        const context = this


        const latter = () => {
            timmerIdx = null;
            // if immediate is true, the function is called at the beginning of the delay
            if (!immediate) func.apply(context, args);
        }

        // when immediate is true, it will be called in two cases:
        // 1. the function is only called before debounce starts 
        // 2. after the timmer is cleared
        const callNow = immediate && timmerIdx === null;

        // remove old timmer
        if (timmerIdx) {
            clearTimeout(timmerIdx);
        }

        // record the new timmer
        timmerIdx = setTimeout(latter, wait);

        // if immediate is true, the function is called at the beginning of the delay
        if (callNow) func.apply(context, args);
    }
}