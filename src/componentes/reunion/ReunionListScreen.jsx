import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Rings} from 'react-loader-spinner'
import api from "../../services/api"
export const ReunionListScreen = () => {
    const [reuniones,setReuniones] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        api.get("api/reuniones/unirse",{withCredentials:true}).then((response) => {
            return response.data.data
        }).then((reuniones) => {
            setIsLoading(isLoading => !isLoading)
            setReuniones(reuniones)
        })
    },[])    
    const unirseReunionRedirect = (id) => {
        navigate(`/unirse/${id}`)       
    }
    return(
        <div>
            {
                isLoading 
                ? (
                    <Rings wrapperClass="justify-content-center my-5" color="#047BC4" radius={15} width={150} height={150}/>
                )
                :(
                    reuniones.length > 0 ? (
                        <ul className="list-group">
                            {
                                reuniones.map(({reunion_id}) => (
                                    <li className="list-group-item" key={reunion_id}><h4 className="badge bg-light text-dark py-2">{reunion_id}</h4> <button className="btn btn-primary" onClick={() => unirseReunionRedirect(reunion_id)}>Volver a unirse</button></li>
                                ))
                            }
                        </ul>
                    ):(
                        <h1 className="text-center mt-5">No tienes reuniones generadas</h1>
                    )
                )
            }
        </div>
    )
}