import { BookRepository } from './book.repository';
import { BookModel } from '../models/book.model';


export class BookRepositoryStub implements BookRepository {
    private readonly BOOK_REFERENCE_PREFIX: string = 'BOOK-';
    private readonly THE_GRUFFALO_REFERENCE: string = `${this.BOOK_REFERENCE_PREFIX}GRUFF472`;
    private readonly WINNIE_THE_POOH_REFERENCE: string = `${this.BOOK_REFERENCE_PREFIX}POOH222`;
    private readonly THE_WIND_IN_THE_WILLOWS_REFERENCE: string = `${this.BOOK_REFERENCE_PREFIX}WILL987`;
    private readonly books: {[key: string]: BookModel} = {};


    constructor() {
        this.books[this.THE_GRUFFALO_REFERENCE] = new BookModel(
            this.THE_GRUFFALO_REFERENCE,
            'The Gruffalo',
            'A mouse taking a walk in the woods'
        );
        this.books[this.WINNIE_THE_POOH_REFERENCE] = new BookModel(
            this.WINNIE_THE_POOH_REFERENCE,
            'Winnie The Pooh',
            'In this first volume we meet all the friends from the Hundred Acre Wood.'
        );
        this.books[this.THE_WIND_IN_THE_WILLOWS_REFERENCE] = new BookModel(
            this.THE_WIND_IN_THE_WILLOWS_REFERENCE,
            'The Wind In The Willows',
            `With the arrival of spring and fine weather outside, the good-natured Mole loses patience with spring
            cleaning. He flees his underground home, emerging to take in the air and ends up at the river, which he has
             never seen before. Here he meets Rat (a water vole), who at this time of year spends all his days in, on 
             and close by the river. Rat takes Mole for a ride in his rowing boat. They get along well and spend many 
             more days boating, with Rat teaching Mole the ways of the river.`
        );
        // this.books['1'] = new BookModel('1', 'test title', 'random Review');
    }

    public hasBookWithReference(reference: string): boolean {
        return this.books.hasOwnProperty(reference);
    }

    public retrieveBook(reference: string): BookModel {
        return this.books[reference];
    }

    public getAllBooks(): BookModel[] {
        return Object.values(this.books);
    }
}
