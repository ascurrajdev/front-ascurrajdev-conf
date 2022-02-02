import { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from '../../auth/authContext'
export const Navbar = () => {
    const {logout} = useContext(AuthContext)
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <p className="navbar-brand">@ascurrajdev-conf</p>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className={({isActive}) => "nav-link " + (isActive ? "active" : "")} to="/">Inicio</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => "nav-link " + (isActive ? "active" : "")} to="/reunion">Reuniones</NavLink>
                    </li>
                </ul>
                <ul className="d-flex">
                    <button onClick={logout} className="btn btn-primary">Cerrar Sesion</button>
                </ul>
                </div>
            </div>
        </nav>
    )
}