import {useNavigate} from 'react-router-dom'
export default function ReunionDesconectado(){
    const navigate = useNavigate()
    const goToBackReunion = () => {
        navigate(-1)
    }
    const goToHome = () => {
        navigate("/",{replace:true})
    }
    return(
        <div className="d-flex flex-column align-items-center mt-5">
            <h1>Usted a abandonado la reunion</h1>
            <div className="d-flex gap-2">
                <button onClick={goToBackReunion} className="btn btn-outline-primary">Volver a la reunion <i className="zmdi zmdi-arrow-right-top"></i></button>
                <button onClick={goToHome} className="btn btn-outline-secondary">Ir al inicio <i className="zmdi zmdi-home"></i></button>
            </div>
        </div>
    )
}