// frontend/src/components/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosPrivate from "../customaxios/axiosPrivate";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axiosPrivate.post(
        "/api/auth/register",
        formData
      );

      console.log(data);
      if (status === 201) {
        alert(data.message); // Registration successful
        navigate('/login')
    } else if (status === 400 || status === 401) {
        alert(data.message); // Handle 400 and 401 errors
    } else {
        alert('Unexpected response from the server.');
    }
    } catch (err) {
      console.error("Registration failed", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

          <input
            type="username"
            name="userName"
            className="w-full p-2 mb-4 border rounded"
            placeholder="username"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="w-full p-2 mb-4 border rounded"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="w-full p-2 mb-4 border rounded"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Register
          </button>
          <p className="mt-4">
            If you have already a account pleasse{" "}
            <Link to="/login" className="mt-20 text-blue-500 hover:font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
