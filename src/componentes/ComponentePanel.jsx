import React, { useEffect, useState } from 'react'
import "../estilos/panel.css"

function ComponentePanel () {
    const [alumnos, setAlumnos] = useState([]);
    useEffect(() => {
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
        fetchListaAlumnos();
    }, [])
    console.log(alumnos);
    return (
        <div className='container'>
            <section className='contenedorAlumnosTabla'>
                <h3> Lista Alumnos: </h3>
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
                                            <button type="button" className="btn btn-danger"> Eliminar </button>
                                            <button type="button" className="btn btn-success"> Actualizar </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default ComponentePanel;


