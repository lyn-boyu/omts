import { describe, expect, test, jest } from "bun:test";
import { throttle } from './index'; // Adjust the path as needed


describe('Throttle ', () => {

    test("should call the throttled function immediately when leading: true", (done) => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 100, { leading: true });

        throttledFn();  // Call immediately
        expect(mockFn).toHaveBeenCalledTimes(1);  // Should be called immediately

        // Call again after 50ms, should not trigger another call because of throttling
        setTimeout(() => {
            throttledFn();  // Still within the throttle period
            expect(mockFn).toHaveBeenCalledTimes(1);  // Should still only be called once
        }, 50);

        // Call again after 100ms, should trigger the second call
        setTimeout(() => {
            throttledFn();  // Now the throttle period has passed
            expect(mockFn).toHaveBeenCalledTimes(2);  // Should be called again
            done();  // Mark the test as complete
        }, 150);  // 150ms total (first 50 + 100)
    });

    test("should not call the throttled function until after the delay when leading: false", (done) => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 100, { leading: false });

        throttledFn();  // Call, but should not trigger immediately because leading is false
        expect(mockFn).toHaveBeenCalledTimes(0);  // Not called yet

        // Wait 100ms to check if it executes after the delay
        setTimeout(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);  // Should be called after 100ms
            done();
        }, 100);
    });

    test("should handle multiple calls correctly within and after throttle period", (done) => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 100, { leading: true });

        throttledFn();  // Call immediately
        expect(mockFn).toHaveBeenCalledTimes(1);  // Immediate call

        // Call again after 30ms (within throttle period), should be ignored
        setTimeout(() => {
            throttledFn();
            expect(mockFn).toHaveBeenCalledTimes(1);  // Still only called once
        }, 30);

        // Call again after 130ms (beyond throttle period), should trigger
        setTimeout(() => {
            throttledFn();
            expect(mockFn).toHaveBeenCalledTimes(2);  // Called again after throttle delay
            done();
        }, 130);
    });

    test("should pass the correct arguments when throttled", (done) => {
        const mockFn = jest.fn();
        const throttledFn = throttle((x: number, y: number) => mockFn(x, y), 100, { leading: true });

        throttledFn(1, 2);  // Call immediately with arguments
        expect(mockFn).toHaveBeenCalledWith(1, 2);

        // Wait 100ms and call with new arguments
        setTimeout(() => {
            throttledFn(3, 4);
            expect(mockFn).toHaveBeenCalledWith(3, 4);
            done();
        }, 100);
    });


    test("should only call the function at the end of the throttle period with trailing: true and leading: false", (done) => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 100, { leading: false, trailing: true });

        throttledFn();  // Call the throttled function
        expect(mockFn).toHaveBeenCalledTimes(0);  // Function should not be called immediately because leading is false

        // Call again after 50ms, should still not trigger execution
        setTimeout(() => {
            throttledFn();
            expect(mockFn).toHaveBeenCalledTimes(0);  // Still no call after 50ms
        }, 50);

        // After 100ms, the trailing execution should happen
        setTimeout(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);  // The function should be called once after 100ms
            done();
        }, 120);  // Wait slightly longer than the throttle period to ensure trailing execution
    });

    test("should not execute trailing call if no additional calls are made within throttle period", (done) => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 100, { leading: false, trailing: true });

        throttledFn();  // Call the throttled function
        expect(mockFn).toHaveBeenCalledTimes(0);  // Function should not be called immediately because leading is false

        throttledFn();  // Call the throttled function
        expect(mockFn).toHaveBeenCalledTimes(0);  // Function should not be called immediately because leading is false

        // After 100ms, the function should execute because trailing is true
        setTimeout(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);  // Function should have been called once
            done();
        }, 120);  // Slightly longer than 100ms to check trailing execution
    });

    test("should call the function only once within the throttle window with leading: false and trailing: true", (done) => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 100, { leading: false, trailing: true });

        throttledFn();  // Call the throttled function
        throttledFn();  // Call it again before the 100ms window

        expect(mockFn).toHaveBeenCalledTimes(0);  // No call yet because leading is false

        setTimeout(() => {
            throttledFn();  // Call it again after 80ms, still within the throttle window
            expect(mockFn).toHaveBeenCalledTimes(0);  // Should still not be called yet
        }, 80);

        setTimeout(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);  // Now the function should have been called once
            done();
        }, 120);  // Wait slightly longer than the throttle window to ensure trailing execution
    });
});
