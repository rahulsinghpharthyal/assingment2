import React from 'react'
import Header from './Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
        <div>
            <Header/>
        </div>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout;