

export class BookModel {
    private readonly _reference: string;
    private readonly _title!: string;
    private readonly _randomReview: string;

    constructor(reference: string, title: string, randomReview: string) {
        this._reference = reference;
        this._title = title;
        this._randomReview = randomReview;
    }


    get reference(): string {
        return this._reference;
    }

    get title(): string {
        return this._title;
    }

    get randomReview(): string {
        return this._randomReview;
    }
}
