import React, { useState } from "react";
import { BASE } from "../api";
import { useNavigate } from "react-router-dom";
import "./register.css";




 function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch(`${BASE}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.message === "Registered successfully") {
      alert("Registered!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <h2 className="register">Register</h2>
      <input className="input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      <p>Already have an account <a href='/Login'>Login here</a></p>
    </form>
  );
}

export default Register;
