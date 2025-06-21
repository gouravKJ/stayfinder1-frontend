import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListingDetail from "./pages/ListingDetail";
import UserBookings from "./pages/UserBookings";
import AdminPanel from "./pages/Adminpanel"; 
import AdminLogin  from "./pages/Adminlogin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/bookings" element={<UserBookings />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin-login" element={<AdminLogin/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
