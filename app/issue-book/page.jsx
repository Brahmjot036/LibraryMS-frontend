"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function IssueBook() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userId = 1; // For demonstration, static user id

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/books');
        // Filter available books only
        const availableBooks = res.data.filter(book => book.available);
        setBooks(availableBooks);
        setLoading(false);
      } catch (err) {
        console.error("Issue Book Fetch Error:", err);
        toast.error('Error fetching books');
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const handleIssue = async (e) => {
    e.preventDefault();
    if (!selectedBook) {
      toast.error('Please select a book to issue');
      return;
    }
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/issue_book',
        { user_id: userId, book_id: selectedBook },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      router.push('/dashboard');
    } catch (error) {
      console.error("Issue Book Error:", error);
      toast.error(error.response?.data.detail || 'Error issuing book');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Issue a Book
      </h2>
      {loading ? (
        <div className="text-center py-10">
          <p className="text-xl font-medium text-gray-700">Loading available books...</p>
        </div>
      ) : (
        <form onSubmit={handleIssue} className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Select a Book to Issue
            </h3>
            {books.length === 0 && (
              <p className="text-center text-gray-500">No available books at the moment.</p>
            )}
            <div className="space-y-4">
              {books.map((book) => (
                <div key={book.id} className="flex items-center p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <input
                    type="radio"
                    name="book"
                    value={book.id}
                    onChange={() => setSelectedBook(book.id)}
                    className="h-5 w-5 text-primary mr-4"
                  />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{book.title}</p>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-primary text-white text-xl font-semibold rounded-lg hover:bg-blue-800 transition-shadow shadow-lg"
          >
            Issue Book
          </button>
        </form>
      )}
    </div>
  );
}
