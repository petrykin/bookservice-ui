import React, { createContext, useState, useCallback } from 'react';
import { fetchBooks, fetchBookById, addBook, updateBook, deleteBook } from '../api/api';
import { API_URL } from '../api/api';
import axios from 'axios';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

    const fetchBooksData = useCallback(async () => {
        try {
            const data = await fetchBooks();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }, []);

    const getBook = useCallback((id) => {
        return books.find(book => book.id === id);
    }, [books]);

    const fetchBookByIdData = useCallback(async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            const bookData = response.data;
            // Extract the id from the self link
            const bookId = bookData._links.self.href.split('/').pop();
            return {
                id: bookId,
                ...bookData
            };
        } catch (error) {
            console.error("Error fetching book:", error);
            throw error;
        }
    }, []);


    const addBookData = async (book) => {
        try {
            const newBook = await addBook(book);
            setBooks(prevBooks => [...prevBooks, newBook]);
            return newBook;
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    const updateBookData = async (id, book) => {
        try {
            const updatedBook = await updateBook(id, book);
            setBooks(prevBooks => prevBooks.map(b => b.id === id ? updatedBook : b));
            return updatedBook;
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    const deleteBookData = async (id) => {
        try {
            await deleteBook(id);
            setBooks(prevBooks => prevBooks.filter(b => b.id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <BookContext.Provider value={{
            books,
            fetchBooks: fetchBooksData,
            fetchBookById: fetchBookByIdData,
            addBook: addBookData,
            updateBook: updateBookData,
            deleteBook: deleteBookData
        }}>
            {children}
        </BookContext.Provider>
    );
};
