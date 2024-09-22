import { useState, useEffect } from 'react';

// Mock implementation for authentication
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch authentication status and user info from backend or local storage
    // For now, we'll use mock data
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsAuthenticated(true);
      setUsername(user.username);
    }
  }, []);

  return { isAuthenticated, username };
};

export { useAuth };
