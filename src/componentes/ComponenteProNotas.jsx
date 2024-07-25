import React, { useState, useEffect } from "react";
import {ComponentePanelProfesores} from "./index.js";
import axios from "axios";
import Swal from 'sweetalert2';

function ComponenteProNotas() {
    const [notas, setNotas] = useState([]);
    const [notasId, setNotasId] = useState("");
    const [notasDniAlumno, setNotasDniAlumno] = useState("");
    const [notasCalificacion, setNotasCalificacion] = useState("");
    const [notasCodigoCurso, setNotasCodigoCurso] = useState("");
    const [notasIdSeccion, setNotasIdSeccion] = useState("");
    const [editar, setEditar] = useState(false);

    let resultado = notas;
    if (notasDniAlumno) {
        resultado = resultado.filter((dato) =>
            dato.DNI.toString().includes(notasDniAlumno.toString())
        );
    } 

    const fetchListaNotas = async () => {
        try {
            const apiURL = await fetch(`http://localhost:3000/notas`);
            if (!apiURL.ok) {
                console.log("LA API NOTAS NO EXISTE");
            }
            const data = await apiURL.json();
            setNotas(data);
        } catch (error) {
            console.log(error);
        }
    }
    const agregarNota = () => {
        axios.post("http://localhost:3000/addNotas", {
            Calificacion: notasCalificacion,
            Codigo: notasCodigoCurso,
            IDSeccion: notasIdSeccion,
            DNI: notasDniAlumno,
        }).then(() => {
            fetchListaNotas();
            setNotasId("");
            setNotasDniAlumno("");
            setNotasCalificacion("");
            setNotasCodigoCurso("");
            setNotasIdSeccion("");
            Swal.fire({
                title: '¡Enhorabuena!',
                text: '¡Nota agregado con éxito!',
                icon: 'success',
            });
        })
    };
    const editarNota = (nota) => {
        setEditar(true);
        setNotasId(nota.IDNota);
        setNotasDniAlumno(nota.DNI);
        setNotasCodigoCurso(nota.Codigo);
        setNotasCalificacion(nota.Calificacion);
        setNotasIdSeccion(nota.IDSeccion);
    }
    const actualizarNota = () => {
        axios.put("http://localhost:3000/updateNotas", {
            Calificacion: notasCalificacion,
            IDNota: notasId,
        }).then(() => {
            setEditar(false);
            fetchListaNotas();
            setNotasId("");
            setNotasDniAlumno("");
            setNotasCalificacion("");
            setNotasCodigoCurso("");
            setNotasIdSeccion("");
            Swal.fire({
                title: '¡Enhorabuena!',
                text: '¡Nota actualizada con éxito!',
                icon: 'success',
            });
        }).catch((error) => {
            console.error("Error al actualizar el la nota:", error);
        });
    }
    
    useEffect(() => {
        fetchListaNotas();
    }, [])
    console.log(notas);
    return (
        <>
            <ComponentePanelProfesores/>
            <div className='container contenedorAlumnosTabla'>
                <h3> Lista Notas: </h3>
                <section className="contenedorAddAlumno">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col"> ID Nota </th>
                                <th scope="col"> DNI Alumno </th>
                                <th scope="col"> Código Curso </th>
                                <th scope="col"> Calificación </th>
                                <th scope="col"> ID Sección </th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-success">
                                <td>
                                    <input placeholder="No llenar" type="number" value={notasId} onChange={(e) => setNotasId(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" value={notasDniAlumno} onChange={(e) => setNotasDniAlumno(e.target.value)} />
                                </td>
                                <td>
                                    <input type="text" value={notasCodigoCurso} onChange={(e) => setNotasCodigoCurso(e.target.value)}/>
                                </td>
                                <td>
                                    <input placeholder="00.00" type="text" value={notasCalificacion} onChange={(e) => setNotasCalificacion(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={notasIdSeccion} onChange={(e) => setNotasIdSeccion(e.target.value)}/>
                                </td>
                                <td>
                                    <div role="group" aria-label="Basic mixed styles example">
                                        {
                                            editar === true ? 
                                            <button onClick={actualizarNota} className="btn btn-warning"> Actualizar </button> :
                                            <button onClick={agregarNota} className="btn btn-success"> Agregar </button>
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
                                <th scope="col"> ID Nota </th>
                                <th scope="col"> DNI </th>
                                <th scope="col"> Nombre </th>
                                <th scope="col"> Apellido </th>
                                <th scope="col"> Código Curso </th>
                                <th scope="col"> Nombre Curso </th>
                                <th scope="col"> Calificación </th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                resultado.map((nota) => 
                                    <tr className="table-primary" key={nota.IDNota}>
                                        <td> {nota.IDNota} </td>
                                        <td> {nota.DNI} </td>
                                        <td> {nota.NombreAlumno} </td>
                                        <td> {nota.ApellidoAlumno} </td>
                                        <td> {nota.Codigo} </td>
                                        <td> {nota.NombreCurso} </td>
                                        <td> {nota.Calificacion} </td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button onClick={() => {editarNota(nota)}} type="button" className="btn btn-success"> Actualizar </button>
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

export default ComponenteProNotas;
