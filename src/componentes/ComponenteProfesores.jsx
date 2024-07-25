import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import {ComponentePanel} from "./index.js"

function ComponenteProfesores() {
    const [profesorUsuario, setProfesorUsuario] = useState([]);
    const [dniUsuario, setDniUsuario] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [estado, setEstado] = useState("");
    const [rol, setRol] = useState("");
    const [clave, setClave] = useState("");
    const [editar, setEditar] = useState(false);

    /* Usuario: Rol / Profesor: Nombre, Apellido, Telefono, Estado, IDUsuario */
    const fetchListarProfesor = async () => {
        try {
            const apiURL = await fetch("http://localhost:3000/usuarioData");
            if (!apiURL.ok) {
                console.log("LA API PROFESOR NO EXISTE");
            }
            const data = await apiURL.json();
            setProfesorUsuario(data);
        } catch (error) {
            console.log(error);
        }
    }
    const agregarProfesor = () => {
        axios.post("http://localhost:3000/addProfesor", {
            DNI: dniUsuario,
            Nombre: nombre,
            Apellido: apellido,
            Telefono: telefono,
            Estado: estado,
            Rol: rol,
            Clave: clave,
        }).then(() => {
            fetchListarProfesor();
            setDniUsuario("");
            setNombre("");
            setApellido("");
            setTelefono("");
            setEstado("");
            setRol("");
            setClave("");
            Swal.fire({
                title: '¡Enhorabuena!',
                text: '¡Usuario agregado con éxito!',
                icon: 'success',
            });
        })
    };
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
                axios.delete(`http://localhost:3000/deleteProfesor/${dni}`)
                .then(() => {
                    fetchListarProfesor();
                });
                swalWithBootstrapButtons.fire({
                title: "¡Enhorabuena!",
                text: "¡Usuario eliminado con éxito!",
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
    const editarProfesor = (profesor) => {
        setEditar(true);
        setDniUsuario(profesor.DNI);
        setNombre(profesor.Nombre);
        setApellido(profesor.Apellido);
        setTelefono(profesor.Telefono);
        setEstado(profesor.Estado);
        setRol(profesor.Rol);
        setClave(profesor.Clave);
    }
    const actualizarProfesor = () => {
        axios.put("http://localhost:3000/updateUsuario", {
            Nombre: nombre,
            Apellido: apellido,
            Telefono: telefono,
            Estado: estado,
            Rol: rol,
            Clave: clave,
            DNI: dniUsuario,
        }).then(() => {
            setEditar(false);
            fetchListarProfesor();
            setDniUsuario("");
            setNombre("");
            setApellido("");
            setTelefono("");
            setEstado("");
            setRol("");
            setClave("");
            Swal.fire({
                title: '¡Enhorabuena!',
                text: '¡Usuario actualizado con éxito!',
                icon: 'success',
            });
        }).catch((error) => {
            console.error("Error al actualizar al usuario:", error);
        });
    }
    
    useEffect(() => {
        fetchListarProfesor();
    }, [])
    console.log(profesorUsuario);
    return (
        <>
            <ComponentePanel />
            <div className='container contenedorAlumnosTabla'>
                <h3> Lista Administradores: </h3>
                <section className="contenedorAddAlumno">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col"> DNI </th>
                                <th scope="col"> Nombre </th>
                                <th scope="col"> Apellido </th>
                                <th scope="col"> Telefono </th>
                                <th scope="col"> Estado </th>
                                <th scope="col"> Rol </th>
                                <th scope="col"> Clave </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-success">
                                <td>
                                    <input type="text" value={dniUsuario} onChange={(e) => setDniUsuario(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                                </td>
                                <td>
                                    <input placeholder="Si: 1 - No: 0" type="text" value={estado} onChange={(e) => setEstado(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={rol} onChange={(e) => setRol(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" value={clave} onChange={(e) => setClave(e.target.value)}/>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td colspan="7">
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
                                <th scope="col"> Telefono </th>
                                <th scope="col"> Estado </th>
                                <th scope="col"> Rol </th>
                                <th scope="col"> Clave </th>
                                <th scope="col"> Acciones </th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    profesorUsuario.map((profesor) => 
                                        <tr className="table-primary" key={profesor.DNI}>
                                            <td> {profesor.DNI} </td>
                                            <td> {profesor.Nombre} </td>
                                            <td> {profesor.Apellido} </td>
                                            <td> {profesor.Telefono} </td>
                                            <td> {(profesor.Estado ? "🟢" : "🔴")} </td>
                                            <td> {profesor.Rol} </td>
                                            <td> {profesor.Clave} </td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                    <button onClick={() => {eliminarProfesor(profesor.DNI)}} type="button" className="btn btn-danger"> Eliminar </button>
                                                    <button onClick={() => {editarProfesor(profesor)}} type="button" className="btn btn-success"> Actualizar </button>
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


export default ComponenteProfesores;
