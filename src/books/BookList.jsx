import { Link } from "react-router";

export default function BookList({ books }) {
  return (
    <ul>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </ul>
  );
}

function BookListItem({ book }) {
  return (
    <li>
      <Link to={"/books/" + book.id}>
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
