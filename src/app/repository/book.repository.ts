import { BookModel } from '../models/book.model';


export interface BookRepository {
    retrieveBook: (reference: string) => BookModel;
    hasBookWithReference: (reference: string) => boolean;
    getAllBooks: () => BookModel[];
}
