import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE, authHeaders } from "../api";
import './userbooking.css';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`${BASE}/api/listings/${id}`);
        const data = await res.json();
        setListing(data);
      } catch (error) {
        console.error("Error loading listing:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
  }, [id]);

  // 🧮 Calculate number of nights
  const getNumberOfNights = () => {
    if (!checkin || !checkout) return 0;
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const timeDiff = checkoutDate - checkinDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  const totalPrice = getNumberOfNights() * (listing?.price || 0);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!checkin || !checkout) {
      return alert("Please select check-in and check-out dates");
    }
    if (getNumberOfNights() === 0) {
      return alert("Check-out must be after check-in");
    }
    setShowPayment(true);
  };

  async function confirmBooking() {
    try {
      const res = await fetch(`${BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({
          listingId: id,
          checkin,
          checkout,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Booking successful!");
        navigate("/bookings");
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (err) {
      alert("Error during booking");
    } finally {
      setShowPayment(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!listing || listing.message) return <p>Listing not found</p>;

  return (
    <div className="listing-detail">
      <h2>{listing.title}</h2>
      {listing.image && (
        <img
          src={`${BASE}/uploads/${listing.image}`}
          alt={listing.title}
          style={{ width: "100%", maxWidth: "500px" }}
        />
      )}
      <p><strong>Location:</strong> {listing.location}</p>
      <p><strong>Description:</strong> {listing.description}</p>
      <p><strong>Price per night:</strong> ₹{listing.price}</p>

      <form onSubmit={handleBooking} style={{ marginTop: "20px" }}>
        <label>
          Check-in:
          <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} required />
        </label>
        <br />
        <label>
          Check-out:
          <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} required />
        </label>
        <br />
        {checkin && checkout && (
          <p>Total Nights: {getNumberOfNights()}</p>
        )}
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        <button type="submit" style={{ marginTop: "10px" }}>Book Now</button>
      </form>

      {showPayment && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Payment!</h2>
            <h3>You're about to pay ₹{totalPrice} for {getNumberOfNights()} nights.</h3>
            <button onClick={confirmBooking}>Confirm Payment</button>
            <button onClick={() => setShowPayment(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
