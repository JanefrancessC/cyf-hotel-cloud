import React, { useState } from "react";

const BookingForm = ({ addBooking }) => {
  const [booking, setBooking] = useState({
    title: "",
    firstName: "",
    surname: "",
    email: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooking(booking);
    setBooking({
      title: "",
      firstName: "",
      surname: "",
      email: "",
      roomId: "",
      checkInDate: "",
      checkOutDate: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <input
        name="title"
        value={booking.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="firstName"
        value={booking.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        name="surname"
        value={booking.surname}
        onChange={handleChange}
        placeholder="Surname"
        required
      />
      <input
        name="email"
        value={booking.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        required
      />
      <input
        name="roomId"
        value={booking.roomId}
        onChange={handleChange}
        placeholder="Room ID"
        type="number"
        required
      />
      <input
        name="checkInDate"
        value={booking.checkInDate}
        onChange={handleChange}
        placeholder="Check In Date"
        type="date"
        required
      />
      <input
        name="checkOutDate"
        value={booking.checkOutDate}
        onChange={handleChange}
        placeholder="Check Out Date"
        type="date"
        required
      />
      <button type="submit">Add Booking</button>
    </form>
  );
};

export default BookingForm;
