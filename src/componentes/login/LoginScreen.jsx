import { useContext,useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import useForm from '../../hooks/useForm';
import {AuthContext} from '../../auth/authContext'
import restLoginApi from '../../services/restLoginApi'

export const LoginScreen = () => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const {login} = useContext(AuthContext)
    const {form,onChange} = useForm({email:'',password:''})
    const {email,password} = form
    const submitFormLogin = (e) => {
        e.preventDefault()
        setLoading(!loading)
        restLoginApi(form).then((response) => {
            login()
            navigate("/",{replace:true})
        }).catch((e) => {
            console.log(e.data)
        })
    }
    return(
        <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <form onSubmit={submitFormLogin}>
                    <div className="card-body d-grid">
                        <div className="form-group">
                            <label className="form-label">Email:</label>
                            <input type="email" name="email" onChange={onChange} value={email} className="form-control" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password:</label>
                            <input type="password" name="password" onChange={onChange} value={password} className="form-control" placeholder="Password"/>
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