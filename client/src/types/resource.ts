export interface Author {
    _id: string;
    userDetails: {
        name: string;
        _id: string;
    };
}

export interface Resource {
    _id: string;
    title: string;
    description: string;
    author: Author;
    coverImage: File | undefined;
    file: File | undefined;
    tags: string[];
    createdAt: string;
}
