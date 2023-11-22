import '../../Resources/css/Login.css'
import ImagenLogin from '../../Resources/Images/Login-Registro.jpg'
import { useState } from 'react';
import axiosInstance from '../Connections/axiosConfig';
import { Navigate } from 'react-router-dom';
import useIsLoggedIn from '../Hooks/IsLoggedIn';

export const Login = () => {
  if(useIsLoggedIn()){
    window.location.href = "/"
    return(null)
  }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        
        const response = await axiosInstance.post(`/auth/login`, {
          username,
          password
        });
  
        // Si la solicitud fue exitosa (código de estado 2xx)
        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          // Manejar la respuesta del servidor, por ejemplo, almacenar el token
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('isLoggedIn','true')
          window.localStorage.setItem('Id',data.id)
          const rol = data.rol.replace(/\[|\]/g, '')
          window.localStorage.setItem('Rol',rol)
          console.log('Token:', data.token);
          window.location.href = "/";
          
        } else {
          console.error('Credenciales inválidas');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    return (
      <div className='container'>
      <div>
        <img src="src/Resources/Images/Login-Registro.jpg" alt="" />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <label>
            Nombre de Usuario:
            <input placeholder="Ingrese usuario" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Contraseña:
            <input placeholder="Ingrese contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Iniciar Sesión</button>
          <button type="">Cancelar</button>
          <br />
          <a href="">Iniciar sesión con google <img className= "google" src="src/Resources/Images/google.jpeg" alt="" /></a>
          <p>No tengo cuenta, <a href="./Register">Registrarme</a></p>
        </form>
      </div>
    </div>
    );  

  };
  
  export default Login;