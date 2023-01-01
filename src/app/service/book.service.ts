import { BookDto, BookResponse } from '../types/book.dto';

export interface BookService {
    retrieveBook: (reference: string) => BookDto;
    getBookSummary: (reference: string) => string;
    getBookCount: () => number;
    getAllBooks: () => BookResponse;
}
