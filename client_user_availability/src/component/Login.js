// frontend/src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginAction } from "../store/actions/loginActions";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const result = await dispatch(loginAction(formData));
      console.log('result', result);
      if (result?.payload?.token && result?.payload?.role === 'user') {
        navigate('/user/home');
    } else if (result?.payload?.token && result?.payload?.role === 'admin'){
      navigate('/admin/admin-dashboard')
    }
    else {
        alert(`Login failed: ${result.payload}`);
    }
    } catch (err) {
        console.log(`Login failed: ${err}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
            Login
          </button>
          <p className="mt-4">
            If you don't have a account pleasse{" "}
            <Link to="/register" className="mt-20 text-blue-500 hover:font-medium text-sm">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
