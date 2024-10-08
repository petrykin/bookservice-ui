import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import './styles/App.css';

function App() {
    return (
        <BookProvider>
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={BookList} />
                        <Route exact path="/books" component={BookList} />
                        <Route path="/books/new" component={() => <BookForm />} />
                        <Route exact path="/books/:id" component={BookDetails} />
                        <Route path="/books/:id/edit" component={({ match }) => <BookForm bookId={match.params.id} />} />
                    </Switch>
                </div>
            </Router>
        </BookProvider>
    );
}

export default App;
