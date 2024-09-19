import { describe, expect, test, jest } from "bun:test";
import { debounce } from './index'; 

describe("debounce function tests", () => {

    test("should call the debounced function after the specified delay", (done) => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();

        expect(mockFn).not.toHaveBeenCalled();  // Should not be called immediately

        // Wait for 150ms to ensure the debounced function is called
        setTimeout(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);
            done();
        }, 150);
    });

    test("should not call the debounced function if invoked again before the delay", (done) => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();  // First call
        expect(mockFn).not.toHaveBeenCalled();  // Should not be called immediately

        // Wait for 50ms to call again, ensuring debounce is resetting the timer
        setTimeout(() => {
            debouncedFn();  // Call again within 100ms, resetting the debounce timer

            // Wait for another 100ms from the second call (total of 150ms since the first call)
            setTimeout(() => {
                expect(mockFn).toHaveBeenCalledTimes(1);  // Should only be called once
                done();
            }, 100);  // This 100ms is after the second call
        }, 50);  // First timeout is set to 50ms
    });

    test("should call the debounced function immediately when immediate flag is true", () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100, true);

        debouncedFn();

        expect(mockFn).toHaveBeenCalledTimes(1);  // Should be called immediately
    });

    test("should not call the debounced function again if invoked repeatedly and immediate flag is true", (done) => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100, true);

        debouncedFn();  // Immediate call
        debouncedFn();  // Should not call again within 100ms

        expect(mockFn).toHaveBeenCalledTimes(1);  // Still should have only called once

        setTimeout(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);  // Should still have been called only once
            done();
        }, 150);
    });

    test("should preserve the 'this' context", (done) => {
        const obj = {
            value: 42,
            getValue: function () {
                return this.value;
            }
        };

        const spyFn = jest.fn(function () {
            return this.getValue();
        });

        const debouncedFn = debounce(spyFn.bind(obj), 100);

        debouncedFn();

        setTimeout(() => {
            // Check if the spy function was called
            expect(spyFn).toHaveBeenCalledTimes(1);

            // Check if the spy function returned the expected value
            expect(spyFn.mock.results[0].value).toBe(42); // This replaces `toHaveReturnedWith`
            done();
        }, 150);
    });

    test("should handle multiple calls and only call the last one", (done) => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        debouncedFn();
        debouncedFn();

        setTimeout(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);  // Should call only once, the last one
            done();
        }, 150);
    });

});
