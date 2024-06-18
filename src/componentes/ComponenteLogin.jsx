import { React, useEffect } from "react";
import "../estilos/login.css";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

function ComponenteLogin() {
    useEffect(() => {
        let botonEnviarDatos = document.getElementById("submit");
        let botones = document.querySelectorAll(".login button");
        botonEnviarDatos.addEventListener("click", () => {
            let validacionDNI = document.getElementById("dni").value;
            if (validacionDNI.length !== 8) {
                Swal.fire({
                    title: "DNI Incorrecto",
                    text: "Ingresa un DNI correcto.",
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: "DNI Correcto",
                    text: "Verifique la asistencia o cursos de su menor.",
                    icon: "success"
                });
                botones.forEach((boton) => {
                    boton.style.display = "inline-block";
                })
            }
        });
    }, [])
    return (
        <section className="container login">
            <div className="login-form">
                <h2> Ingresa el DNI del alumno: </h2>
                <img src={require("../recursos/insignia.jpg")} alt="Logo" />
                <form action="./login.html" method="POST">
                    <input type="number" name="dni" placeholder="DNI del Alumno:" required="true" id="dni" />
                    <input type="button" value="Buscar" id="submit" />
                </form>
            </div>
            <div>
                <button> <Link to="/asistencia"> Asistencia </Link> </button>
                <button> <Link to="/cursos"> Cursos </Link> </button>
            </div>
        </section>
    )
}

export default ComponenteLogin;