// Importaciones de bibliotecas
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Importaciones de estilos
import './App.css';
// Importaciones de imágenes
import LogoGamma from './recursos/insignia.jpg';
// Importaciones Componentes
import { ComponenteNotas, ComponentePanel, ComponenteContacto, ComponenteInicio, ComponenteLogin, ComponenteLogros, ComponenteNosotros} from "./componentes"

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar expand="md" id="navbar">
                    <Navbar.Brand href="/inicio">
                        <img className="h-100" src={LogoGamma} alt="Logo Gamma" />
                    </Navbar.Brand>
                    <div className="titulo">
                        COLEGIO GAMMA
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="barra-nav">
                            <Nav.Link as={Link} to="/inicio"> Inicio </Nav.Link>
                            <Nav.Link as={Link} to="/nosotros"> Nosotros </Nav.Link>
                            <Nav.Link as={Link} to="/logros"> Logros </Nav.Link>
                            <Nav.Link as={Link} to="/contacto" > Contáctanos </Nav.Link>
                            <Nav.Link as={Link} to="/notas" > Notas </Nav.Link>
                            <Nav.Link as={Link} to="/login" id="login"> Login </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes>
                    <Route index path='/gamma' element={<Navigate to="/inicio" />}/>
                    <Route path='/inicio' element={<ComponenteInicio />}/>
                    <Route path='/nosotros' element={<ComponenteNosotros />}/>
                    <Route path='/logros' element={<ComponenteLogros />}/>
                    <Route path='/contacto' element={<ComponenteContacto />}/>
                    <Route path='/login'element={<ComponenteLogin />}/>
                    <Route path="/notas" element={<ComponenteNotas />} />
                    <Route path="/panel" element={<ComponentePanel />} />
                </Routes>
            </Router>
            <footer className="container-fluid seccion-pie">
                    <div>
                        <h1> Dirección: </h1>
                        <h3> Av. San Jose Mz A Lote 07 Ciudad de Dios </h3>
                        <i className="bi bi-geo-alt"></i>
                    </div>
                    <div>
                        <h1> Horario de atención: </h1>
                        <h3> 08:00 AM - 14:00 PM
                            Lunes a Viernes
                        </h3>
                        <i className="bi bi-alarm"></i>
                    </div>
                    <div>
                        <h1> Contáctanos: </h1>
                        <h3>
                            944466270 - 
                            945638072 -
                            920099946 -
                            972845212
                        </h3>
                        <i className="bi bi-telephone"></i>
                    </div>
                    <div>
                        <a href="https://web.facebook.com/profile.php?id=100068499776500&locale=es_LA" target="_blank" rel='noreferrer'>
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://wa.me/944466270" target="_blank" rel='noreferrer'>
                            <i className="bi bi-whatsapp"></i>
                        </a>
                        <a href="https://www.instagram.com/colegiogamma?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel='noreferrer'>
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="mailto: colegiopreugamma@gmail.com" target="_blank" rel='noreferrer'>
                            <i className="bi bi-envelope"></i>
                        </a>
                    </div>
                    <div className="derechos-de-autor">
                        Colegio Gamma (2024) &#169;
                    </div>
            </footer>
        </div>
    );
}

export default App;
