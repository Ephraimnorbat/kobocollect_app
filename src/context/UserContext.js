import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
// SurveysScreen (Main survey list and actions)
// SubmissionsScreen (Track submitted surveys)
// NotificationsScreen (User notifications)
// ProfileScreen (User profile and settings)