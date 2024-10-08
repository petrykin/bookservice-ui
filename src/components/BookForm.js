import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BookContext } from '../context/BookContext';

const BookForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const { addBook, updateBook, fetchBookById } = useContext(BookContext);

    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationDate: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadBook = async () => {
            if (id) {
                setIsLoading(true);
                try {
                    const fetchedBook = await fetchBookById(id);
                    if (fetchedBook) {
                        setBook(fetchedBook);
                    } else {
                        console.error(`Book with id ${id} not found`);
                        history.push('/books');
                    }
                } catch (error) {
                    console.error("Error fetching book:", error);
                }
                setIsLoading(false);
            }
        };

        loadBook();
    }, [id, fetchBookById, history]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevBook => ({
            ...prevBook,
            [name]: value
        }));
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.title = book.title ? "" : "Title is required";
        tempErrors.author = book.author ? "" : "Author is required";
        tempErrors.isbn = book.isbn ? "" : "ISBN is required";
        tempErrors.publicationDate = book.publicationDate ? "" : "Publication date is required";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                if (id) {
                    await updateBook(id, book);
                } else {
                    await addBook(book);
                }
                history.push('/books');
            } catch (error) {
                console.error("Error saving book:", error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                />
                {errors.title && <span className="error">{errors.title}</span>}
            </div>

            <div>
                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                />
                {errors.author && <span className="error">{errors.author}</span>}
            </div>

            <div>
                <label htmlFor="isbn">ISBN</label>
                <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={book.isbn}
                    onChange={handleChange}
                />
                {errors.isbn && <span className="error">{errors.isbn}</span>}
            </div>

            <div>
                <label htmlFor="publicationDate">Publication Date</label>
                <input
                    type="date"
                    id="publicationDate"
                    name="publicationDate"
                    value={book.publicationDate}
                    onChange={handleChange}
                />
                {errors.publicationDate && <span className="error">{errors.publicationDate}</span>}
            </div>

            <button type="submit">{id ? 'Update' : 'Add'} Book</button>
        </form>
    );
};

export default BookForm;
