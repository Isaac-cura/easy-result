export class Success<T = undefined> {
    constructor(public value?: T) { }

    static create<T = undefined>(value?: T) {
        return new Success(value)
    }

    static check<U, T>(either: Failure<U> | Success<T>): either is Success {
        return either instanceof Success;
    }
}


export class Failure<T = undefined> {
    constructor(public error?: T) { }

    static create<T = undefined>(error?: T) {
        return new Failure(error)
    }

    static check<U, T>(either: Failure<U> | Success<T>): either is Failure<U> {
        return either instanceof Failure;
    }
}

export type Result<U, T> = Failure<U> | Success<T>

export type AsyncResult<U, T> = Promise<Failure<U>> | Promise<Success<T>>