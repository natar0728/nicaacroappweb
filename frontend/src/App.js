import React from 'react';
import AppRoutes from './routes';
import { UserProvider } from './Context/UserContext'; // importa el proveedor
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;