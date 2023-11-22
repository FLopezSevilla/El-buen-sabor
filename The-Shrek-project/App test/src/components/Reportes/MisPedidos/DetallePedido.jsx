import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

export const DetallePedido = () =>{
    const {e} = useParams();
    console.log(JSON.stringify(e))
    return(
        <div>hola</div>
    )

}

export default DetallePedido