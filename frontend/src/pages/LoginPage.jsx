import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";



const Login = ({ setPage }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      setPage("home");
    } catch (err) {
      alert(err("Invalid email or password"));
    }
  };

  return (
    <div>
       
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => setPage("signup")}>Go to Signup</button>
    </div>
  );
};
Login.propTypes = {
  setPage: PropTypes.func.isRequired,  // setPage is a required function
};
export default Login;
