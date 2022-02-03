import { useContext,useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import useForm from '../../hooks/useForm';
import {AuthContext} from '../../auth/authContext'
import api from '../../services/api'

export const LoginScreen = () => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const {login} = useContext(AuthContext)
    const [errors,setErrors] = useState([])
    const {form,onChange} = useForm({email:'',password:''})
    const {email,password} = form
    const submitFormLogin = (e) => {
        e.preventDefault()
        setLoading(loading => !loading)
        api.get("sanctum/csrf-cookie",{withCredentials:true}).then(() => {
            api.post("login",form,{withCredentials:true}).then((response) => {
                login().then(() => {
                    navigate("/",{replace:true})
                })
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
            <div className="card col-lg-6">
                <form onSubmit={submitFormLogin}>
                    <div className="card-body d-grid">
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
                        <button className="mt-3 btn btn-primary btn-lg" type="submit">{ !loading ? 'Entrar' : <Oval color="#FFFFFF" strokeWidth={10} wrapperClass="justify-content-center" width={25} height={25}/>}</button>
                        <hr/>
                        <Link to="/register">¿No tienes una cuenta? Registrate</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}