import React from "react";
import Header from "../component/Header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
