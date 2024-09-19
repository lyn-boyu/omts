import { describe, expect, test, jest } from "bun:test";
import { DisposableSet, IDisposable } from './index';

describe('DisposableSet', () => {

    test('should dispose synchronously added disposables', () => {
        const disposable1: IDisposable = { dispose: jest.fn() };
        const disposable2: IDisposable = { dispose: jest.fn() };

        const collection = new DisposableSet();
        collection.add(disposable1, disposable2);

        collection.dispose();

        expect(disposable1.dispose).toHaveBeenCalledTimes(1);
        expect(disposable2.dispose).toHaveBeenCalledTimes(1);
    });

    test('should dispose asynchronously added disposables', async () => {
        const disposable1: IDisposable = { dispose: jest.fn().mockResolvedValue(undefined) };
        const disposable2: IDisposable = { dispose: jest.fn().mockResolvedValue(undefined) };

        const collection = new DisposableSet();
        collection.add(disposable1, disposable2);

        await collection.disposeAsync();

        expect(disposable1.dispose).toHaveBeenCalledTimes(1);
        expect(disposable2.dispose).toHaveBeenCalledTimes(1);
    });

    test('should handle both sync and async disposables', async () => {
        const syncDisposable: IDisposable = { dispose: jest.fn() };
        const asyncDisposable: IDisposable = { dispose: jest.fn().mockResolvedValue(undefined) };

        const collection = new DisposableSet();
        collection.add(syncDisposable, asyncDisposable);

        await collection.disposeAsync();

        expect(syncDisposable.dispose).toHaveBeenCalledTimes(1);
        expect(asyncDisposable.dispose).toHaveBeenCalledTimes(1);
    });

    test('should handle errors in synchronous dispose', () => {
        const disposableWithError: IDisposable = {
            dispose: jest.fn(() => { throw new Error('Sync dispose error'); })
        };
        const errorHandler = jest.fn();

        const collection = new DisposableSet();
        collection.onError(errorHandler);
        collection.add(disposableWithError);

        collection.dispose();

        expect(errorHandler).toHaveBeenCalledWith(expect.any(Error), disposableWithError);
    });

    test('should handle errors in asynchronous dispose', async () => {
        const disposableWithError: IDisposable = {
            dispose: jest.fn(() => Promise.reject(new Error('Async dispose error')))
        };
        const errorHandler = jest.fn();

        const collection = new DisposableSet();
        collection.onError(errorHandler);
        collection.add(disposableWithError);

        await collection.disposeAsync();

        expect(errorHandler).toHaveBeenCalledWith(expect.any(Error), disposableWithError);
    });

    test('should allow adding disposables after some are disposed', () => {
        const disposable1: IDisposable = { dispose: jest.fn() };
        const disposable2: IDisposable = { dispose: jest.fn() };

        const collection = new DisposableSet();
        const removeDisposable1 = collection.add(disposable1);
        removeDisposable1.dispose(); // Manually remove disposable1

        collection.add(disposable2);
        collection.dispose();

        expect(disposable1.dispose).not.toHaveBeenCalled();
        expect(disposable2.dispose).toHaveBeenCalledTimes(1);
    });

    test('should dispose added disposables even after previous dispose call', () => {
        const disposable1: IDisposable = { dispose: jest.fn() };
        const disposable2: IDisposable = { dispose: jest.fn() };

        const collection = new DisposableSet();
        collection.add(disposable1);
        collection.dispose();

        // Adding another disposable after calling dispose
        collection.add(disposable2);
        collection.dispose();

        expect(disposable1.dispose).toHaveBeenCalledTimes(1);
        expect(disposable2.dispose).toHaveBeenCalledTimes(1);
    });

    test('should not throw if dispose is called multiple times', () => {
        const disposable: IDisposable = { dispose: jest.fn() };

        const collection = new DisposableSet();
        collection.add(disposable);

        collection.dispose();
        expect(() => collection.dispose()).not.toThrow(); // Should be idempotent
    });

    test('should remove disposable from collection after manual dispose', () => {
        const disposable1: IDisposable = { dispose: jest.fn() };
        const disposable2: IDisposable = { dispose: jest.fn() };

        const collection = new DisposableSet();
        const removeDisposable1 = collection.add(disposable1);
        collection.add(disposable2);

        removeDisposable1.dispose(); // Manually remove disposable1

        collection.dispose();

        expect(disposable1.dispose).not.toHaveBeenCalled(); // Should be removed before dispose
        expect(disposable2.dispose).toHaveBeenCalledTimes(1);
    });
});
