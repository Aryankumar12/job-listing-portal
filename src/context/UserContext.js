import { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the stored JSON string back to an object
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user in localStorage
    console.log('user loged in ', userData)
   
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
