
export interface IDeferred<T> {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}

export class Deferred<T> implements IDeferred<T> {
    public promise: Promise<T>;
    private _resolve!: (value: T | PromiseLike<T>) => void;
    private _reject!: (reason?: any) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        })
    }

    reject = (reason?: any) => {
        this._reject(reason);
    }

    resolve = (value: T | PromiseLike<T>) => {
        this._resolve(value);
    }

}