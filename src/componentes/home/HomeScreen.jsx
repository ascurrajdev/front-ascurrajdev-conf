import { NavLink } from "react-router-dom"
export const HomeScreen = () => {
    return(
        <div className="text-center pt-5">
            <div className="absolute position-absolute top-50 start-50 translate-middle">
            <div className="dropdown">
                <button className="btn btn-primary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Iniciar una reunion
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><NavLink className="dropdown-item" to="/reunion/nuevo">Iniciar una reunion ahora</NavLink></li>
                    <li><a className="dropdown-item" href="#">Iniciar una reunion mas tarde</a></li>
                </ul>
            </div>
            </div>
        </div>
    )
}