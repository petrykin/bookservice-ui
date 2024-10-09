import React from 'react';

import '../styles/BookCard.css';

export const BookCard = ({ book }) => {
  return (
    <div className='card'>
      <div className='card-content'>
        <h3>{ book.title }</h3>
        <div className='subtitle'>
          { book.author }
        </div>
        <h4>
          ISBN: { book.isbn }
        </h4>
        <div className='display-flex'>
          <div className='content-img-desc'>
            <img src={ book.coverUrl } alt=''/>
          </div>
          <div className='content-img-desc'>
            <h2>${ book.price }</h2>
            <p>
              { book.description }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};