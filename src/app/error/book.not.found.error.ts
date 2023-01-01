export class BookNotFoundError implements Error {
    public readonly message: string;
    public readonly name: string = 'Book Not Found';
    public static readonly statusCode: number = 404;
    constructor(message: string) {
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message;
        Error.captureStackTrace(this);
    }
}
