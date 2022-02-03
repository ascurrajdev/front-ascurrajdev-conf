import {useContext} from 'react'
import {Navigate,useLocation} from 'react-router-dom'
import {AuthContext} from '../auth/authContext'
const PrivateRoute = ({children}) => {
    console.log("Private Route")
    const {authValue} = useContext(AuthContext)
    const {pathname} = useLocation()
    localStorage.setItem("@ascurrajdev-conf/last-pathName",pathname)
    return authValue.logged ? (
        children
    ):(
        <Navigate to="/login" />
    )
}
export default PrivateRoute;