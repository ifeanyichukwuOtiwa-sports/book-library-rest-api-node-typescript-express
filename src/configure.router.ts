import * as core from 'express-serve-static-core';
import { IDIContainer } from 'rsdi';
import { BookController } from './app/controller/book.controller';


export default function configureRouter(app: core.Express, diContainer: IDIContainer) {
    const bookController: BookController = diContainer.get(BookController);
    app.route('/api/v1/books/retrieve')
        .post(bookController.retrieveBook.bind(bookController));
    app.route('/api/v1/books/summary')
        .post(bookController.getSummary.bind(bookController));
    app.route('/api/v1/books')
        .get(bookController.getAllBooks.bind(bookController));
}
