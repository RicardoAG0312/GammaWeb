import "../estilos/login.css";
import Swal from 'sweetalert2';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App'; 

function ComponenteLogin() {   
    const [rol, setRol] = useState("");
    const [clave, setClave] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const fetchCredenciales = async () => {
        try {
            const apiURLADMIN = await fetch("http://localhost:3000/usuario");
            const apiURLPROFESOR = await fetch("http://localhost:3000/logprof");
            if (!apiURLADMIN.ok && apiURLPROFESOR) {
                console.log("NO SE ENCONTRÓ LA API USUARIO");
            }
            const dataUsuarioAdmin = await apiURLADMIN.json();
            const rolAdmin = "admin";
            const dataUsuarioProfesor = await apiURLPROFESOR.json();
            const rolProfesor = "profesor";
            const usuarioEncontradoAdmin = dataUsuarioAdmin.find(usuario =>  usuario.Rol.toLowerCase() === rol.toLowerCase() && usuario.Clave === clave);
            const usuarioEncontradoProfesor = dataUsuarioProfesor.find(usuario => usuario.Rol.toLowerCase() === rol.toLowerCase() && usuario.Clave === clave);
            if (usuarioEncontradoAdmin && usuarioEncontradoAdmin.Rol.toLowerCase() === rolAdmin) {
                Swal.fire({
                    title: '¡Bienvenido al panel de administradores!',
                    text: '¡Credenciales Correctas!',
                    icon: 'success',
                });
                auth.iniciarSesion(usuarioEncontradoAdmin);
                navigate('/panel/listaalumnos');
            } else if (usuarioEncontradoProfesor && usuarioEncontradoProfesor.Rol.toLowerCase() === rolProfesor) {
                Swal.fire({
                    title: '¡Bienvenido al panel de profesores!',
                    text: '¡Credenciales Correctas!',
                    icon: 'success',
                });
                auth.iniciarSesion(usuarioEncontradoProfesor);
                navigate('/panel/listanotas');
            } else {
                Swal.fire({
                    title: '¡Error!',
                    text: '¡Credenciales Incorrectas!',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="container login loginAdmin">
                <div className="login-form">
                    <p> Ingresa tu usuario y contraseña </p>
                    <img src={require("../recursos/insignia.jpg")} alt="Logo" />
                    <form method="POST">
                        <input  type="text" name="rol" value={rol} onChange={(e) => setRol(e.target.value)} placeholder="Ingresa tu rol:" required={true} id="rol" />
                        <input  type="password" value={clave} onChange={(e) => setClave(e.target.value)} name="password" placeholder="Ingresa tu password:" required={true} id="password" /> 
                        <input type="button" value="Ingresar" onClick={fetchCredenciales}/>
                    </form>
                </div>
            </section>
        </>
    )
}

export default ComponenteLogin;



