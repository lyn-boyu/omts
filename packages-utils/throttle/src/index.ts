interface ThrottleOptions {
    leading?: boolean;  // Defaults to true, controls execution on the leading edge
    trailing?: boolean; // Defaults to true, controls execution on the trailing edge
}


export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number,
    options: ThrottleOptions = { leading: true, trailing: true }
): (...args: Parameters<T>) => void {
    
    let timerIdx: ReturnType<typeof setTimeout> | null = null;
    let lastContext: any = null;
    let lastCalled: number | null = null;
    let lastArgs: Parameters<T> | null = null

    const { leading = true, trailing = true } = options;

    const later = () => {
        timerIdx = null;
        if (trailing && lastArgs) {
            func.apply(lastContext, lastArgs as Parameters<T>);
            lastCalled = Date.now();
            lastArgs = null;
            lastContext = null;
        }
    }

    return function (...args: Parameters<T>) {
        const now = Date.now();

        if (!lastCalled && !leading) lastCalled = now;

        // claculate the remaining time
        const remainingTime = limit - (now - (lastCalled || 0));

        // @ts-ignore: Ignore 'this' implicitly has type 'any' error
        lastContext = this;
        lastArgs = args;

        // there are two cases that the function should be called:
        // 1. the first time the function is called when leading is true
        // 2. the time between the last call and now is greater than the limit
        if (remainingTime <= 0 || !lastCalled) {
            if (timerIdx) {
                clearTimeout(timerIdx);
                timerIdx = null;
            }
            // @ts-ignore: Ignore 'this' implicitly has type 'any' error
            func.apply(this, args);
            lastCalled = now;
        } else if (!timerIdx && trailing) {
            // If the function is called within the throttle limit and there is no pending trailing call,
            // schedule the function to be called at the end of the throttle limit.
            timerIdx = setTimeout(later, remainingTime);
        } else {
            // ignore the call
        }
    }
}
