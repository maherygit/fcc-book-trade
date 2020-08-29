import React from 'react';
import './books.css';


const Books = props => {
  const bookList = [{ title: "Book 1", author: "Robert"}, { title: "Book 2", author: "Joe" },  { title: "Book 3", author: undefined },  { title: "Book 4", author: "Jocelyn" },  { title: "Book 5", author: "Sapo" },] 
  return (
    <div className="books_container">
      <ul className="books_list">
      {
       (bookList && bookList.length > 0) && 
         bookList.map((book,i) => <BookItem title={book.title} author={book.author} />)
      }
      </ul>
    </div>
  );
}

const BookItem = props => {
  const { title, author } = props;
  return (
    <li className="books_list_item">
      <span className="books_list_item__title">{ title || "pas de titre" }</span> by <span className="books_list_item__author">{ author || "inconnu" }</span>
    </li>
  );
}

export default Books;