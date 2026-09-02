import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [uset, setUser] = useState(null);

  //function to update the user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  //function to clear the user data on logout etc
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
