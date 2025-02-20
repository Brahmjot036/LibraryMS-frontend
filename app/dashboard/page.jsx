"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DashboardChart from "../components/DashboardChart";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();
  const [membershipExpiry, setMembershipExpiry] = useState(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      toast.error("Please login first");
      router.push("/");
    } else {
      async function fetchMembership() {
        try {
          const res = await axios.get("http://127.0.0.1:8000/memberships", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const memberships = res.data;
          // For demo, assuming user_id = 1
          const userMembership = memberships.find((m) => m.user_id === 1);
          if (userMembership) {
            setMembershipExpiry(userMembership.expiry_date);
          }
        } catch (error) {
          console.error("Error fetching membership info:", error);
        }
      }
      fetchMembership();
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to LibraryMS
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          This dashboard provides a comprehensive overview of your Library Management System. Here you can track your issued books, manage your membership, and view detailed analytics of the library's performance.
        </p>
        {membershipExpiry && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xl text-blue-800">
              Your membership expires on: <span className="font-bold">{membershipExpiry}</span>
            </p>
          </div>
        )}
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Key Performance Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-3xl font-bold text-gray-900">120</p>
              <p className="text-gray-600">Total Books</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-3xl font-bold text-gray-900">35</p>
              <p className="text-gray-600">Issued Books</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-3xl font-bold text-gray-900">5</p>
              <p className="text-gray-600">Active Memberships</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DashboardChart />
      </div>
      <div className="bg-white rounded-2xl shadow-2xl p-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Recent Activity</h3>
        <p className="text-gray-700">
          Here you can view the latest transactions, including recently issued and returned books, along with other library activities. Stay updated with real-time data and insightful analytics.
        </p>
      </div>
    </div>
  );
}
