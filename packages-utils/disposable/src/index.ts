export interface IDisposable {
    dispose(): void | Promise<void>;
}


export interface IDisposableSet extends IDisposable {
    add(...disposables: IDisposable[]): IDisposable;
    dispose(): void;
    disposeAsync(): Promise<void>;
    onError(handler: (error: Error, disposable: IDisposable) => void): IDisposable;
}

export class DisposableSet implements IDisposableSet {
    private errorHandlers: Set<(error: Error, disposable: IDisposable) => void> = new Set();
    private disposables: Set<IDisposable> = new Set();

    /**
     * Adds one or more disposables to the collection.
     * Returns a disposable that removes the added disposables from the collection.
     */
    add(...disposables: IDisposable[]): IDisposable {
        disposables.forEach(disposable => this.disposables.add(disposable));

        // Return a disposable to remove the added disposables
        return DisposableSet.create(() => {
            disposables.forEach(disposable => this.disposables.delete(disposable));
        });
    }

    /**
    * Synchronously disposes all the disposables in the collection.
    * Supports both synchronous and asynchronous disposables.
    */
    dispose(): void {
        for (const disposable of this.disposables) {
            try {
                const result = disposable.dispose();
                if (result instanceof Promise) {
                    console.warn("Synchronous dispose called but async disposal was detected.");
                }
                this.disposables.delete(disposable);
            } catch (error) {
                this.handleError(error as Error, disposable);
            }
        }
    }

    /**
     * Asynchronously disposes all the disposables in the collection.
     * It waits for any async dispose logic to complete.
     */
    async disposeAsync(): Promise<void> {
        const promises: Promise<void>[] = [];
        for (const disposable of this.disposables) {
            try {
                const result = disposable.dispose();
                if (result instanceof Promise) {
                    // Catch the error for each async operation
                    promises.push(
                        result
                            .then(() => { this.disposables.delete(disposable); })
                            .catch(error => {
                                this.handleError(error as Error, disposable);
                            })
                    );
                }
            } catch (error) {
                this.handleError(error as Error, disposable);
            }
        }

        // Wait for all async disposals to complete if any are asynchronous
        if (promises.length > 0) {
            await Promise.all(promises);
        }
    }


    /** Registers a custom error handler to handle errors during disposal. */
    onError(handler: (error: Error, disposable: IDisposable) => void): IDisposable {
        this.errorHandlers.add(handler);
        // Return a disposable to remove the error handler
        return DisposableSet.create(() => {
            this.errorHandlers.delete(handler);
        });
    }

    /** Internal method to handle errors during disposal by calling registered error handlers. */
    private handleError(error: Error, disposable: IDisposable): void {
        for (const handler of this.errorHandlers) {
            try {
                handler(error, disposable);
            } catch (handlerError) {
                console.error("Error in error handler:", handlerError);
            }
        }
    }

    /** Static method to check if an object implements IDisposable. */
    static is(arg: unknown): arg is IDisposable {
        return typeof arg === 'object' && arg !== null && 'dispose' in arg && typeof (arg as IDisposable).dispose === 'function';
    }

    /** Static method to create a Disposable object with a custom dispose function. */
    static create(func: () => void): IDisposable {
        return { dispose: func };
    }
}

