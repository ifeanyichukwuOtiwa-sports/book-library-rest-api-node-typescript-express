import DIContainer, { object, use } from 'rsdi';
import { BookRepositoryStub } from '../../app/repository/book.repository.stub';
import { BookServiceImpl } from '../../app/service/book.service.impl';
import { BookController } from '../../app/controller/book.controller';
import { WrongBookReferenceFormatError } from '../../app/error/wrong.book.reference.format.error';
import { BookNotFoundError } from '../../app/error/book.not.found.error';

const container: DIContainer = new DIContainer();

container.add({
    [BookRepositoryStub.name]: object(BookRepositoryStub),
    [BookServiceImpl.name]: object(BookServiceImpl).construct(
        use(BookRepositoryStub)
    ),
    [BookController.name]: object(BookController).construct(
        use(BookServiceImpl)
    )
});

let bookService: BookServiceImpl;

beforeAll(() => {
    bookService = container.get(BookServiceImpl);
});


test('get the number of book in store', () => expect(bookService.getBookCount()).toBeGreaterThan(1));
test('get the number of book in store', () => expect(bookService.getAllBooks().books.length).toBeGreaterThan(1));

describe('should return a not null summary for a valid book', () => {
    it.each([
        ['BOOK-GRUFF472'],
        ['BOOK-POOH222'],
        ['BOOK-WILL987']
    ])('', reference => {
        expect(
            bookService.getBookSummary(reference)
        ).not.toBeNull();
    }
    );
});

describe('should throw  wrong book error for undefined reference value', () => {
    it.each( [
        [null],
        [undefined]
    ])('%s should throw  wrong book error', reference => expect(
        () => {
            bookService.retrieveBook(reference as unknown as string);
        }).toThrowError(new WrongBookReferenceFormatError('Please supply a valid book reference'))
    );
});

describe('should return a valid book for a and available valid book reference', () => {
    it.each([
        ['BOOK-GRUFF472', 'The Gruffalo'],
        ['BOOK-POOH222', 'Winnie The Pooh'],
        ['BOOK-WILL987', 'The Wind In The Willows']
    ])('%s should have book title as %s', (reference: string, title: string) => {
        expect(bookService.retrieveBook(reference).title).toEqual(title);
    });
});

describe('should throw  wrong book error for invalid format', () => {
    it.each([
        ['INVALID_TEXT'],
        ['INVALID-BOOK'],
        ['BOO-WINNIE'],
        ['BOOGRUFF472'],
        ['BOOKGRUFF472'],
        ['BOOKPOOH222'],
        ['BOOPOOH222'],
        ['BOOWILL987'],
        ['BOOKWILL987'],
        ['qwertyuuiio:']
    ])('book reference: %s => should throw WrongBookReferenceFormatError', (reference: string) => {
        expect(function() {
            bookService.retrieveBook(reference);
        }).toThrowError(
            new WrongBookReferenceFormatError('Please supply a valid book reference format')
        );
    });
});

describe('should throw  wrong book error for unavailable book', () => {
    it.each([
        ['BOOK-1'],
        ['BOOK-T90'],
        ['BOOK-G40'],
        ['BOOK-888'],
        ['BOOK-999']
    ])('book reference: %s => should throw BookNotFoundError', (reference: string) => {
        expect(function() {
            bookService.retrieveBook(reference);
        }).toThrowError(
            new BookNotFoundError(`Book with reference: ${reference} does not exist`)
        );
    });
});


