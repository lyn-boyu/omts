export type Listener<T> = (eventData: T) => void;
export interface Disposable {
    dispose(): void
}

export class EventEmitter<E extends Record<string, any>> {
    private eventsMap: Map<keyof E, Set<Listener<any>>>
    private errorHandlers: Set<(event: keyof E, error: Error, listener: Listener<any>) => void>;

    constructor() {
        this.eventsMap = new Map();
        this.errorHandlers = new Set();
    }

    on<K extends keyof E>(event: K, listener: Listener<E[K]>): Disposable {
        if (!this.eventsMap.has(event)) {
            this.eventsMap.set(event, new Set());
        }
        this.eventsMap.get(event)!.add(listener);
        // Return a disposable object
        return {
            dispose: () => this.off(event, listener),
        };
    }

    // Method to register a custom error handler
    onError<K extends keyof E>(handler: (event: keyof E, error: Error, listener: Listener<E[K]>) => void): Disposable {
        this.errorHandlers.add(handler);

        // Return a disposable object to remove the error handler
        return {
            dispose: () => {
                this.errorHandlers.delete(handler);
            }
        };
    }


    once<K extends keyof E>(event: K, listener: Listener<E[K]>): Disposable {
        const onceListener = (eventData: E[K]) => {
            listener(eventData)
            this.off(event, onceListener)
        }
        this.on(event, onceListener)
        return {
            dispose: () => this.off(event, listener),
        };
    }

    off<K extends keyof E>(event: K, listener: Listener<E[K]>): this {
        if (!this.eventsMap.has(event)) {
            return this
        }
        this.eventsMap.get(event)!.delete(listener)
        return this
    }

    emit<K extends keyof E>(event: K, eventData: E[K]): boolean {
        if (!this.eventsMap.has(event)) {
            return false
        }
        const listeners = this.eventsMap.get(event)!

        listeners.forEach(listener => {
            try {
                listener(eventData)
            } catch (error) {
                // Invoke all registered error handlers
                this.errorHandlers.forEach(handler => {
                    handler(event, error as Error, listener);
                });
            }
        })

        return true
    }

    removeAllListeners<K extends keyof E>(event: K): this {
        if (this.eventsMap.has(event)) {
            this.eventsMap.delete(event)
        }
        return this
    }

}