import React, { useEffect, useState } from "react";
import { BASE } from "../api";


function AdminPanel() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(()=>{
    const token=localStorage.getItem('admin-token');
    if(!token ){
        window.location.href='/admin-login';
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const res = await fetch(`${BASE}/api/listings`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Listing uploaded successfully!");
        setTitle("");
        setLocation("");
        setDescription("");
        setPrice("");
        setImage(null);
      } else {
        setMessage(data.message || "Failed to upload listing.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Upload New Listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        /><br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        /><br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br /><br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          required
        /><br /><br />

        <button type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}
      <button onClick={()=>{
        localStorage.removeItem('admin-token');
        window.location.href='/';
        alert('loggout succesfully');
      }}>Logout here</button>
    </div>
  );
}

export default AdminPanel;
