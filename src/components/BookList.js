import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';

const BookList = () => {
    const { books, fetchBooks, deleteBook } = useContext(BookContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            setIsLoading(true);
            await fetchBooks();
            setIsLoading(false);
        };
        loadBooks();
    }, [fetchBooks]);

    if (isLoading) {
        return <div>Loading books...</div>;
    }

    return (
        <div>
            <h1>Book List</h1>
            <Link to="/books/new">Add New Book</Link>
            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <ul className="book-list">
                    {books.map(book => (
                        <li key={book.id} className="book-item">
                            <h3>{book.title}</h3>
                            <p>By {book.author}</p>
                            <p>ISBN: {book.isbn}</p>
                            <p>Published: {book.publicationDate}</p>
                            <Link to={`/books/${book.id}`}>View Details</Link>
                            <Link to={`/books/${book.id}/edit`}>Edit</Link>
                            <button onClick={() => deleteBook(book.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookList;
