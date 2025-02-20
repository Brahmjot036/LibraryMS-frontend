"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/books');
      setBooks(res.data);
    } catch (error) {
      console.error("Fetch Books Error:", error);
      toast.error('Error fetching books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://127.0.0.1:8000/books', 
        { title: newTitle, author: newAuthor },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Book added');
      setNewTitle('');
      setNewAuthor('');
      fetchBooks();
    } catch (error) {
      console.error("Add Book Error:", error);
      toast.error(error.response?.data.detail || 'Error adding book');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/books/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Book deleted');
      fetchBooks();
    } catch (error) {
      console.error("Delete Book Error:", error);
      toast.error(error.response?.data.detail || 'Error deleting book');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10 space-y-8">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center">
        Books Management
      </h2>
      <div className="border-t border-gray-200 pt-8">
        <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Title
            </label>
            <input 
              type="text"
              placeholder="Enter book title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input 
              type="text"
              placeholder="Enter author name"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <button 
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-md hover:bg-blue-800 transition duration-150 ease-in-out shadow-lg"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Book List
        </h3>
        <div className="space-y-4">
          {books.length === 0 ? (
            <p className="text-center text-gray-500">No books available.</p>
          ) : (
            books.map((book) => (
              <div key={book.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <p className="text-xl font-semibold text-gray-900">{book.title}</p>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <p className="mt-1 text-sm font-medium text-green-600">
                    {book.available ? "Available" : "Issued"}
                  </p>
                </div>
                <button 
                  onClick={() => handleDelete(book.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
