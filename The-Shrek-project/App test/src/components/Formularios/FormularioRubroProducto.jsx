import { useState } from "react";
import axiosInstance from "../Connections/axiosConfig";
import axios from 'axios'
import { API_BASE_URL } from "../Connections/config";

export const FormularioRubroProducto = () => {
    const [esVisible, setEsVisible] = useState(false);
    const [datosFormulario, setDatosFormulario] = useState({
        descripcionCategoriaProducto:'',
        nombreCategoriaProducto:''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Estoy enviando :", datosFormulario);
        //Llamado a la APi con los datos
        
        axiosInstance.post(`/ADMIN/RubroProducto`,datosFormulario,{})
        window.location.reload();

    };
    const handleChange = (e) => {
        const { name, value} = e.target;
        setDatosFormulario({...datosFormulario, [name]:value});
    };

    const mostrarOcultar = () => {
        // Cambia el estado para alternar entre visible y oculto
        setEsVisible(!esVisible);
      };
   

        return(
            <>
            <button onClick={mostrarOcultar}>Crear un nuevo rubro </button>
            {esVisible && (
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre Categoria
                    <input type="text" name="nombreCategoriaProducto" value={datosFormulario.nombreCategoriaProducto} onChange={handleChange} />
                </label>
                <label>
                    Descripcion Categoria
                    <input type="text" name="descripcionCategoriaProducto" value={datosFormulario.descripcionCategoriaProducto} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Crear</button>
            </form>)}
            </>
        );

}