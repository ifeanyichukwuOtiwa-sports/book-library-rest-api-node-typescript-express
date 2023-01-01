export class WrongBookReferenceFormatError implements Error {
    public readonly message: string;
    public readonly name: string = 'Wrong Book Format';
    public static readonly statusCode: number = 400;
    constructor(message: string) {
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message;
        Error.captureStackTrace(this);
    }
}
