import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Manejo del cambio en los campos de entrada
    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    };

    const handleContrasenaChange = (event) => {
        setContrasena(event.target.value);
    };

    // Manejo del envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Crear el objeto con las credenciales
        const credentials = {
            username: correo,
            password: contrasena
        };

        try {
            // Realizar la solicitud POST a la API
            const response = await axios.post('http://127.0.0.1:8000/admin/login', credentials);

            // Si la respuesta es exitosa, guardamos el token en el localStorage
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);

            // También almacenamos el Bearer para uso posterior (opcional, si se necesita separarlo)
            localStorage.setItem('bearer', 'Bearer');

            // Redirigir al usuario a la página de lista de voluntarios
            navigate('/ListaVoluntarios');
        } catch (error) {
            // Si ocurre un error (como credenciales incorrectas), mostramos un mensaje
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="wrapper d-flex">
            <div className="login-left">
                <form onSubmit={handleSubmit}>
                    <h3>Hola, Bienvenido</h3>
                    <h1>Iniciar Sesión</h1>
                    {error && <p className="error-message">{error}</p>}  {/* Muestra el error si las credenciales son incorrectas */}
                    <div className="input-box">
                        <p>Correo</p>
                        <input
                            type="text"
                            placeholder="Ingrese su Correo Electrónico"
                            value={correo}
                            onChange={handleCorreoChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <p>Contraseña</p>
                        <input
                            type="password"
                            placeholder="Ingrese su Contraseña"
                            value={contrasena}
                            onChange={handleContrasenaChange}
                            required
                        />
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                </form>
            </div>
            <div className="login-right"></div>
        </div>
    );
};

export default Login;
