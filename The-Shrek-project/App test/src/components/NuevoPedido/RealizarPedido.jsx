import DropdownMedioDePago from '../MenusDesplegables/MenuDesplegableMedioDePago.jsx';
import DropdownTipoEntrega from '../MenusDesplegables/MenuDesplegableTipoDeEnvio.jsx';
import { useCarrito } from './Contexto/ContextoCarrito.jsx';
import { useEffect, useState } from 'react';
import axiosInstance from '../Connections/axiosConfig.jsx';

const RealizarPedido = () =>{
    const { carrito } = useCarrito();
    const [numeroPedido, setNumeroPedido] = useState()
    const [detallePedido, setDetallePedido] = useState({
          cantidad: 0,
          subtotal: 0,
          subtotalCosto: 0,
          producto:{id: 0},
          pedido:{
            id:0
          }})
    const [idDetallesPedido, setIdDetallesPedido] = useState([{}])
    const [datosCabeceraPedido, setDatosCabeceraPedido] = useState({
        total: '',
        totalCosto: '',
        estado: 0,      
        estadoPago: 0,
        formaPago: 0,
        tipoEnvio: 0,
        detallePedido:[]
        /* domicilio:{
            calle:'',
            numero:0,
            numeroDpto:0,
            pisoDpto:0

        }, */
    });
    // Función para obtener la hora actual más 30 minutos
  
    const TotalCarrito = () => {
   
        let total = 0
        if (carrito.length > 0){
            carrito.forEach(element => {
            total += element.precio
          });    
        }
    return total.toFixed(2)}
    const TotalCostoCarrito = () => {
   
        let total = 0
        if (carrito.length > 0){
            carrito.forEach(element => {
            total += element.costo
          });    
        }
    return total.toFixed(2)}
   
    const CrearDetallePedido = async () => {
      try {
        const detallesPedidoArray = carrito.map((item) => ({
          cantidad: item.cantidad,
          subtotal: item.precio,
          subtotalCosto: item.costo,
          producto: { id: item.id },
          pedido: {
            id: numeroPedido
          }
        }));
    
        // Realizar la solicitud POST fuera del bucle
        const respuestas = await Promise.all(detallesPedidoArray.map(detalle => axiosInstance.post('api/v1/e/DetallePedido', detalle)));
    
        // Obtener los nuevos detalles con la estructura {id: respuesta.data.id}
        const nuevosDetalles = respuestas.map(respuesta => ({ id: respuesta.data.id }));
    
        // Actualizar el estado después de que todas las solicitudes POST hayan tenido éxito
        setIdDetallesPedido((prevIds) => [
          ...prevIds,
          ...nuevosDetalles
        ]);
        
        console.log("Detalles a agregar ", nuevosDetalles);
        // Actualizar el estado datosCabeceraPedido con los nuevos detalles
       setDatosCabeceraPedido((prevDatosCabeceraPedido) => ({
          ...prevDatosCabeceraPedido,
          detallePedido: nuevosDetalles
        }));
        console.log("Detalles de pedido creados con éxito ", datosCabeceraPedido.detallePedido);
      } catch (error) {
        console.error('Algo salió mal: ', error);
      }
    };

    const CrearPedido = async () => {
      try {
        const respuesta = await axiosInstance.post(
          `/api/v1/e/Pedido`,
          datosCabeceraPedido
        );
        setNumeroPedido(respuesta.data.id)
        return respuesta.data;
      } catch (error) {
        return console.error('Error al obtener productos desde la API:', error);
         }
      
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      setDatosCabeceraPedido((prevDatos) => ({
        ...prevDatos,
        total: TotalCarrito(),
        totalCosto: TotalCostoCarrito(),
        cliente: { id: localStorage.getItem('Id') }
      }));
    
      console.log( "cabecera antes de las comprobaciones: ",datosCabeceraPedido)
      if (datosCabeceraPedido && typeof datosCabeceraPedido === 'object') {
        const camposCompletos = Object.values(datosCabeceraPedido).every(
          (campo) => campo !== undefined
        );
    
        if (camposCompletos) {
          try {
            await CrearDetallePedido();
            await CrearPedido();
            
            // Aquí puedes realizar cualquier otra lógica que necesites después de crear el pedido
    
            // Limpiar el estado después de completar el pedido
            setDatosCabeceraPedido({
              total: '',
              totalCosto: '',
              estado: 'A_COCINA',
              estadoPago: 'PENDIENTE_PAGO',
              formaPago: 'EFECTIVO',
              tipoEnvio: 'DELIVERY',
              domicilio: null,
              detallePedido: [],
            });
            setDetallePedido({});
            setNumeroPedido(null);
            setIdDetallesPedido([]);
          } catch (error) {
            console.error("Hubo un error ", error);
          }
        } else {
          console.log("Complete todos los campos");
          console.log(datosCabeceraPedido);
        }
      } else {
        console.error("datosCabeceraPedido es undefined o null");
      }
    };
    const handleFormaPagoDropdownSelect = (selectedOption) => {
        setDatosCabeceraPedido({ ...datosCabeceraPedido, forma_pago: selectedOption });
      };
      const handleTipoEnvioDropdownSelect = (selectedOption) => {
        setDatosCabeceraPedido({ ...datosCabeceraPedido, tipo_envio: selectedOption });
      };


    
      return (
        <>
          <form onSubmit={handleSubmit}>
            {/* <label>
              Domicilio
            </label>
            <br />
            <label>
              Calle
              <input
                type="text"
                name="calle"
                value={datosCabeceraPedido.domicilio.calle}
                onChange={(e) =>
                  setDatosCabeceraPedido((prevDatos) => ({
                    ...prevDatos,
                    domicilio: { ...prevDatos.domicilio, calle: e.target.value },
                  }))
                }
              />
            </label>
            <br />
            <label>
              Numero
              <input
                type="text"
                name="numero"
                value={datosCabeceraPedido.domicilio.numero}
                onChange={(e) =>
                  setDatosCabeceraPedido((prevDatos) => ({
                    ...prevDatos,
                    domicilio: { ...prevDatos.domicilio, numero: e.target.value },
                  }))
                }
              />
            </label>
            <br />
            <label>
              Piso
              <input
                type="text"
                name="pisoDpto"
                value={datosCabeceraPedido.domicilio.pisoDpto}
                onChange={(e) =>
                  setDatosCabeceraPedido((prevDatos) => ({
                    ...prevDatos,
                    domicilio: { ...prevDatos.domicilio, pisoDpto: e.target.value },
                  }))
                }
              />
            </label>
            <br />
            <label>
              Departamento
              <input
                type="text"
                name="numeroDpto"
                value={datosCabeceraPedido.domicilio.numeroDpto}
                onChange={(e) =>
                  setDatosCabeceraPedido((prevDatos) => ({
                    ...prevDatos,
                    domicilio: { ...prevDatos.domicilio, numeroDpto: e.target.value },
                  }))
                }
              />
            </label> */}
            <DropdownMedioDePago onSelectOption={handleFormaPagoDropdownSelect} />
            <br />
            <DropdownTipoEntrega onSelectOption={handleTipoEnvioDropdownSelect} />
            <br />
            <button type="submit">Crear Pedido</button>
          </form>
        </>
      );
}
export default RealizarPedido