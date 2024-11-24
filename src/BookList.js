// BookList.js
import React, { useEffect, useState } from 'react';
import { fetchBooks } from './apiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', isRead: false });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch books on component
    axios.get('http://localhost:8085/api/v1/book')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: name === 'isRead' ? e.target.checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8085/api/v1/book', newBook)
      .then(response => {
        setBooks([...books, newBook]);
        setNewBook({ title: '', author: '', isRead: false });
        setShowForm(false);
      })
      .catch(error => console.error('Error adding new book:', error));
  };

  return (
    <div className="container mt-4">
      <h2>Book List</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add a New Book'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isRead"
              name="isRead"
              checked={newBook.isRead}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="isRead">
              Read
            </label>
          </div>
          <button type="submit" className="btn btn-success mt-2">
            Add Book
          </button>
        </form>
      )}

      <div className="row">
        {books.map((book, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">{book.isRead ? 'Read' : 'Not Read'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
