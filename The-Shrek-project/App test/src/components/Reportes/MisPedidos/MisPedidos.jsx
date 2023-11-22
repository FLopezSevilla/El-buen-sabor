import axiosInstance from "../../Connections/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './MisPedidos.css'

export const MisPedidos = () => { 
    const rol = window.localStorage.getItem('Rol')
    if(rol !== 'CLIENTE'){
        window.location.href = "/"
        return null;
    }
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            const Pedidos = await obtenerPedidos();
            setPedidos(Pedidos);
        };
        fetchPedidos();
    }, []);  // Asegúrate de pasar un arreglo vacío para que useEffect solo se ejecute una vez al montar el componente

    const obtenerPedidos = async () => {
        try {
            const id = window.localStorage.getItem('Id');
            const respuesta = await axiosInstance.get(`/api/v1/e/Pedido/user/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener pedidos desde la API:', error);
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
                    <th>Numero Pedido</th>
                    <th>Fecha Pedido</th>
                    <th>Total</th>
                    <th>Estado Pedido</th>
                    <th>Estado de Pago</th>
                    <th>Tipo de envio</th>
                    <th>Forma de Pago</th>
                    {/* <th>Detalle</th> */}
                </tr>
            </thead>
            <tbody>
                {pedidos.map((pedido) => (
                   
                    <tr key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{pedido.fechaPedido}</td>
                        <td>{pedido.total}</td>
                        <td>{pedido.estado}</td>
                        <td>{pedido.estadoPago}</td>
                        <td>{pedido.tipoEnvio}</td>
                        <td>{pedido.formaPago}</td>
                        {/* {<td><button onClick={() => IrADetalle(pedido.id)}>Detalle</button></td>} */}
                    </tr>
                    
                ))}
            </tbody>
        </table>
    );
}

export default MisPedidos;