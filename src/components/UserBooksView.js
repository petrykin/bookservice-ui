import React, {useContext, useEffect, useState} from 'react';

import { BookContext } from '../context/BookContext';

import { BookCard } from './BookCard';

export const UserBooksView = () => {
    const { books, fetchBooks } = useContext(BookContext);

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

  const renderBooks = () => {
    return books && books.filter(book => book.visible).map(book => <BookCard key={ book.isbn } book={ book } />);
  };

  return (
    <section className='page'>
      <h1>User Books</h1>
      <div className='wrapper display-flex'>
        { renderBooks() }
      </div>
    </section>
  );
};
