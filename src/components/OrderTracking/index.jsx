import React from 'react';

const OrderTracking = ({ tracking }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Rastreio</h3>
      <p className="text-gray-700 mb-4">
        {tracking.carrier} <span className="text-blue-600">{tracking.code}</span>
      </p>
      <div className="flex justify-between">
        {tracking.events.map((event, index) => (
          <div key={index} className="text-center">
            <p className="text-orange-600 font-bold">{event.status}</p>
            <p className="text-gray-500">{event.date} {event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
