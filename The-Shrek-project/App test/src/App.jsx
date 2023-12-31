import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Resources/css/App.css'
import Cabecera from './components/Cabecera';
import CuerpoPedidoProductos from './components/CuerpoPedidoProductos';
import { FormularioProducto } from './components/Formularios/FormularioProducto';
import { CarritoProvider } from './components/NuevoPedido/Contexto/ContextoCarrito';
import { Registro } from './components/Formularios/Registro';
import { Login } from './components/Formularios/Login';
import NuevoEmpleado from './components/Formularios/RegistroEmpleado';
import Logout from './components/Seguridad/Logout';
import PrivateRoute from './components/Seguridad/PrivateRoute';
import MisPedidos from './components/Reportes/MisPedidos/MisPedidos';
import DetallePedido from './components/Reportes/MisPedidos/DetallePedido';
import PedidosCocina from './components/Reportes/PedidosCocina/PedidosCocina'
import WIP from './components/WIP/TrabajandoEnEllo';
import AdministrarUsuarios from './components/Reportes/AdministrarUsuarios/AdministrarUsuarios';

function App() {

  return (
    <CarritoProvider>
    <Router>
      
        <Cabecera />
        <div className='padre'>
        
          <Routes>
            <Route path="" element={<CuerpoPedidoProductos />} />
            <Route path="/NuevoProducto" element={<PrivateRoute element={< FormularioProducto />}/>} />
            <Route path="/NuevoEmpleado" element={<PrivateRoute element={< NuevoEmpleado />}/>} />
            <Route path="/PedidosCocina" element={<PrivateRoute element={< PedidosCocina />}/>} />
            <Route path="/MisPedidos" element={<PrivateRoute element={< MisPedidos />}/>} />
            <Route path="/MisPedidos/DetallePedido/:id" element={<DetallePedido />} />
            <Route path="/AllUsers" element={<PrivateRoute element={< AdministrarUsuarios />}/>} />
            <Route path="/Facturacion" element={<PrivateRoute element={< WIP />}/>} />
            <Route path="/PedidosDelivery" element={<PrivateRoute element={< WIP />}/>} />
            <Route path="/EntregaPedidos" element={<PrivateRoute element={< WIP />}/>} />
            <Route path="/CobroPedidos" element={<PrivateRoute element={< WIP />}/>} />
            <Route path="/Ingredientes" element={<PrivateRoute element={< WIP />}/>} />
            <Route path="/Register" element={<Registro />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/Logout" element={<Logout />} />
          </Routes>

        
        </div>
      
    </Router>
    </CarritoProvider>
  );
};

export default App;
