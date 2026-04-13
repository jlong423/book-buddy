import { useEffect, useState } from "react";
import React from "react";
import { useAuth } from "./AuthContext";

const API = import.meta.env.VITE_API;

export default function Account() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    async function currentUser() {
      const response = await fetch(API + "/users" + "/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setUser(result);
    }

    async function currentReservation() {
      const response = await fetch(API + "/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      console.log(result);
      setReservations(result);
    }

    currentUser();
    currentReservation();
  }, [token]);

  async function returnBook(reservationId) {
    console.log("returning for reservation:", reservationId);
    const result = await fetch(API + "/reservations/" + reservationId, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.status == 204) {
      const response = await fetch(API + "/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      console.log(result);
      setReservations(result);
    }
  }

  return (
    <div>
      <h2>My Account</h2>

      {!user && <p>Loading...</p>}

      {user && (
        <div>
          <p>
            Name: {user?.firstName} {user?.lastName}
          </p>
          <p>Email: {user?.email}</p>
        </div>
      )}

      <h3>My Reserved Books</h3>
      {reservations.length === 0 && <p>You have no reserved books</p>}

      {reservations.length > 0 && (
        <ul>
          {reservations.map((r) => (
            <li key={r.bookid}>
              <p>
                {r.title} - {r.author}
              </p>
              <button onClick={() => returnBook(r.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
