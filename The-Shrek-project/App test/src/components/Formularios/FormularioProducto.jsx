import { useState } from "react";
import axiosInstance from "../Connections/axiosConfig";
import DropdownMenuRubroProducto from "../MenusDesplegables/MenuDesplegableRubroProducto";
import '../../Resources/css/FormularioProducto.css';
import { FormularioRubroProducto } from './FormularioRubroProducto';

export const FormularioProducto = () => {
    const rol = window.localStorage.getItem('Rol')
    if(rol != 'ADMINISTRADOR'){
    window.location.href = "/"
    return(null)
  }
    const [datosFormulario, setDatosFormulario] = useState({
        denominacion: '',
        descripcion: '',
        tiempoEstimadoCocina: 0,
        precioVenta: 0, 
        costo: 0,      
        urlImagen: '',
        receta: {
            nombreReceta: '',
            instruccion: '',
            duracionReceta: 0
        },
        rubroProducto: {
            id: 0
        }
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setDatosFormulario({...datosFormulario, [name]:value});
    };
    const handleDropdownSelect = (selectedOption) => {
        setDatosFormulario({ ...datosFormulario, rubroProducto: { id:selectedOption } });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        const datosFormularioConId = {
            ...datosFormulario,
        receta: {
            ...datosFormulario.receta,
            // Solo necesitas estas propiedades de receta aquí
            duracionReceta: datosFormulario.receta.duracionReceta,
        },
            rubroProducto: {
                id: datosFormulario.rubroProducto.id
            }
        };
        console.log("Receta actualizada:", datosFormulario.receta);
        console.log("Estoy enviando :", datosFormularioConId);
        const camposCompletos = Object.values(datosFormularioConId).every((campo) => (campo !== '' && campo !== 0 && campo !== null));
        if (camposCompletos) {
        //Llamado a la APi con los datos
            axiosInstance.post('api/v1/e/Producto',datosFormularioConId)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error.response.data);  // Muestra detalles del error devueltos por el servidor
            });
        } else {
            console.log('Por favor, complete todos los campos antes de enviar el formulario.');
          }
          setDatosFormulario({
            denominacion: '',
            descripcion: '',
            tiempoEstimadoCocina: 0,
            precioVenta: '',
            costo: 0,
            urlImagen: '',
            receta: {
                nombreReceta: '',
                instruccion: '',
                duracionReceta: 0
            },
            rubroProducto: {
                id: 0
            }
        });
    };

        return(
            <div className='formulario_producto'>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre Producto
                    <input type="text" name="denominacion" value={datosFormulario.denominacion} onChange={handleChange} />
                </label>
                <label>
                    Descripcion Producto
                    <input type="text" name="descripcion" value={datosFormulario.descripcion} onChange={handleChange} />
                </label>
                <label>
                    Precio Venta
                    <br />
                    <input type="text" name="precioVenta" value={datosFormulario.precioVenta} onChange={handleChange} />
                </label>
                <label>
                    Costo por unidad
                    <input type="text" name="costo" value={datosFormulario.costo} onChange={handleChange} />
                </label>
                <label>
                    Link a la imagen
                    <input type="text" name="urlImagen" value={datosFormulario.urlImagen} onChange={handleChange} />
                </label>
                <label>
                    Nombre receta
                    <input type="text" value={datosFormulario.receta.nombreReceta} onChange={(e) =>
                  setDatosFormulario((prevDatos) => ({
                    ...prevDatos,
                    receta: { ...prevDatos.receta, nombreReceta: e.target.value },
                  }))
                }/>
                </label>    
                <label> 
                    Instrucciones receta    
                    <br />  
                    <textarea id="textarea_formularioproducto"
                        name="receta"
                        value={datosFormulario.receta.instruccion}
                        rows="4"
                        onChange={(e) =>
                            setDatosFormulario((prevDatos) => ({
                              ...prevDatos,
                              receta: { ...prevDatos.receta, instruccion: e.target.value },
                            }))
                          }
                    />
                </label>
                <label>
                    Tiempo estimado de cocina en minutos
                    <input type="text" name="tiempoEstimadoCocina" value={datosFormulario.tiempoEstimadoCocina} onChange={handleChange} />
                </label>
                <label>
                    Duracion receta
                    <input type="text" value={datosFormulario.receta.duracionReceta} 
                            onChange={(e) =>
                            setDatosFormulario((prevDatos) => ({
                              ...prevDatos,
                              receta: { ...prevDatos.receta, duracionReceta: e.target.value },
                            }))
                          }
                    />
                </label>
                <DropdownMenuRubroProducto  onSelectOption={handleDropdownSelect}/>
                
                <br />
                <button type="submit">Crear</button>
                
            </form>
            
            <FormularioRubroProducto />
            </div>
        );

}