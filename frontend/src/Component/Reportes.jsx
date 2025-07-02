import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Bar, Pie, HorizontalBar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Row, Col, Card } from 'react-bootstrap';

Chart.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const API_URL = process.env.REACT_APP_API_URL;

const colores = ['#66c2a5', '#fc8d62', '#e78ac3', '#a6d854', '#e5c494', '#b3b3b3'];

const ReportesGenerales = () => {
  const [participantes, setParticipantes] = useState([]);
  const [asistencia, setAsistencia] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [alojamientos, setAlojamientos] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);

  const token = localStorage.getItem('token');
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const [resPart, resAsis, resEnt, resAlo, resVol] = await Promise.all([
        axios.get(`${API_URL}/reportes/participantes`, headers),
        axios.get(`${API_URL}/reportes/asistencia`, headers),
        axios.get(`${API_URL}/entradas`, headers),
        axios.get(`${API_URL}/alojamiento`, headers),
        axios.get(`${API_URL}/voluntarios`, headers)
      ]);
      setParticipantes(resPart.data);
      setAsistencia(resAsis.data);
      setEntradas(resEnt.data);
      setAlojamientos(resAlo.data);
      setVoluntarios(resVol.data);
    } catch (err) {
      console.error('Error al cargar reportes:', err);
    }
  };

  const contarCheckins = () => asistencia.filter(a => a.hora_checkin).length;
  const contarCheckouts = () => asistencia.filter(a => a.hora_checkout).length;

  const contarPorCampo = (array, campo) => {
    const conteo = {};
    array.forEach((item) => {
      const clave = item[campo];
      conteo[clave] = (conteo[clave] || 0) + 1;
    });
    return conteo;
  };

  const prepararDatosChart = (conteo) => {
    const labels = Object.keys(conteo);
    const data = Object.values(conteo);
    return {
      labels,
      datasets: [{
        label: 'Cantidad',
        data,
        backgroundColor: colores.slice(0, labels.length)
      }]
    };
  };

  const voluntariosPorOcupacion = () => {
    const conteo = {};
    voluntarios.forEach(v => {
      const ocupaciones = v.ocupaciones?.split(', ') || [];
      ocupaciones.forEach(o => {
        conteo[o] = (conteo[o] || 0) + 1;
      });
    });
    return conteo;
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-4">
        <h2 className="mb-4">📊 Reportes Generales</h2>

        {/* Tarjetas Resumen */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-white bg-success mb-3 shadow">
              <Card.Body>
                <Card.Title>Total Participantes</Card.Title>
                <Card.Text style={{ fontSize: '2rem' }}>{participantes.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-white bg-info mb-3 shadow">
              <Card.Body>
                <Card.Title>Total Check-ins</Card.Title>
                <Card.Text style={{ fontSize: '2rem' }}>{contarCheckins()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-white bg-warning mb-3 shadow">
              <Card.Body>
                <Card.Title>Total Check-outs</Card.Title>
                <Card.Text style={{ fontSize: '2rem' }}>{contarCheckouts()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Gráficos */}
        <Row>
          <Col md={6} className="mb-4">
            <h5>Entradas por tipo</h5>
            <Bar data={prepararDatosChart(contarPorCampo(entradas, 'tipo'))} />
          </Col>
          <Col md={6} className="mb-4">
            <h5>Alojamiento por lugar</h5>
            <Pie data={prepararDatosChart(contarPorCampo(alojamientos, 'nombre_lugar'))} />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h5>Voluntarios por Ocupación</h5>
            <Bar
              data={prepararDatosChart(voluntariosPorOcupacion())}
              options={{ indexAxis: 'y' }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ReportesGenerales;
