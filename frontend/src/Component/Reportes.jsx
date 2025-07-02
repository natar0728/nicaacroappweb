import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

const API_URL = process.env.REACT_APP_API_URL;
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57', '#8dd1e1'];

const ReporteParticipantes = () => {
  const [reporte, setReporte] = useState([]);
  const [preferencias, setPreferencias] = useState([]);
  const [alojamientos, setAlojamientos] = useState([]);

  const token = localStorage.getItem('token');
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    obtenerReporte();
  }, []);

  const obtenerReporte = async () => {
    try {
      const response = await axios.get(`${API_URL}/reportes/reporte-participantes`, headers);
      setReporte(response.data);
      procesarDatos(response.data);
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
    }
  };

  const procesarDatos = (data) => {
    const conteoPreferencias = {};
    const conteoAlojamientos = {};

    data.forEach(item => {
      const pref = item.preferencia_dietetica || 'Sin preferencia';
      const alo = item.alojamiento || 'Sin alojamiento';

      conteoPreferencias[pref] = (conteoPreferencias[pref] || 0) + 1;
      conteoAlojamientos[alo] = (conteoAlojamientos[alo] || 0) + 1;
    });

    const preferenciasProcesadas = Object.entries(conteoPreferencias).map(([key, value]) => ({
      name: key,
      value,
    }));

    const alojamientosProcesados = Object.entries(conteoAlojamientos).map(([key, value]) => ({
      name: key,
      cantidad: value,
    }));

    setPreferencias(preferenciasProcesadas);
    setAlojamientos(alojamientosProcesados);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-4">
        <h2 className="mb-4 text-center">Reporte Gráfico de Participantes</h2>

        <div className="mb-5">
          <h4 className="text-center">Distribución de Preferencias Dietéticas</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={preferencias}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {preferencias.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-center">Participantes por Alojamiento</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={alojamientos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default ReporteParticipantes;
