import { Link } from "react-router";

export default function BookList({ books }) {
  return (
    <div className="book-list">
      <ul className="book-list-item">
        {books.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
}

function BookListItem({ book }) {
  return (
    <li className="book-list-item">
      <Link className="book-link" to={"/books/" + book.id}>
        <h2>{book.title}</h2>
        <img
          src={book.coverimage}
          onError={(e) => {
            e.currentTarget.src = "/quick-pic-save.jpg";
          }}
          alt={book.title}
          width={200}
        />
      </Link>
    </li>
  );
}
