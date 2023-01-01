export interface BookDto {
    reference: string;
    title: string;
    summary: string;
}

export interface RetrieveRequest {
    bookReference: string;
}

export interface BookResponse {
    books: BookDto[];
}


