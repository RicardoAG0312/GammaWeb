import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { ComponentePanel } from "./index.js";

function ComponenteAlumnos() {
    const [alumnos, setAlumnos] = useState([]);
    const [alumnoDNI, setAlumnoDNI] = useState("");
    const [alumnoNombre, setAlumnoNombre] = useState("");
    const [alumnoApellido, setAlumnoApellido] = useState("");
    const [alumnoFecha, setAlumnoFecha] = useState("");
    const [alumnoGenero, setAlumnoGenero] = useState("");
    const [alumnoTelefono, setAlumnoTelefono] = useState("");
    const [editar, setEditar] = useState(false);

    const fetchListaAlumnos = async () => {
        try {
            const apiURL = await fetch("http://localhost:3000/alumno");
            if (!apiURL.ok) {
                console.log("LA API ALUMNO NO EXISTE");
            }
            const data = await apiURL.json();
            setAlumnos(data);
        } catch (error) {
            console.log(error);
        }
    }
    const agregarAlumno = () => {
        axios.post("http://localhost:3000/addAlumno", {
            DNI: alumnoDNI,
            Nombre: alumnoNombre,
            Apellido: alumnoApellido,
            FechaNacimiento: alumnoFecha,
            Genero: alumnoGenero,
            TelefonoApoderado: alumnoTelefono
        }).then(() => {
            fetchListaAlumnos();
            setAlumnoDNI("");
            setAlumnoNombre("");
            setAlumnoApellido("");
            setAlumnoFecha("");
            setAlumnoGenero("");
            setAlumnoTelefono("");
            Swal.fire({
                title: '¡Enhorabuena!',
                text: '¡Alumno agregado con éxito!',
                icon: 'success',
            });
        })
    };
    const eliminarAlumno = (dni) => {
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
                axios.delete(`http://localhost:3000/deleteAlumno/${dni}`)
                .then(() => {
                    fetchListaAlumnos();
                });
                swalWithBootstrapButtons.fire({
                title: "¡Enhorabuena!",
                text: "¡Alumno eliminado con éxito!",
                icon: "success"
        }); } else if (
            result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire({
                title: "¡Enhorabuena!",
                text: "¡Alumno no fue eliminado!",
                icon: "error"
            });
            }
        });
    }
    const editarAlumno = (alumno) => {
        setEditar(true);
        setAlumnoDNI(alumno.DNI);
        setAlumnoNombre(alumno.Nombre);
        setAlumnoApellido(alumno.Apellido);
        setAlumnoFecha(alumno.FechaNacimiento);
        setAlumnoGenero(alumno.Genero);
        setAlumnoTelefono(alumno.TelefonoApoderado);
    }
    const actualizarAlumno = () => {
        axios.put("http://localhost:3000/updateAlumno", {
            Nombre: alumnoNombre,
            Apellido: alumnoApellido,
            FechaNacimiento: alumnoFecha,
            Genero: alumnoGenero,
            TelefonoApoderado: alumnoTelefono,
            DNI: alumnoDNI,
        }).then(() => {
            setEditar(false);
            fetchListaAlumnos();
            setAlumnoDNI("");
            setAlumnoNombre("");
            setAlumnoApellido("");
            setAlumnoFecha("");
            setAlumnoGenero("");
            setAlumnoTelefono("");
            Swal.fire({
                title: '¡Enhorabuena!',
                text: '¡Alumno actualizado con éxito!',
                icon: 'success',
            });
        }).catch((error) => {
            console.error("Error al actualizar el alumno:", error);
        });
    }
    
    useEffect(() => {
        fetchListaAlumnos();
    }, [])
    return (
        <>
            <ComponentePanel />
            <div className='container contenedorAlumnosTabla'>
                <h3> Lista Alumnos: </h3>
                <section className="contenedorAddAlumno">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">DNI</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Fecha de Nacimiento</th>
                                <th scope="col">Género</th>
                                <th scope="col">Télefono Apoderado</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-success">
                                <td>
                                    <input type="number" value={alumnoDNI} onChange={(e) => setAlumnoDNI(e.target.value)} />
                                </td>
                                <td>
                                    <input type="text" value={alumnoNombre} onChange={(e) => setAlumnoNombre(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={alumnoApellido} onChange={(e) => setAlumnoApellido(e.target.value)}/>
                                </td>
                                <td>
                                    <input placeholder="yyyy-mm-dd" title="Formato: yyyy-mm-dd" type="text" value={alumnoFecha} onChange={(e) => setAlumnoFecha(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={alumnoGenero} onChange={(e) => setAlumnoGenero(e.target.value)}/>
                                </td>
                                <td>
                                <input type="number"value={alumnoTelefono} onChange={(e) => setAlumnoTelefono(e.target.value)}/>
                                </td>
                                <td>
                                    <div role="group" aria-label="Basic mixed styles example">
                                        {
                                            editar === true ? 
                                            <button onClick={actualizarAlumno} className="btn btn-warning"> Actualizar </button> :
                                            <button onClick={agregarAlumno} className="btn btn-success"> Agregar </button>
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
                                <th scope="col">DNI</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Fecha de Nacimiento</th>
                                <th scope="col">Género</th>
                                <th scope="col">Télefono Apoderado</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alumnos.map((alumno) => 
                                    <tr className="table-primary" key={alumno.DNI}>
                                        <td> {alumno.DNI} </td>
                                        <td> {alumno.Nombre} </td>
                                        <td> {alumno.Apellido} </td>
                                        <td> 
                                            {new Date(alumno.FechaNacimiento).toLocaleDateString('es-PE', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            }).replace(/\//g, ' - ')}
                                        </td>
                                        <td> {alumno.Genero} </td>
                                        <td> {alumno.TelefonoApoderado} </td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button onClick={() => {eliminarAlumno(alumno.DNI)}} type="button" className="btn btn-danger"> Eliminar </button>
                                                <button onClick={() => {editarAlumno(alumno)}} type="button" className="btn btn-success"> Actualizar </button>
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


export default ComponenteAlumnos;
