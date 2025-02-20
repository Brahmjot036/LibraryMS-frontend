"use client";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Membership() {
  const [membershipType, setMembershipType] = useState("6 months");
  const [membershipId, setMembershipId] = useState(""); // For updating membership

  const handleAddMembership = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/add_membership', { user_id: 1, duration: membershipType });
      toast.success(`Membership added! Expires on ${res.data.expiry_date}`);
    } catch (error) {
      console.error("Add Membership Error:", error);
      toast.error(error.response?.data.detail || 'Error adding membership');
    }
  };

  const handleUpdateMembership = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/update_membership', { membership_id: membershipId, action: "extend", duration: membershipType });
      toast.success(`Membership extended! New expiry: ${res.data.new_expiry_date}`);
    } catch (error) {
      console.error("Update Membership Error:", error);
      toast.error(error.response?.data.detail || 'Error updating membership');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl shadow-2xl p-10 space-y-8">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center">
        Membership Management
      </h2>
      
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Add Membership
        </h3>
        <form onSubmit={handleAddMembership} className="space-y-6">
          <label className="block text-lg text-gray-700 mb-2">
            Select Membership Duration
          </label>
          <select
            value={membershipType}
            onChange={(e) => setMembershipType(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
          >
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
          </select>
          <button
            type="submit"
            className="w-full py-4 bg-primary text-white text-xl font-semibold rounded-lg hover:bg-blue-800 transition-shadow shadow-lg"
          >
            Add Membership
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Extend Membership
        </h3>
        <form onSubmit={handleUpdateMembership} className="space-y-6">
          <label className="block text-lg text-gray-700 mb-2">
            Membership ID (for update)
          </label>
          <input
            type="text"
            placeholder="Enter Membership ID"
            value={membershipId}
            onChange={(e) => setMembershipId(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
          />
          <button
            type="submit"
            className="w-full py-4 bg-primary text-white text-xl font-semibold rounded-lg hover:bg-blue-800 transition-shadow shadow-lg"
          >
            Extend Membership
          </button>
        </form>
      </div>
      
      <div className="text-center text-gray-600 text-lg">
        <p>
          Manage your membership seamlessly with our premium platform. Whether you're adding a new membership or extending an existing one, our system ensures you stay updated with your membership status in real time.
        </p>
      </div>
    </div>
  );
}
