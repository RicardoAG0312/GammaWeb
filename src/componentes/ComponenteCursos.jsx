import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import {ComponentePanel} from "./index.js"

function ComponenteCursos() {
    const [cursos, setCursos] = useState([]);
    const [codigoCurso, setCodigoCurso] = useState("");
    const [nombreCurso, setNombreCurso] = useState("");
    const [nivelCurso, setNivelCurso] = useState("");
    const [gradoCurso, setGradoCurso] = useState("");
    const [editar, setEditar] = useState(false);

    const fetchListarCursos = async () => {
        try {
            const apiURL = await fetch("http://localhost:3000/cursos");
            if (!apiURL.ok) {
                console.log("LA API CURSO NO EXISTE");
            }
            const data = await apiURL.json();
            setCursos(data);
        } catch (error) {
            console.log(error);
        }
    }
    const agregarCurso = () => {
        axios.post("http://localhost:3000/addCurso", {
            Codigo: codigoCurso,
            Nombre: nombreCurso,
            Nivel: nivelCurso,
            Grado: gradoCurso,
        }).then(() => {
            fetchListarCursos();
            setCodigoCurso("");
            setNombreCurso("");
            setNivelCurso("");
            setGradoCurso("");
            Swal.fire({
                title: '¡Enhorabuena!',
                text: '¡Curso agregado con éxito!',
                icon: 'success',
            });
        })
    };
    const eliminarCurso = (codigo) => {
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
                axios.delete(`http://localhost:3000/deleteCurso/${codigo}`)
                .then(() => {
                    fetchListarCursos();
                });
                swalWithBootstrapButtons.fire({
                title: "¡Enhorabuena!",
                text: "¡Curso eliminado con éxito!",
                icon: "success"
        }); } else if (
            result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire({
                title: "¡Enhorabuena!",
                text: "¡Curso no fue eliminado!",
                icon: "error"
            });
            }
        });
    }
    const editarCurso = (curso) => {
        setEditar(true);
        setCodigoCurso(curso.Codigo);
        setNombreCurso(curso.Nombre);
        setNivelCurso(curso.Nivel);
        setGradoCurso(curso.Grado);
    }
    const actualizarCurso = () => {
        axios.put("http://localhost:3000/updateCurso", {
            Nombre: nombreCurso,
            Nivel: nivelCurso,
            Grado: gradoCurso,
            Codigo: codigoCurso,
        }).then(() => {
            setEditar(false);
            fetchListarCursos();
            setCodigoCurso("");
            setNombreCurso("");
            setNivelCurso("");
            setGradoCurso("");
            Swal.fire({
                title: '¡Enhorabuena!',
                text: '¡Curso actualizado con éxito!',
                icon: 'success',
            });
        }).catch((error) => {
            console.error("Error al actualizar el cursos:", error);
        });
    }
    
    useEffect(() => {
        fetchListarCursos();
    }, [])

    return (
        <>
            <ComponentePanel />
            <div className='container contenedorAlumnosTabla'>
                <h3> Lista Cursos: </h3>
                <section className="contenedorAddAlumno">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col"> Código </th>
                                <th scope="col"> Nombre </th>
                                <th scope="col"> Nivel </th>
                                <th scope="col"> Grado </th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-success">
                                <td>
                                    <input type="text" value={codigoCurso} onChange={(e) => setCodigoCurso(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={nombreCurso} onChange={(e) => setNombreCurso(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={nivelCurso} onChange={(e) => setNivelCurso(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={gradoCurso} onChange={(e) => setGradoCurso(e.target.value)}/>
                                </td>
                                <td>
                                    <div role="group" aria-label="Basic mixed styles example">
                                        {
                                            editar === true ? 
                                            <button onClick={actualizarCurso} className="btn btn-warning"> Actualizar </button> :
                                            <button onClick={agregarCurso} className="btn btn-success"> Agregar </button>
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
                                <th scope="col"> Código </th>
                                <th scope="col"> Nombre </th>
                                <th scope="col"> Nivel </th>
                                <th scope="col"> Grado </th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cursos.map((curso) => 
                                    <tr className="table-primary" key={curso.Codigo}>
                                        <td> {curso.Codigo} </td>
                                        <td> {curso.Nombre} </td>
                                        <td> {curso.Nivel} </td>
                                        <td> {curso.Grado} </td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button onClick={() => {eliminarCurso(curso.Codigo)}} type="button" className="btn btn-danger"> Eliminar </button>
                                                <button onClick={() => {editarCurso(curso)}} type="button" className="btn btn-success"> Actualizar </button>
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

export default ComponenteCursos;
