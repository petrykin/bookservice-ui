import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';

const BookDetails = () => {
    const { id } = useParams();
    const { fetchBookById } = useContext(BookContext);
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBook = async () => {
            setLoading(true);
            try {
                const fetchedBook = await fetchBookById(id);
                setBook(fetchedBook);
                setError(null);
            } catch (err) {
                console.error("Error fetching book:", err);
                setError("Failed to load book details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadBook();
    }, [id, fetchBookById]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div className="book-details">
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Publication Date:</strong> {new Date(book.publicationDate).toLocaleDateString()}</p>
            <div className="book-links">
                <Link to={`/books/${id}/edit`}>Edit</Link>
                <Link to="/books">Back to List</Link>
            </div>
        </div>
    );
};

export default BookDetails;
