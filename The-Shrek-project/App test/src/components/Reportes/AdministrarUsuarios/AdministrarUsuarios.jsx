import axiosInstance from "../../Connections/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const AdministrarUsuarios = () => { 
    const rol = window.localStorage.getItem('Rol')
    if(rol !== 'ADMINISTRADOR'){
        window.location.href = "/"
        return null;
    }
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const Usuarios = await obtenerPedidos();
            setUsuarios(Usuarios);
        };
        fetchUsuarios();
    }, []);  // Asegúrate de pasar un arreglo vacío para que useEffect solo se ejecute una vez al montar el componente

    const obtenerPedidos = async () => {
        try {
            const respuesta = await axiosInstance.get(`/api/v1/u`);
            console.log(respuesta.data)
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener usuarios desde la API:', error);
            return [];
        }
    }
    const IrADetalle = (e) => {
        navigate('DetallePedido',{e})
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Numero Usuario</th>
                    <th>Nombre Usuario</th>
                    <th>Email</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Rol</th>
                    <th>Usuario</th>
                    {/* <th>Detalle</th> */}
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                   
                    <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.username}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.firstname}</td>
                        <td>{usuario.lastname}</td>
                        <td>{usuario.rol}</td>
                        <td>{usuario.username}</td>
                        {/* {<td><button onClick={() => IrADetalle(pedido.id)}>Detalle</button></td>} */}
                    </tr>
                    
                ))}
            </tbody>
        </table>
    );
}

export default AdministrarUsuarios;