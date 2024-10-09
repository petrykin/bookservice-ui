import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export const Navbar = () => {

  return (
    <nav>
      <section>
        <div className='navbar-item'>
          <Link to='/'>Book Store</Link>
        </div>
        <div style={{display: 'flex'}}>
          <Link to='/books/manage'>
            <Icon name='edit outline' /> Manage Books
          </Link>
          <Link to='/books'>
            <Icon name='book' /> Books
          </Link>
        </div>
      </section>
    </nav>
  );
};
