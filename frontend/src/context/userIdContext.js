import React, { createContext, useState, useContext } from "react";

export const UserIdContext = createContext();
export const useUserId = () => useContext(UserIdContext);

export default function UserIdProvider(props) {
  const [userId, setUserId] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </UserIdContext.Provider>
  );
}
