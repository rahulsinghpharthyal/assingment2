// src/components/MainSection.js
import React from 'react';
import CalendarView from './CalenderView';
import AvailabilityInputForm from './AvilabilityInputForm';
import AvilableSlots from '../component/AvilableSlots';

const MainSection = () => {
  return (
    <main className="flex flex-col md:flex-row justify-between px-6 py-12 md:py-24 bg-gray-50">
      <div className="max-w-lg">
        <span className="inline-block mb-2 bg-gray-200 text-black px-2 py-1 text-xs rounded-full">NEW</span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Scheduling Slots for everyone.</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Meet Cal.com, the event-juggling scheduler for everyone. Focus on meeting, not making meetings. Free for individuals.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800">GET STARTED</button>
      </div>
      <div className="mt-4 mr-72">
          {/* <CalendarView/> */}
          <AvailabilityInputForm/>
        {/* Replace with your Calendar or Scheduling component */}
        {/* <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Rick Astley</h2>
          <p className="text-gray-600 mb-4">Get Rickrolled</p>
          <p className="text-gray-700 mb-4">
            Book me and I will never give you up. Cal will never let you down. Open Source will never run around and desert you.
          </p>
          <div className="mb-4 text-gray-600">30 min | Zoom | Europe / Dublin</div>
          {/* Calendar */}
          {/* <div className="flex justify-between items-center">
            <div className="text-gray-600">September 2024</div>
            <div className="flex space-x-2">
              <button>‹</button>
              <button>›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 mt-4">
            {/* Replace these with actual calendar dates */}
            {/* {Array.from({ length: 30 }, (_, i) => (
              <div key={i} className={`p-2 rounded ${i > 14 ? 'bg-gray-200' : 'bg-white'}`}>
                {i + 1}
              </div>
            ))} */}
          {/* </div>
        </div> */} 
      <AvilableSlots/>
      </div>
    </main>
  );
};

export default MainSection;
