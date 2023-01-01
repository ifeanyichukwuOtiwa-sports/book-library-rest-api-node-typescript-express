import { BookServiceImpl } from '../service/book.service.impl';
import { BookDto, RetrieveRequest } from '../types/book.dto';
import { Request, Response } from 'express';


export class BookController {
    constructor(private bookService: BookServiceImpl) {
    }

    public retrieveBook(req: Request, resp: Response): BookDto {
        const body: RetrieveRequest = req.body;
        const response = this.bookService.retrieveBook(body.bookReference);
        resp.json(response);
        return response;
    }


    public getAllBooks(req: Request, resp: Response): { books: BookDto[] } {
        const allBooks = this.bookService.getAllBooks();
        resp.json(allBooks);
        return allBooks;
    }

    public getSummary(req: Request, resp: Response): { summary: string } {
        const body: RetrieveRequest = req.body;
        const bookSummary = this.bookService.getBookSummary(body.bookReference);
        const response = { summary: bookSummary };
        resp.json(response);
        return response;
    }
}
