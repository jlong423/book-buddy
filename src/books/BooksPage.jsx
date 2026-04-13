import { useEffect, useState } from "react";
import { getBooks } from "../api/books";
import { useAuth } from "../auth/AuthContext";

import BookList from "./BookList";

export default function BooksPage() {
  const { token } = useAuth();

  const [books, setBooks] = useState([]);

  const syncBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    syncBooks();
  }, []);

  return (
    <div className="book-list">
      <>
        <BookList books={books} />
      </>
    </div>
  );
}
