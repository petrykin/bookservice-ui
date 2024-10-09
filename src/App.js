import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import {AdminBooksView} from "./components/AdminBooksView";
import {UserBooksView} from "./components/UserBooksView";
import {Navbar} from "./components/Navbar";

function App() {
    return (
        <BookProvider>
            <Router>
                <Navbar />
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={UserBooksView} />
                        <Route exact path="/books/manage" component={AdminBooksView} />
                        <Route exact path="/books" component={UserBooksView} />
                    </Switch>
                </div>
            </Router>
        </BookProvider>
    );
}

export default App;
