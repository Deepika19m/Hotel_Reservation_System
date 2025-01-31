import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const navigate = useNavigate(); 

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");  
  const [loading, setLoading] = useState(false);  

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

 
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
      
        localStorage.setItem("isLoggedIn", true);  
        setError(""); 
        alert("Login Successful!");
        navigate("/home2"); 
      } else {
     
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
    
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-register-container">
      <div className="login-form-container">
      
        <h3>Login</h3>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

       
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
