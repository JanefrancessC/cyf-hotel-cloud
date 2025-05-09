import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingForm from "./BookingForm";
import BookingTable from "./BookingTable";
import "./App.css";

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/bookings");
      setBookings(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addBooking = async (newBooking) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        newBooking
      );
      setBookings([...bookings, response.data]);
      setError(null);
    } catch (error) {
      console.error("Error adding booking:", error);
      setError("Failed to add booking. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Hotel Bookings</h1>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <BookingTable bookings={bookings} />
      )}
      <BookingForm addBooking={addBooking} />
    </div>
  );
};

export default App;
