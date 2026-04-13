import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <div>
      <header>
        <p>Book Buddy</p>
        <nav className="navbar">
          <NavLink to="/users/me">My Account</NavLink>
          <NavLink to="/books">Books</NavLink>
          {token ? (
            <NavLink onClick={() => logout()}>Log out</NavLink>
          ) : (
            <>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}
