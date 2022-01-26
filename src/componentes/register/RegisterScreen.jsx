import {useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Oval} from 'react-loader-spinner'
import restRegisterApi from '../../services/restRegisterApi'
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
    const {name,email,password,password_confirmation} = form
    const submitRegister = (e) => {
        e.preventDefault()
        restRegisterApi(form).then(() => {
            login()
            navigate("/")
        }).catch((e) => {
            console.log(e)
        })
    }
    return(
        <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <form onSubmit={submitRegister}>
                    <div className="card-body d-grid">
                        <div className="form-group">
                            <label className="form-label">Name:</label>
                            <input type="text" name="name" onChange={onChange} value={name} className="form-control" placeholder="Name"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email:</label>
                            <input type="email" name="email" onChange={onChange} value={email} className="form-control" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password:</label>
                            <input type="password" name="password" onChange={onChange} value={password} className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm Password:</label>
                            <input type="password" name="password_confirmation" onChange={onChange} value={password_confirmation} className="form-control" placeholder="Confirm Password"/>
                        </div>
                        <button className="mt-3 btn btn-primary btn-lg" type="submit"><Oval color="#FFFFFF" strokeWidth={10} wrapperClass="justify-content-center" width={25} height={25}/></button>
                        <hr/>
                        <Link to="/login">¿Tienes una cuenta? Iniciar sesion</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}