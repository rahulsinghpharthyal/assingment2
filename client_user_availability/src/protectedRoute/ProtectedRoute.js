import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../customaxios/axiosPrivate";
import { updateUser } from "../store/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../component/AdminLayout";
import MainSection from "../pages/MainSection";

const ProtectedRoute = ({allowedRole}) => {
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useSelector((state) => state.login);
  const dispatch = useDispatch();
  console.log("login from protectred route", user);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")); 
    if (!user?.user?._id && savedUser) {
      dispatch(updateUser(savedUser));
    }
    let isMounted = true;
    const authenticate = async () => {
      try {
        const { data } = await axiosPrivate.get("/api/authenticate", {
          headers: {
            "Content-Type": "application/json",
             authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
        });
        console.log("the datais ", data);
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err) {
        console.log("error on authentication", err);
        navigate("/login");
      }
    };
    console.log('this is userDaat',  user?._id);
    console.log('this is saveeduserdara',  savedUser);
    if (savedUser || user?._id) {
      authenticate();
    } else {
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [navigate, dispatch]);

  if (isLoading) return <div>.....isLoading</div>;

  if (!user?._id) {
    return <Navigate to="/login" />;
  }
  console.log('Allowed Role:', allowedRole);
  console.log('User Role:', user.role);

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/not-authorized" />;
  }
 

  return <Outlet/>
};

export default ProtectedRoute;
