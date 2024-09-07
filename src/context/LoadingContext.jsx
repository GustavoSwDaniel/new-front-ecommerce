import React, { createContext, useContext, useState } from 'react';
import LoadingIndicator from '../components/LoadingIndicator'
const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <LoadingIndicator />}
    </LoadingContext.Provider>
  );
};
