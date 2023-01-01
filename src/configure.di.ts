import DIContainer, { IDIContainer, object, use } from 'rsdi';
import { BookRepositoryStub } from './app/repository/book.repository.stub';
import { BookServiceImpl } from './app/service/book.service.impl';
import { BookController } from './app/controller/book.controller';

export default function configureDI(): IDIContainer {
    const diContainer: DIContainer = new DIContainer();
    diContainer.add({
        [BookRepositoryStub.name]: object(BookRepositoryStub),
        [BookServiceImpl.name]: object(BookServiceImpl).construct(
            use(BookRepositoryStub)
        ),
        [BookController.name]: object(BookController).construct(
            use(BookServiceImpl)
        )
    });
    return diContainer;
}
