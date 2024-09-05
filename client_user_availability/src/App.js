import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import MainSection from "./pages/MainSection";
import Register from "./component/Register";
import Login from "./component/Login";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import AvailabilityInputForm from "./pages/AvilabilityInputForm";
import CalendarView from "./pages/CalenderView";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import AdminLayout from "./component/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes for users with 'user' role */}
        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path="/user" element={<UserLayout />}>
            <Route path="home" element={<MainSection />} />
            <Route path="available" element={<AvailabilityInputForm />} />
            <Route path="calendar" element={<CalendarView />} />
          </Route>
        </Route>

        {/* Protected routes for admins with 'admin' role */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* Public routes */}
        <Route path="/" element={<UserLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
