// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-white font-extrabold text-xl">LibraryMS</div>
        <div className="space-x-6">
          <Link href="/dashboard" className="text-white hover:text-accent">Dashboard</Link>
          <Link href="/books" className="text-white hover:text-accent">Books</Link>
          <Link href="/issue-book" className="text-white hover:text-accent">Issue Book</Link>
          <Link href="/return-book" className="text-white hover:text-accent">Return Book</Link>
          <Link href="/membership" className="text-white hover:text-accent">Membership</Link>
        </div>
      </div>
    </nav>
  );
}
