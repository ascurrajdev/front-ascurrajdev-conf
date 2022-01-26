import {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {AuthContext} from '../auth/authContext'
const PublicRoute = ({children}) => {
    const {authValue} = useContext(AuthContext)
    return !authValue.logged ? (
        children
    ):(
        <Navigate to="/" />
    )
}
export default PublicRoute