import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BookProvider } from '../src/context/BookContext';
import BookList from '../src/components/BookList';

const mockBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
];

jest.mock('../src/context/BookContext', () => ({
    useBooks: () => ({ books: mockBooks }),
}));

test('renders book list', () => {
    render(
        <Router>
            <BookProvider>
                <BookList />
            </BookProvider>
        </Router>
    );

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Author: Author 1')).toBeInTheDocument();
    expect(screen.getByText('Author: Author 2')).toBeInTheDocument();
});
