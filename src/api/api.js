import axios from 'axios';

export const API_URL = 'http://localhost:8080/api/books';

export const fetchBooks = async () => {
    const response = await axios.get(API_URL);
    return response.data._embedded.books.map(book => ({
        ...book,
        id: book._links.self.href.split('/').pop()
    }));
};

export const fetchBookById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return {
        ...response.data,
        id: response.data._links.self.href.split('/').pop()
    };
};

export const addBook = async (book) => {
    const response = await axios.post(API_URL, book);
    return {
        ...response.data,
        id: response.data._links.self.href.split('/').pop()
    };
};

export const updateBook = async (id, book) => {
    const response = await axios.put(`${API_URL}/${id}`, book);
    return {
        ...response.data,
        id: response.data._links.self.href.split('/').pop()
    };
};

export const deleteBook = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
