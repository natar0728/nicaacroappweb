import React from 'react';
import Navbar from './Navbar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Reportes = () => {
  const participantes = 120;
  const alojamientos = 85;
  const entradas = 100;

  const barData = {
    labels: ['Participantes', 'Alojamiento', 'Entradas'],
    datasets: [{
      label: 'Cantidad',
      data: [participantes, alojamientos, entradas],
      backgroundColor: ['#81C784', '#4CAF50', '#6D4C41']
    }]
  };

  const pieData = {
    labels: ['Registrados', 'Con Alojamiento', 'Con Entrada'],
    datasets: [{
      data: [participantes, alojamientos, entradas],
      backgroundColor: ['#81C784', '#388E3C', '#A1887F']
    }]
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <h2 className="mb-4">Reportes del Evento</h2>

        <div className="row">
          <div className="col-md-6 mb-4">
            <h5>Distribución General</h5>
            <Pie data={pieData} />
          </div>

          <div className="col-md-6 mb-4">
            <h5>Resumen de Cantidades</h5>
            <Bar data={barData} />
          </div>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-success">
            <i className="bi bi-file-earmark-arrow-down"></i> Exportar Reporte
          </button>
        </div>
      </div>
    </>
  );
};

export default Reportes;