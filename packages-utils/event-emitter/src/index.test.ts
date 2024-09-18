import { EventEmitter } from './index';
import { expect, test, describe, jest, beforeEach } from 'bun:test';



// Test Suite
describe('EventEmitter Tests with Disposable Support', () => {
    type Events = {
        data: number;
        error: Error;
        message: string;
    };

    let emitter: EventEmitter<Events>;

    beforeEach(() => {
        emitter = new EventEmitter<Events>();
    });

    test('should add and emit an event with a disposable', () => {
        const listener = jest.fn();
        const disposable = emitter.on('data', listener);

        emitter.emit('data', 42);
        expect(listener).toHaveBeenCalledWith(42);
        expect(listener).toHaveBeenCalledTimes(1);

        disposable.dispose(); // Remove the listener

        emitter.emit('data', 100); // No output after disposal
        expect(listener).toHaveBeenCalledTimes(1); // Ensure listener is not called again
    });

    test('should handle multiple listeners for the same event and dispose one', () => {
        const listener1 = jest.fn();
        const listener2 = jest.fn();

        const disposable1 = emitter.on('data', listener1);
        emitter.on('data', listener2);

        emitter.emit('data', 100);
        expect(listener1).toHaveBeenCalledWith(100);
        expect(listener2).toHaveBeenCalledWith(100);

        disposable1.dispose(); // Remove the first listener

        emitter.emit('data', 200); // Only the second listener should be called
        expect(listener1).toHaveBeenCalledTimes(1); // Ensure first listener is not called again
        expect(listener2).toHaveBeenCalledTimes(2); // Second listener is called twice
    });

    test('should handle once listeners correctly with disposable', () => {
        const listener = jest.fn();
        const disposable = emitter.once('data', listener);

        emitter.emit('data', 77);
        emitter.emit('data', 88); // Should not trigger the listener again

        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith(77);

        // Dispose should have no effect as listener is already removed
        disposable.dispose();
        emitter.emit('data', 99);
        expect(listener).toHaveBeenCalledTimes(1); // Still should be called only once
    });

    test('should remove all listeners for an event', () => {
        const listener1 = jest.fn();
        const listener2 = jest.fn();
        emitter.on('data', listener1);
        emitter.on('data', listener2);

        emitter.removeAllListeners('data'); // Remove all listeners for 'data'
        emitter.emit('data', 123);

        expect(listener1).not.toHaveBeenCalled();
        expect(listener2).not.toHaveBeenCalled();
    });

    test('should return false when emitting an event with no listeners', () => {
        const result = emitter.emit('data', 10);
        expect(result).toBe(false);
    });

    test('should handle errors in listeners gracefully', () => {
        const errorListener = jest.fn().mockImplementation(() => {
            throw new Error('Listener error');
        });
        emitter.on('data', errorListener);
        emitter.emit('data', 1);  // This should not crash the program

        expect(errorListener).toHaveBeenCalledTimes(1);
    });

    test('should add and emit error event correctly', () => {
        const listener = jest.fn();
        const error = new Error('Test Error');
        emitter.on('error', listener);
        emitter.emit('error', error);

        expect(listener).toHaveBeenCalledWith(error);
    });

    test('should call the error handler when a listener throws an error', () => {
        const errorHandler = jest.fn();
        const disposable = emitter.onError((event, error, listener) => {
            errorHandler(event, error, listener);
        });

        const faultyListener = jest.fn(() => {
            throw new Error('Test Error');
        });

        emitter.on('data', faultyListener);

        emitter.emit('data', 42);  // This should trigger the error handler

        // Check that error handler was called once
        expect(errorHandler).toHaveBeenCalledTimes(1);

        // Check that error handler received correct arguments
        const [event, error, listener] = errorHandler.mock.calls[0];
        expect(event).toBe('data');
        expect(error.message).toBe('Test Error');
        expect(listener).toBe(faultyListener);

        // Cleanup
        disposable.dispose();
    });

    test('should handle multiple error handlers', () => {
        const errorHandler1 = jest.fn();
        const errorHandler2 = jest.fn();

        const disposable1 = emitter.onError((event, error, listener) => {
            errorHandler1(event, error, listener);
        });

        const disposable2 = emitter.onError((event, error, listener) => {
            errorHandler2(event, error, listener);
        });

        const faultyListener = jest.fn(() => {
            throw new Error('Another Test Error');
        });

        emitter.on('data', faultyListener);

        emitter.emit('data', 100);  // This should trigger both error handlers

        // Both error handlers should be called
        expect(errorHandler1).toHaveBeenCalledTimes(1);
        expect(errorHandler2).toHaveBeenCalledTimes(1);

        // Check arguments for both handlers
        expect(errorHandler1.mock.calls[0][0]).toBe('data');
        expect(errorHandler1.mock.calls[0][1].message).toBe('Another Test Error');
        expect(errorHandler1.mock.calls[0][2]).toBe(faultyListener);

        expect(errorHandler2.mock.calls[0][0]).toBe('data');
        expect(errorHandler2.mock.calls[0][1].message).toBe('Another Test Error');
        expect(errorHandler2.mock.calls[0][2]).toBe(faultyListener);

        // Cleanup
        disposable1.dispose();
        disposable2.dispose();
    });

    test('should remove the error handler when disposed', () => {
        const errorHandler = jest.fn();
        const disposable = emitter.onError((event, error, listener) => {
            errorHandler(event, error, listener);
        });

        const faultyListener = jest.fn(() => {
            throw new Error('Yet Another Test Error');
        });

        emitter.on('data', faultyListener);

        // Emit event to trigger error handler
        emitter.emit('data', 200);
        expect(errorHandler).toHaveBeenCalledTimes(1);

        // Dispose the error handler
        disposable.dispose();

        // Emit event again; error handler should not be called
        emitter.emit('data', 300);
        expect(errorHandler).toHaveBeenCalledTimes(1);  // Still called only once
    });
});
