import {useContext,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Oval} from 'react-loader-spinner'
import api from '../../services/api'
import useForm from '../../hooks/useForm'
import { AuthContext } from '../../auth/authContext'
export const RegisterScreen = () => {
    const navigate = useNavigate()
    const {form,onChange} = useForm({
        name:"",
        email:"",
        password:"",
        password_confirmation:""
    })
    const {login} = useContext(AuthContext)
    const [errors,setErrors] = useState([])
    const [loading,setLoading] = useState(false)
    const {name,email,password,password_confirmation} = form
    const submitRegister = (e) => {
        setLoading(loading => !loading)
        e.preventDefault()
        api.get("sanctum/csrf-cookie",{withCredentials:true}).then(() => {
            api.post("register",form,{withCredentials:true}).then(() => {
                login()
                setLoading(loading => !loading)
                navigate("/")
            }).catch(({response}) => {
                setLoading(loading => !loading)
                if(response.data.errors){
                    setErrors(response.data.errors)
                }
            })
        })
    }
    return(
        <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <form onSubmit={submitRegister}>
                    <div className="card-body d-grid">
                        <div className="form-group">
                            <label className="form-label">Name:</label>
                            <input type="text" name="name" onChange={onChange} value={name} className={"form-control " + (errors.hasOwnProperty('name') && "is-invalid")} placeholder="Name"/>
                            <span className="invalid-feedback">{errors.hasOwnProperty('name') && errors.name[0]}</span>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email:</label>
                            <input type="email" name="email" onChange={onChange} value={email} className={"form-control " + (errors.hasOwnProperty('email') && "is-invalid")} placeholder="Email"/>
                            <span className="invalid-feedback">{errors.hasOwnProperty('email') && errors.email[0]}</span>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password:</label>
                            <input type="password" name="password" onChange={onChange} value={password} className={"form-control " + (errors.hasOwnProperty('password') && "is-invalid")} placeholder="Password"/>
                            <span className="invalid-feedback">{errors.hasOwnProperty('password') && errors.password[0]}</span>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm Password:</label>
                            <input type="password" name="password_confirmation" onChange={onChange} value={password_confirmation} className="form-control" placeholder="Confirm Password"/>
                        </div>
                        <button className="mt-3 btn btn-primary btn-lg" type="submit">{ !loading ? 'Entrar' : <Oval color="#FFFFFF" strokeWidth={10} wrapperClass="justify-content-center" width={25} height={25}/>}</button>
                        <hr/>
                        <Link to="/login">¿Tienes una cuenta? Iniciar sesion</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}