import {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {AuthContext} from '../auth/authContext'
const PublicRoute = ({children}) => {
    const {authValue} = useContext(AuthContext)
    let pathName = localStorage.getItem("@ascurrajdev-conf/last-pathName") || "/"
    return !authValue.logged ? (
        children
    ):(
        <Navigate to={pathName} />
    )
}
export default PublicRoute