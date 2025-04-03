import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaCalendarAlt, FaVenusMars, FaPhone, FaTint, FaMapMarkerAlt, FaIdCard, FaFileAlt, FaChartLine, FaHistory } from 'react-icons/fa';
import { MdPsychology } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/infoVoluntarios.css';

const InfoVoluntarios = () => {
    const { id } = useParams();  // Obtiene el ID del voluntario desde la URL
    const navigate = useNavigate();
    const [voluntario, setVoluntario] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Obtener token y bearer del localStorage
        const token = localStorage.getItem('token');
        const bearer = localStorage.getItem('bearer');

        if (!token) {
            setError("No estás autenticado. Redirigiendo...");
            // Redirigir al login si no hay token
            // navigate("/login");
            return;
        }

        // Realiza la solicitud GET para obtener los detalles del voluntario por ID
        axios.get(`http://127.0.0.1:8000/admin/voluntarios/${id}`, {
            headers: {
                Authorization: `${bearer} ${token}`,
            },
        })
            .then(response => {
                setVoluntario(response.data);
            })
            .catch(error => {
                setError('No se pudo obtener la información del voluntario');
                console.error(error);
            });
    }, [id]);

    if (error) return <div>{error}</div>;

    return (
        <div className="container vh-100 w-100">
            <Sidebar />

            <div className="info-container">
                {voluntario && (
                    <>
                        <div className="info-header">
                            <div className="info-avatar">
                                <span>{voluntario.nombre[0]}</span> {/* Muestra la primera letra del nombre como avatar */}
                            </div>
                            <div>
                                <h1>{voluntario.nombre} {voluntario.apellido}</h1>
                                <p>{voluntario.correo}</p>
                            </div>
                            <div className="estado-usuario">
                                <span className="estado-activo"></span> {voluntario.estado}
                            </div>
                        </div>

                        <div className="info-secciones">
                            <div className="info-box">
                                <h4>Datos Personales</h4>
                                <p><FaCalendarAlt /> {voluntario.fecha_nacimiento}</p>
                                <p><FaVenusMars /> {voluntario.genero}</p>
                                <p><FaPhone /> {voluntario.telefono}</p>
                                <p><FaTint /> {voluntario.tipo_sangre}</p>
                                <p><FaMapMarkerAlt /> {voluntario.direccion}</p>
                                <p><FaIdCard /> {voluntario.ci}</p>
                            </div>

                            <div className="info-box">
                                <h4>Evaluaciones Psicológicas</h4>
                                <p><FaFileAlt /> Última evaluación: {voluntario.fecha_ultimo_test}</p>
                                <p><FaCalendarAlt /> Próxima evaluación: {voluntario.fecha_proximo_test}</p>
                                <p><MdPsychology /> Resultado: <strong>{voluntario.resultado_psicologico || "En observación"}</strong></p>
                                <p><FaChartLine /> Niveles de estrés</p>
                                <input type="range" min="1" max="10" value={voluntario.nivel_estres || 4} readOnly />
                            </div>

                            <div className="info-box">
                                <h4>Capacitaciones y Certificaciones</h4>
                                {/* Datos hardcodeados de capacitaciones */}
                                <button>Primeros Auxilios y RCP</button>
                                <button><FaFileAlt /> Rescate en Incendios</button>
                                <button><MdPsychology /> Salud Mental en Emergencias</button>
                            </div>
                        </div>

                        <div className="historial-boton">
                            <button className="btn btn-outline-primary" onClick={() => navigate(`/Historial/${voluntario.id}`)}>
                                <FaHistory /> Historial
                            </button>
                        </div>

                        <div className="info-reportes">
                            <h2>Reportes y análisis</h2>
                            <div className="reporte-box">
                                <h4>{voluntario.nombre} {voluntario.apellido}</h4>
                                <p>Voluntario</p>
                                <ul>
                                    {/* Datos hardcodeados de reportes */}
                                    <li><span className="reporte-icon">🚫</span> <div><strong>Inactividad</strong><br />Información relacionada a inactividad.</div></li>
                                    <li><span className="reporte-icon">⏰</span> <div><strong>Antes de la emergencia</strong><br />Información relacionada a la actividad previa.</div></li>
                                    <li><span className="reporte-icon">⚠️</span> <div><strong>Altos niveles de estrés</strong><br />Información sobre los niveles de estrés.</div></li>
                                    <li><span className="reporte-icon">🏃</span> <div><strong>Necesidad urgente de actividad física</strong><br />Información sobre la necesidad de actividad.</div></li>
                                    <li><span className="reporte-icon">📈</span> <div><strong>Después de la emergencia</strong><br />Información post emergencia.</div></li>
                                    <li><span className="reporte-icon">🧠</span> <div><strong>Necesidad de atención psicológica</strong><br />Información sobre necesidades psicológicas.</div></li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InfoVoluntarios;
