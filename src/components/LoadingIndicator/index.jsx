// src/components/LoadingIndicator.js
import React from 'react';
import { useLoading } from '../../context/LoadingContext';

const LoadingIndicator = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
      <div className="loader"></div>
      <style>
        {`
          .loader {
            border: 8px solid #f3f3f3;
            border-radius: 50%;
            border-top: 8px solid #3498db;
            width: 60px;
            height: 60px;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingIndicator;
