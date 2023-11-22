import '../Resources/css/Cabecera.css';
import Logo from '../Resources/Images/logo.jpeg';
import usuario from '../Resources/Images/admin.jpeg';
import { Link } from 'react-router-dom';
import useIsLoggedIn from './Hooks/IsLoggedIn';

const Cabecera = () => {
    let Navegacion = []
    let TipoDeUsuario = "visita"
    const LocalRol = window.localStorage.getItem('Rol')
    console.log(LocalRol)
    if (LocalRol != null){
        TipoDeUsuario = LocalRol
    }
    const LoggedIn = useIsLoggedIn();
    if (LoggedIn){
    switch (TipoDeUsuario) {
        
        case "ADMINISTRADOR":
            Navegacion = [
                {ruta:'/AllUsers',nombre:'Administrar usuarios'},{ruta:'/Facturacion',nombre:'Facturacion'},
                {ruta:'/NuevoEmpleado',nombre:'Nuevo empleado'},{ruta:'/NuevoProducto',nombre:'Nuevo Producto'},{ruta:'/Logout',nombre:'Logout'}]
            break
        case "CLIENTE":
            Navegacion = [{ruta:'/MisPedidos',nombre:'Mis pedidos'},{ruta:'',nombre:'Productos'},{ruta:'/Logout',nombre:'Logout'}]
            break
        case "REPARTIDOR":
            Navegacion = [{ruta:'/PedidosDelivery',nombre:'Pedidos pendientes de entrega'},{ruta:'/Logout',nombre:'Logout'}]
            break
        case "COCINERO":
            Navegacion = [{ruta:'/PedidosCocina',nombre:'Pedidos para preparar'},{ruta:'/Ingredientes',nombre:'Ingredientes'},{ruta:'/Logout',nombre:'Logout'}]
            break
        case "CAJERO":
            Navegacion = [{ruta:'/EntregaPedidos',nombre:'Pedidos para entregar'},{ruta:'/CobroPedidos',nombre:'Cobrar Pedidos'},{ruta:'/Logout',nombre:'Logout'}]
            break
    }
    }else {
        Navegacion = [{ruta:'/Login',nombre:'Ingresar'},{ruta:'',nombre:'Home'},{ruta:'/Register',nombre:'Registrarse'}]
    }
    return (
        <div id="header">
            <div id="main-division">
                <div id="logo" > <img src={Logo} alt="" className='HeaderImage' /></div>
                <div id="menus">
                    <h1 id="titulo">EL BUEN SABOR</h1>
                    
                    <div id="botones">
                    <nav>
                        {Navegacion.map((x,index) => 
                        <Link key={index} to={x.ruta}>
                        <button className="menu-button" >{x.nombre}</button>
                        </Link>)} {/* mapeo el array para generar los botones necesarios */}
                    </nav>
                    </div>
                    
                </div>
                <div id="user" className='HeaderImage' ><img src={usuario} alt="" className='HeaderImage' /></div>
            </div>
            <hr />
        </div >
    )
}

export default Cabecera
