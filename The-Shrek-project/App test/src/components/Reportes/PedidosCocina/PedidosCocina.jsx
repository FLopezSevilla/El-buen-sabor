import axiosInstance from "../../Connections/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const PedidosCocina = () => { 
    const rol = window.localStorage.getItem('Rol')
    if(rol !== 'COCINERO'){
        window.location.href = "/"
        return null;
    }
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            const Pedidos = await obtenerPedidos();
            console.log(Pedidos.content)
            setPedidos(Pedidos.content);
            console.log(pedidos)
        };
        fetchPedidos();
    }, []);  // Asegúrate de pasar un arreglo vacío para que useEffect solo se ejecute una vez al montar el componente

    const obtenerPedidos = async () => {
        try {
            const respuesta = await axiosInstance.get(`/api/v1/e/Pedido/search/status/pending`);
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
                    <th>Estado Pedido</th>
                    {/* <th>Detalle</th> */}
                </tr>
            </thead>
            <tbody>
                {Array.isArray(pedidos) && pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.fechaPedido}</td>
                    <td>{pedido.estado}</td>
                    </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default PedidosCocina;