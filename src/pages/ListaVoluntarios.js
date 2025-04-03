import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import CardVoluntario from '../components/CardVoluntario';
import '../styles/listaVoluntarios.css';

const ListaVoluntarios = () => {
    const [voluntarios, setVoluntarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const bearer = localStorage.getItem('bearer');

        if (!token) {
            setError('No estás autenticado. Redirigiendo...');
            // Aquí puedes redirigir al login si no hay token
            // navigate("/login");
            return;
        }

        // Realiza la solicitud GET a la API para obtener los voluntarios
        axios.get('http://127.0.0.1:8000/admin/voluntarios', {
            headers: {
                Authorization: `${bearer} ${token}`  // Bearer + token
            }
        })
            .then(response => {
                setVoluntarios(response.data);
            })
            .catch(error => {
                setError('No se pudo cargar la lista de voluntarios');
                console.error(error);
            });
    }, []);

    // Filtrar la lista de voluntarios por el nombre (según la búsqueda del usuario)
    const voluntariosFiltrados = voluntarios.filter((v) =>
        v.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div>
            <Sidebar />

            <div className="contenido-voluntarios">
                <div className="encabezado-voluntarios">
                    <h1 className="titulo-voluntarios">Lista de Voluntarios</h1>
                    <div className="buscador">
                        <input
                            type="text"
                            placeholder="Buscar voluntario por nombre..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="lista-voluntarios-scroll">
                    {voluntariosFiltrados.length > 0 ? (
                        voluntariosFiltrados.map((voluntario) => (
                            <CardVoluntario key={voluntario.id} voluntario={voluntario} />
                        ))
                    ) : (
                        <p>No se encontraron voluntarios.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListaVoluntarios;
