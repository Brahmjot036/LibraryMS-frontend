// app/layout.js
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
export const metadata = {
  title: 'LibraryMS',
  description: 'Library Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        <main className="container mx-auto px-6 py-8">{children}</main>
        <ToastContainer position="top-center" />
      </body>
    </html>
  );
}
