import React, { useEffect, useState } from "react";
import { BASE, authHeaders } from "../api";
import './userbooking.css';

function UserBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${BASE}/api/bookings/my`, { headers: authHeaders() })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {bookings.map((b) => (
        <div className="booking-card" key={b._id}>
          <h3>{b.listing?.title}</h3>
          <p>{b.listing?.location}</p>
          <p>Check-in: {b.checkin}</p>
          <p>Check-out: {b.checkout}</p>
      
        </div>
      ))}
     
    </div>
  );
}

export default UserBookings;
