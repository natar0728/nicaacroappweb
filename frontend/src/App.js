import React from 'react';
import AppRoutes from './routes';
import { UserProvider } from './Context/UserContext'; // importa el proveedor


function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;