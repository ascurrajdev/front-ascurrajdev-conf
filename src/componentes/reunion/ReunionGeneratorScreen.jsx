import {useState,useEffect,useRef} from 'react'
import {Rings} from 'react-loader-spinner'
import restReunioneGenerate from '../../services/restReunionGenerate'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export const ReunionGeneratorScreen = () => {
    const [show,setShow] = useState(false)
    const [reunion,setReunion] = useState({id:""})
    const textInfoInvitacion = useRef()
    const copyToClipboard = () => {
        navigator.clipboard.writeText(textInfoInvitacion.current.innerText)
        alert("Copiado correctamente")
    }
    useEffect(() => {
        (async () => {
            setReunion(await restReunioneGenerate())
            setShow(p => !p)
        })()
    },[])    
    return(
        <div className="d-flex flex-column pt-5 justify-content-center align-items-center  align-content-center">
            {
                !show ? (
                    <>
                        <h1>Generando Reunion</h1>
                        <Rings wrapperClassName="align-self-center" color="#047BC4" radius={15} width={150} height={150}/>
                    </>
                ) : (
                    <>
                        <label ref={textInfoInvitacion}>El link de la reunion es: <a href={`${process.env.REACT_APP_URL}/unirse/${reunion.id}`}>{process.env.REACT_APP_URL}/unirse/{reunion.id}</a></label>
                        <p>Copie ese link en el navegador para unirse</p>
                        <button type="button" className="btn btn-primary" onClick={copyToClipboard}>Invitar a la reunion</button>
                    </>
                )
            }
        </div>
    )
}