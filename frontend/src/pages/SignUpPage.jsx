import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; 
import Navbar from "../Components/Navbar";

const Signup = ({ setPage }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post("http://localhost:5000/signup", formData);
      alert("Signup successful! Please login.");
      setPage("login");
    } catch (err) {
      console.log("Error during signup:", err.response || err.message);
      alert("Error signing up: " + (err.response?.data || err.message));
    }
  };
  
  

  return (
    <div>
        <Navbar />
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <textarea name="address" placeholder="Address" onChange={handleChange} required></textarea>
        <button type="submit">Signup</button>
      </form>
      <button onClick={() => setPage("login")}>Go to Login</button>
    </div>
  );
};

Signup.propTypes = {
  setPage: PropTypes.func.isRequired,  // setPage is a required function
};
export default Signup;
