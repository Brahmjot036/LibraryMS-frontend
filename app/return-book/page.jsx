"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ReturnBook() {
  const [transactionId, setTransactionId] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const router = useRouter();

  const handleReturn = async (e) => {
    e.preventDefault();
    if (!transactionId) {
      toast.error('Please enter the transaction ID');
      return;
    }
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/return_book',
        { transaction_id: transactionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      router.push('/dashboard');
    } catch (error) {
      console.error("Return Book Error:", error);
      toast.error(error.response?.data.detail || 'Error returning book');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Return Book
      </h2>
      <form onSubmit={handleReturn} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction ID
          </label>
          <input
            type="text"
            placeholder="Enter Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-primary text-white text-xl font-semibold rounded-lg hover:bg-blue-800 transition-shadow shadow-lg"
        >
          Return Book
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Please ensure the Transaction ID is correct before submitting.
      </p>
    </div>
  );
}
