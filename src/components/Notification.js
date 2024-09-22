import React, { useEffect, useState } from 'react';
import { socket } from '../index'; // Import the socket instance

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.off('notification'); // Clean up the listener on unmount
    };
  }, []);

  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
