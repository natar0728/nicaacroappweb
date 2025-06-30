import React, { createContext, useState } from 'react';

// 1. Crear contexto
export const UserContext = createContext();

// 2. Crear proveedor
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(""); // admin, organizador, host

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};