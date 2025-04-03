import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/listaVoluntarios.css';

const CardVoluntario = ({ voluntario }) => {
    const navigate = useNavigate();

    return (
        <div
            className="card-voluntario"
            onClick={() => navigate(`/Voluntario/${voluntario.id}`)}  // Redirige al perfil del voluntario
        >
            <div className="avatar">
                <span>{voluntario.nombre[0]}</span> {/* Muestra la primera letra del nombre como avatar */}
            </div>
            <div className="info-voluntario">
                <h4>{voluntario.nombre} {voluntario.apellido}</h4> {/* Mostrar nombre completo */}
                <p>Estado: {voluntario.estado}</p>
                <p>CI: {voluntario.id}</p>
                <p>Tipo de Sangre: {voluntario.tipo_sangre}</p> {/* Mostrar tipo de sangre */}
                <p>Última evaluación: {voluntario.fecha_ultimo_test}</p> {/* Mostrar fecha de la última evaluación */}
                <p>Próxima evaluación: {voluntario.fecha_proximo_test}</p> {/* Mostrar fecha de la próxima evaluación */}
            </div>
        </div>
    );
};

export default CardVoluntario;
