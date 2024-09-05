import React, { useState, useEffect, act } from "react";
import axiosPrivate from "../../customaxios/axiosPrivate";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availability, setAvailability] = useState([]);
  const [error, setError] = useState(null); // To handle any error messages

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosPrivate.get("/api/auth/get-avilable");
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch availability when submit button is clicked
  const handleSubmit = async () => {
    if (!selectedUser || !selectedDate) {
      setError("Please select a user and a date.");
      return;
    }

    try {
      const { data } = await axiosPrivate.get(
        `/api/auth/getuserdata/${selectedUser._id}?date=${selectedDate}`
      );
      console.log("getdata", data.data);
      if(data.data){
        setAvailability(data?.data);
      }
      if(data.data.message){
        setAvailability(data.data.message)
      }

      console.log("avilability", availability);
      setError(null);
    } catch (error) {                     
      console.error("Error fetching availability", error);
      // setError("Error fetching availability. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Availability Dashboard
        </h1>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select User:
          </label>
          <select
            className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            onChange={(e) =>
              setSelectedUser(users.find((user) => user._id === e.target.value))
            }
            defaultValue=""
          >
            <option value="" disabled>
              Select a user
            </option>
            {users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.userName}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Date:
          </label>
          <input
            type="date"
            className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <button
            onClick={handleSubmit}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-600"
          >
            Submit
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Availability on {selectedDate}:
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {availability ? (
                <div  className="bg-green-100 p-4 rounded-md shadow-md">
                  <p className="text-lg font-semibold text-green-700">
                    Available from: {new Date(availability.start).toLocaleTimeString()} to {new Date(availability.end).toLocaleTimeString()}
                  </p>
                </div>
            ) : (
              <p className="text-lg text-gray-500">
                No availability for this date.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
