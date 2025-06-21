import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE } from "../api";
import "./Home.css";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [search, setsearch] = useState('');
  const[name,setname]=useState('');
  const[contact,setcontact]=useState('');
  const[property,setproperty]=useState('');
  const[message,setmessage]=useState('');
  const[response,setresponse]=useState('');

  useEffect(() => {
    fetch(`${BASE}/api/listings`)
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);


  const handlesubmit=async ()=>{
   
    const res=await fetch(`${BASE}/api/host`,{
      method:'POST',
       headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, contact, property, message }),
    });

    const data=await res.json();
    setresponse(data.message);
    setname(''); setcontact(""); setproperty(""); setmessage("");
  };

  const filterlisting = listings.filter((listing) =>
    listing.location.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="home-container">
      <div className="hero-section">
        <img
          src="https://a0.muscache.com/im/pictures/miso/Hosting-1318888770733850535/original/64456d25-c355-413d-9223-9089d924679d.jpeg"
          alt="StayFinder Hero"
          className="hero-image"
        />
        <div className="hero-text">
          Find Your Perfect Stay Anywhere, Anytime
          <p>Discover the best rooms, hotels, and stays tailored to your needs. Affordable, convenient, and just a few clicks away!</p>
          <button className="booknow" onClick={() => window.scrollTo({ behavior: 'smooth', top: document.getElementById('all').offsetTop })}>Book Now</button>
        </div>
      </div>

      <h2 className="all" id="all">All Listings</h2>
      <input
        type="text"
        placeholder="Search by location"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="search-input"
      />
      <div className="listings-row">
        {filterlisting.map((listing) => (
          <div className="listing-card" key={listing._id}>
            <img
              src={`${BASE}/uploads/${listing.image}`}
              alt="Ocean View Apartment"
              className="listing-image"
            />



            <h3 className="title">{listing.title}</h3>
            <p className="loc">{listing.location}</p>
            <p className="des">{listing.description}</p>
            <p className="pri"><strong>₹{listing.price}/night</strong></p>
            <Link to={`/listing/${listing._id}`} className="view">Book Now</Link>


          </div>

        ))}

      </div>
      <hr />
      <div className="about-us" id='aboutus'>
        <h2 className="aboutus">About <span className="stay">StayFinder</span></h2>
        <p className="about" >
          StayFinder is your trusted platform for discovering affordable, comfortable, and verified accommodations across India. Whether you're planning a weekend getaway, a family vacation, or a remote work retreat, StayFinder connects you with top-rated stays tailored to your needs. With a seamless user experience, transparent pricing, and a commitment to quality and safety, we make finding the perfect stay easier than ever.
        </p>
      </div>
      <div className="photo">
        <img src='https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWlyYm5ifGVufDB8fDB8fHww'
          alt='aboutus-image' className="aboutimage" />
        <div className="textimage">
          <p className="d">Discover unforgettable experiences with every stay.</p>
          <p className="s"><span className="A">A</span>t StayFinder, we believe every stay should be more than just a place to rest. Our carefully curated hotels offer a perfect blend of comfort, elegance, and personalized service to make your trip truly unforgettable. Whether youre traveling for business or leisure, our accommodations are designed to create memories that last a lifetime. Indulge in world-class amenities, savor delicious cuisines, and enjoy unmatched hospitality. With StayFinder, your journey becomes as delightful as the destination.</p>
        </div>
      </div>
      <div className="photo2">
        <img src='https://media.istockphoto.com/id/1453462931/photo/maldives-hotel-beach-resort-on-tropical-island-with-aerial-drone-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=i9KGcEkXnyJbWOHE6o0sHok_lNbpb9UMfb7uX2P9NDw='
          alt='aboutus-image2' className="image2" /></div>

    <div className="host" id="host">
  <h2>Want to host</h2>
  <input type='text' placeholder='enter your name' value={name} onChange={(e) => setname(e.target.value)} />
  <input type='text' placeholder="enter your email/phone no." value={contact} onChange={(e) => setcontact(e.target.value)} />
  <input type='text' placeholder='enter your property' value={property} onChange={(e) => setproperty(e.target.value)} />
  <textarea type='text' placeholder="description about property and any message..." value={message} onChange={(e) => setmessage(e.target.value)} />
  <button className="submit" onClick={handlesubmit} >Submit</button>
  
  {response && <p style={{ color: "green" }}>{response}</p>}
  
</div>


<footer className="site-footer">
  <div className="footer-left">
    <h1>Stay<span className="f" >F</span>inder</h1>
    <h3>Plot-123 ,khandagiri branch,bhubaneswar</h3>
    <h3>Phone: +91 98765 43210</h3>
    <h3>Email: contact-admin@stay<span className="f">f</span>inder.com</h3>
  </div>

  <div className="footer-center">
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <a href="#host" onClick={() => window.scrollTo({ behavior: 'smooth', top: document.getElementById('host').offsetTop })}>Want to host</a>
    <a href="#aboutus" onClick={() => window.scrollTo({ behavior: 'smooth', top: document.getElementById('aboutus').offsetTop })}>About Us</a>
    <Link to="/bookings">My Bookings</Link>
  </div>

  <div className="footer-right">
    <h2>Reach Us</h2>
    <a href="https://github.com" target="_blank" rel="noreferrer">
      <i className="fab fa-github"></i>
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
      <i className="fab fa-linkedin"></i>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="https://facebook.com" target="_blank" rel="noreferrer">
      <i className="fab fa-facebook"></i>
    </a>
  </div>
</footer>


    </div>

  );
}

