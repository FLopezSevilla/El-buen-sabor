import '../../Resources/css/FinalizarCompra.css'
import { useCarrito } from '../NuevoPedido/Contexto/ContextoCarrito.jsx';
import RealizarElPedido from './RealizarPedido.jsx';

export const finalizarCompra = ({cambiarAComponente}) =>{
    const { carrito, agregarAlCarrito } = useCarrito();
    const CambiarAFinalizarCompra = () => {
        cambiarAComponente('productos');
      }; 
      const RemoverProducto = (id) => {
        const productoEnCarrito = carrito.find((item) => item.id === id);
    
        if (productoEnCarrito) {
          // Si la cantidad es mayor que 1, reducir en 1, de lo contrario, eliminar el producto del carrito
          if (productoEnCarrito.cantidad > 1) {
            agregarAlCarrito(id, productoEnCarrito.nombre, (productoEnCarrito.precio / productoEnCarrito.cantidad), 2,(productoEnCarrito.costo / productoEnCarrito.cantidad));
          } else {
            // Eliminar el producto del carrito
            agregarAlCarrito(id, productoEnCarrito.nombre, (productoEnCarrito.precio / productoEnCarrito.cantidad), 3,(productoEnCarrito.costo / productoEnCarrito.cantidad));
            CambiarAFinalizarCompra()
          }
        }
      };
    const TotalCarrito = () => {
   
        let total = 0
        if (carrito.length > 0){
          
          carrito.forEach(element => {
            total += element.precio
          });
    
        
        }
        return total.toFixed(2)}
    return (
    <div>     
    <table>
        <thead>
        <tr>
            <th id="tituloCarrito"><h1 >Carrito de Compras</h1></th>
        </tr>
        <tr>
            
            <th>Nombre del producto</th>
            <th>Cantidad</th>   
            <th>Precio</th>   
            
        </tr>
        </thead>
        <tbody>
        {carrito.map((item) => (
          
          <tr key={item.id}>         
        <td>{item.nombre}</td>
        <td>{item.cantidad}</td>
        <td>${item.precio.toFixed(2)}</td>
        <td><button onClick={() => RemoverProducto(item.id)}>Quitar</button></td>
        </tr>
    ))}
    </tbody>
    <tfoot>
    <tr>
      <td></td>
      <td>Total</td>
      <td>{TotalCarrito()}</td></tr>
      <tr>
        <td></td>
        <td><button>Realizar Pedido</button></td>
        <td><button onClick={CambiarAFinalizarCompra}>Volver atras</button></td>
      </tr>
      </tfoot>
    </table>
    <RealizarElPedido />
    </div>



    )



}
export default finalizarCompra