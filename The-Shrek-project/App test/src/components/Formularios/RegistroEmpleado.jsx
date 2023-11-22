import '../../Resources/css/Login.css';
import ImagenLogin from '../../Resources/Images/Login-Registro.jpg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Connections/axiosConfig';
import DropdownRol from '../MenusDesplegables/MenuDesplegableRoles';

export const NuevoEmpleado = () => {
  const rol = window.localStorage.getItem('Rol')
  if(rol != 'ADMINISTRADOR'){
    window.location.href = "/"
    return(null)
  }
    const navigate = useNavigate();
    const [datosFormulario, setDatosFormulario] = useState({
        username:'',
        password:'',
        firstname:'',
        lastname:'',
        email:'',
        rol:''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setDatosFormulario({...datosFormulario,[name]:value})
    }
    const handleRegistro = async (e) => {
        e.preventDefault();
        console.log(datosFormulario)
        const datosCompletos = Object.values(datosFormulario).every((campo) => (campo !== ''));
        if(datosCompletos){
        try {  
        const response = await axiosInstance.post(`/auth/register`,datosFormulario);
        // Si la solicitud fue exitosa (código de estado 2xx)
        if (response.status >= 200 && response.status < 300) {
          window.location.reload()
        } else {
          console.error('Credenciales inválidas');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }}else{
        console.log("Complete todos los campos")
      }
    };
    const handleDropdownRolSelect = (selectedOption) => {
      setDatosFormulario({...datosFormulario, rol: selectedOption });
      console.log(selectedOption)
    };
    return (

      <div className='container'>
      <div>
        <h2>Registrarse</h2>
        <form onSubmit={handleRegistro}>
        <img src="src/Resources/Images/Login-Registro.jpg" alt="" />
        <br />
          <label>
            Nombre:
            <input placeholder="Ingresar Nombre" type="text" name="firstname" value={datosFormulario.firstname} onChange={handleChange} />
          </label>
          <br />
          <label>
            Apellido:
            <input placeholder="Ingresar Apellido" type="text" name="lastname" value={datosFormulario.lastname} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input placeholder="Ingresar email" type="text" name="email"value={datosFormulario.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Username:
            <input placeholder="Ingresar Usuario" type="text" name="username"value={datosFormulario.username} onChange={handleChange} />
          </label>
          <br />
          <label>
            Contraseña:
            <input placeholder="Ingresar contraseña" type="password" name="password" value={datosFormulario.password} onChange={handleChange} />
          </label>
          <br />
          <label>
            Repetir Contraseña:
            <input placeholder="Repita contaseña" type="password" name="" value={datosFormulario.password2} onChange={handleChange} />
          </label>
          <br />
          <DropdownRol onSelectOptionRol={handleDropdownRolSelect}/>
          <br />

          <button type="submit">Registrarse</button>
          <button type="submit">Cancelar</button>
          <br />
        </form>
      </div>
    </div>
    );
  };
  
  export default NuevoEmpleado;