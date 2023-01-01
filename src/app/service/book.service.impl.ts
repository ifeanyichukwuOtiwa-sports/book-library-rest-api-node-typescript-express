import { BookService } from './book.service';
import { BookRepositoryStub } from '../repository/book.repository.stub';
import { BookDto, BookResponse } from '../types/book.dto';
import { WrongBookReferenceFormatError } from '../error/wrong.book.reference.format.error';
import { BookNotFoundError } from '../error/book.not.found.error';
import { BookModel } from '../models/book.model';


export class BookServiceImpl implements BookService {
    constructor(private readonly bookRepository: BookRepositoryStub) {
    }
    public getBookCount(): number {
        return this.bookRepository.getAllBooks().length;
    }

    public getBookSummary(reference: string): string {
        this.verifyBookReference(reference);
        const book = this.bookRepository.retrieveBook(reference);
        return `[${reference}] - ${book.title}: ${this.getFormattedBookSummary(book)}`;
    }

    public retrieveBook(reference: string): BookDto {
        this.verifyBookReference(reference);
        return this.mapToDto(this.bookRepository.retrieveBook(reference));
    }

    private verifyBookReference(reference: string | null | undefined): void {
        if (!reference) {
            throw new WrongBookReferenceFormatError('Please supply a valid book reference');
        }
        if (!reference.startsWith('BOOK-')) {
            throw new WrongBookReferenceFormatError('Please supply a valid book reference format');
        }

        if (!this.bookRepository.hasBookWithReference(reference)) {
            throw new BookNotFoundError(`Book with reference: ${reference} does not exist`);
        }
    }

    private getFormattedBookSummary(book: BookModel): string {
        const randomReview: string = book.randomReview;
        const wordsFromRandomReview = randomReview.split(' ');
        return wordsFromRandomReview.length < 9
            ? randomReview
            : wordsFromRandomReview.slice(0, 10).join(' ').concat('...');
    }

    getAllBooks(): BookResponse {
        const allBooks: BookModel[] = this.bookRepository.getAllBooks();
        return { books: allBooks.map((book: BookModel) => this.mapToDto(book)) };
    }

    private mapToDto(book: BookModel): BookDto {
        return {
            title: book.title,
            reference: book.reference,
            summary: this.getBookSummary(book.reference)
        };
    }
}
