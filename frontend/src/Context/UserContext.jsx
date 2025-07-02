import React, { createContext, useState } from 'react';

// 1. Crear contexto
export const UserContext = createContext();


// 2. Crear proveedor
export const UserProvider = ({ children }) => {
  // El rol se asigna según lo que devuelve el backend: 'Administrador', 'Organizador', 'Host'
  const [userRole, setUserRole] = useState("");

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
