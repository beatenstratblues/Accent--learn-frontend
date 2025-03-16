// src/context/UserProvider.jsx
import { useState, useEffect } from 'react';
import UserContext from './context/AuthContext';

// Create the provider component
function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    try {
      const savedData = localStorage.getItem('userData');
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error("Error loading user data from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
      } else {
        localStorage.removeItem('userData');
      }
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  }, [userData]);

  const updateUser = (data) => {
    setUserData(data);
  };

  const clearUser = () => {
    setUserData(null);
  };

  const contextValue = {
    userData,
    updateUser,
    clearUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;