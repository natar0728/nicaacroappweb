
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AdminStaff = () => {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/staff`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStaffData(response.data);
      } catch (error) {
        console.error('Error al obtener el staff:', error);
        alert('No se pudo cargar el staff.');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5" style={{ backgroundColor: '#FAF3ED', minHeight: '100vh' }}>
        <h2 className="mb-4">Administrador de Staff</h2>
        {loading ? (
          <p>Cargando staff...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead style={{ backgroundColor: '#F5E9DA' }}>
                <tr>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {staffData.length > 0 ? (
                  staffData.map((staff) => (
                    <tr key={staff.id_staff}>
                      <td>{staff.nombre}</td>
                      <td>{staff.nombre_rol}</td>
                      <td>{staff.correo}</td>
                      <td>{staff.telefono}</td>
                      <td>
                        <button className="btn btn-sm btn-success me-2">
                          <i className="bi bi-pencil-square"></i> Editar
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash"></i> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No hay registros de staff.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminStaff;
