// src/components/Header.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutSuccess } from "../store/slices/loginSlice";

const Header = () => {
  const userData = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    try {
      dispatch(logoutSuccess());
      navigate("/signin");
    } catch (err) {
      console.log(`ERROR on logout button function: ${err}`);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold">AssingMent</span>
        <span className="bg-green-200 text-green-800 px-2 py-1 text-xs rounded-full">
          Sechdule
        </span>
      </div>
      <nav className="hidden md:flex space-x-6">
        {/* <a href="/" className="hover:underline">
          Home
        </a> */}
        {/* <a href="#products" className="hover:underline">PRODUCTS</a>
        <a href="#features" className="hover:underline">FEATURES</a>
        <a href="#docs" className="hover:underline">DOCS</a>
        <a href="#blog" className="hover:underline">BLOG</a> */}
      </nav>
      {userData ? (
        <>
          <div className="flex flex-row gap-4">
            <p className="mt-2">{userData?.userName}</p>
            <Link
              to="/login"
              onClick={handleLogoutBtn}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
            >
              Logout
            </Link>
          </div>
        </>
      ) : (
        <Link
          to="/login"
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
        >
          LOGIN
        </Link>
      )}
    </header>
  );
};

export default Header;
