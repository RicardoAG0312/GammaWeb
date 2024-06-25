import "../estilos/login.css";
import Swal from 'sweetalert2';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ComponenteLogin() {   
    const [rol, setRol] = useState("");
    const [clave, setClave] = useState("");
    const navigate = useNavigate();

    const fetchCredenciales = async () => {
        try {
            const apiURL = await fetch("http://localhost:3000/usuario");
            if (!apiURL.ok) {
                console.log("NO SE ENCONTRÓ LA API USUARIO");
            }
            const dataUsuario = await apiURL.json();
            const usuarioEncontrado = dataUsuario.find(usuario => usuario.Rol === rol && usuario.Clave === clave);
            if (usuarioEncontrado) {
                Swal.fire({
                    title: '¡Bienvenido!',
                    text: '¡Credenciales Correctas!',
                    icon: 'success',
                });
                navigate('/panel');
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



