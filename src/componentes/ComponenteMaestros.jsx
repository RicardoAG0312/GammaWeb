import React, { useState, useEffect } from 'react'
import { ComponentePanel } from "./index.js";
import Swal from 'sweetalert2';
import axios from "axios";


function ComponenteMaestros() {
    const [datoProfesor, setDatoProfesor] = useState([]);
    const [dniProfesor, setDniProfesor] = useState("");
    const [nombreProfesor, setNombreProfesor] = useState("");
    const [apellidoProfesor, setApellidoProfesor] = useState("");
    const [rolProfesor, setRolProfesor] = useState("");
    const [claveProfesor, setClaveProfesor] = useState("");
    const [codigoCursoProfesor, setCodigoCursoProfesor] = useState("");
    const [editar, setEditar] = useState(false);

    const fetchDataProfesor = async () => {
        try {
            const apiURL = await fetch("http://localhost:3000/profesor");
            if (apiURL) {
                const data = await apiURL.json();
                setDatoProfesor(data);
            } else {
                console.log("EXITO CON LA API PROFESOR");
            }
        } catch (error) {
            console.log(error);
            console.log("PROBLEMAS CON LA API PROFESOR");
        }
    }

    useEffect(() => {
        fetchDataProfesor();
    }, [])

    const agregarProfesor = () => {
        axios.post("http://localhost:3000/addMaestro", {
            DNI: dniProfesor,
            Nombre: nombreProfesor,
            Apellido: apellidoProfesor,
            Rol: rolProfesor,
            Clave: claveProfesor,
            Codigo: codigoCursoProfesor
        }).then(() => {
            fetchDataProfesor();
            setDniProfesor("");
            setNombreProfesor("");
            setApellidoProfesor("");
            setRolProfesor("");
            setClaveProfesor("");
            setCodigoCursoProfesor("");
            Swal.fire({
                title: '¡Enhorabuena!',
                text: '¡Profesor agregado con éxito!',
                icon: 'success',
            }); 
        });
    }

    const actualizarProfesor = () => {
        setEditar(false);
        axios.put("http://localhost:3000/updateProfesor", {
            Nombre: nombreProfesor,
            Apellido: apellidoProfesor,
            Rol: rolProfesor,
            Clave: claveProfesor,
            Codigo: codigoCursoProfesor,
            DNI: dniProfesor
        }).then(() => {
            setEditar(false);
            fetchDataProfesor();
            setNombreProfesor("");
            setApellidoProfesor("");
            setRolProfesor("");
            setClaveProfesor("");
            setCodigoCursoProfesor("");
            setDniProfesor("");
            Swal.fire({
                title: '¡Enhorabuena!',
                text: '¡Profesor actualizado con éxito!',
                icon: 'success',
            }); 
        });
    }

    const eliminarProfesor = (dni) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Estas seguro?",
            text: "¡No podrás revertir el cambio!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "¡Si, eliminar!",
            cancelButtonText: "¡No, cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/deleteMaestro/${dni}`)
                .then(() => {
                    fetchDataProfesor();
                });
                swalWithBootstrapButtons.fire({
                title: "¡Enhorabuena!",
                text: "¡Profesor eliminado con éxito!",
                icon: "success"
        }); } else if (
            result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire({
                title: "¡Enhorabuena!",
                text: "¡Profesor no fue eliminado!",
                icon: "error"
            });
            }
        });
    }

    const editarProfesor = (dato) => {
        setEditar(true);
        setDniProfesor(dato.DNI);
        setNombreProfesor(dato.Nombre);
        setApellidoProfesor(dato.Apellido);
        setRolProfesor(dato.Rol);
        setClaveProfesor(dato.Clave);
        setCodigoCursoProfesor(dato.Codigo);
    }

    return (
        <>
            <ComponentePanel />
            <div className='container contenedorAlumnosTabla'>
                <h3> Lista Profesores: </h3>
                <section className="contenedorAddAlumno">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col"> DNI </th>
                                <th scope="col"> Nombre </th>
                                <th scope="col"> Apellido </th>
                                <th scope="col"> Rol </th>
                                <th scope="col"> Clave </th>
                                <th scope="col"> Codigo Curso </th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-success">
                                <td>
                                    <input type="text" value={dniProfesor} onChange={(e) => setDniProfesor(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={nombreProfesor} onChange={(e) => setNombreProfesor(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={apellidoProfesor} onChange={(e) => setApellidoProfesor(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={rolProfesor} onChange={(e) => setRolProfesor(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={claveProfesor} onChange={(e) => setClaveProfesor(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={codigoCursoProfesor} onChange={(e) => setCodigoCursoProfesor(e.target.value)}/>
                                </td>
                                <td>
                                    <div role="group" aria-label="Basic mixed styles example">
                                        {
                                            editar === true ? 
                                            <button onClick={actualizarProfesor} className="btn btn-warning"> Actualizar </button> :
                                            <button onClick={agregarProfesor} className="btn btn-success"> Agregar </button>
                                        }
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col"> DNI </th>
                                <th scope="col"> Nombre </th>
                                <th scope="col"> Apellido </th>
                                <th scope="col"> Rol </th>
                                <th scope="col"> Clave </th>
                                <th scope="col"> Codigo </th>
                                <th scope="col"> Nombre Curso </th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datoProfesor.map((dato) => 
                                    <tr className="table-primary" key={dato.DNI}>
                                        <td> {dato.DNI} </td>
                                        <td> {dato.Nombre} </td>
                                        <td> {dato.Apellido} </td>
                                        <td> {dato.Rol} </td>
                                        <td> {dato.Clave} </td>
                                        <td> {dato.Codigo} </td>
                                        <td> {dato.NombreCurso} </td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button onClick={() => {eliminarProfesor(dato.DNI)}} type="button" className="btn btn-danger"> Eliminar </button>
                                                <button onClick={() => {editarProfesor(dato)}} type="button" className="btn btn-success"> Actualizar </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}

export default ComponenteMaestros;
