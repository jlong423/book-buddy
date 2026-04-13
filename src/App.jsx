import { Routes, Route } from "react-router";

import Layout from "./layout/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Account from "./auth/Account";
import BooksPage from "./books/BooksPage";
import BookDetails from "./books/BookDetails";
import Error404 from "./Error404";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/me" element={<Account />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
