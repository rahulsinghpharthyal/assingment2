import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosPrivate from '../customaxios/axiosPrivate';

const AvilableSlots = () => {
  const userData = useSelector((state) => state.login.user);
  const [existingSlots, setExistingSlots] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/api/auth/get-avilability/${userData._id}`,
          {
            headers: { Authorization: `Bearer ${userData.token}` },
            withCredentials: true,
          }
        );
        setExistingSlots(data?.data?.availabilityPeriods);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };
    fetchAvailability();
  }, [userData._id, userData.token]);

  const deleteSlot = async (slotId) => {
    try {
      const { data } = await axiosPrivate.delete(
        `/api/auth/delete-avilability/${userData._id}/${slotId}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
          withCredentials: true,
        }
      );
      alert(data?.message);
      setExistingSlots(existingSlots.filter((slot) => slot._id !== slotId));
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  const updateSlot = async (slotId) => {
    try {
      await axiosPrivate.put(
        `/api/auth/update-avilability/${userData._id}/${slotId}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
          withCredentials: true,
        }
      );
      const updatedSlots = existingSlots.map((slot) =>
        slot._id === slotId ? { ...slot, ...editFormData } : slot
      );
      setExistingSlots(updatedSlots);
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating slot:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Availability Slots
      </h3>
      {existingSlots?.length > 0 ? (
        existingSlots.map((slot, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm"
          >
            {isEditing === slot._id ? (
              <div className="space-y-4">
                <input
                  type="datetime-local"
                  name="start"
                  value={editFormData.start}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="datetime-local"
                  name="end"
                  value={editFormData.end}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => updateSlot(slot._id)}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-700">
                    <strong>Start:</strong> {new Date(slot.start).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <strong>End:</strong> {new Date(slot.end).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Duration:</strong> {slot.duration} minutes
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => deleteSlot(slot._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(slot._id);
                      setEditFormData({
                        start: new Date(slot.start).toISOString().slice(0, 16),
                        end: new Date(slot.end).toISOString().slice(0, 16),
                        duration: slot.duration,
                      });
                    }}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No availability slots added yet.</p>
      )}
    </div>
  );
};

export default AvilableSlots;
