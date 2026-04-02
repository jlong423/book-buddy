import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getBook } from "../api/books";

export default function BookDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API;
  useEffect(() => {
    const syncBook = async () => {
      const data = await getBook(id);
      console.log(data);
      setBook(data);
    };
    syncBook();
  }, [id]);

  async function checkOutBook(id) {
    console.log(id);
    try {
      console.log(API);
      const response = await fetch(API + "/reservations", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ bookId: id }),
      });
      const result = await response.json();
      console.log(result);
      if (result.ok) {
        navigate("/books");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <article>
      <img
        src={book?.coverimage}
        onError={(e) => {
          e.currentTarget.src = "/quick-pic-save.jpg";
        }}
        alt={book?.title}
        width={250}
      />
      <h1>{book?.title}</h1>
      <p>{book?.author}</p>
      <p>{book?.description}</p>
      {book?.available ? (
        <button onClick={() => checkOutBook(book?.id)}>
          Check out Book now
        </button>
      ) : (
        <button disabled>Already Checked out</button>
      )}
    </article>
  );
}
