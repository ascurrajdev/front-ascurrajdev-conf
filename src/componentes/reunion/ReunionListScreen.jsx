import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Rings} from 'react-loader-spinner'
import restReunionesList from "../../services/restReunionesList"
export const ReunionListScreen = () => {
    const [reuniones,setReuniones] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        restReunionesList().then((reuniones) => {
            setIsLoading(!isLoading)
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
                    <ul className="list-group">
                        {
                            reuniones.map(({id}) => (
                                <li className="list-group-item" key={id}><h4 className="badge bg-light text-dark py-2">{id}</h4> <button className="btn btn-primary" onClick={() => unirseReunionRedirect(id)}>Unirse</button></li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}