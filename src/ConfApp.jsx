import {useEffect, useReducer} from 'react'
import {AuthContext} from './auth/authContext'
import {authReducer} from './auth/authReducer'
import { RootRouter } from "./routers/RootRouter"
import SplashScreen from './componentes/splash/SplashScreen'
import api from './services/api'
export const ConfApp = () => {
    const initAuthUser = () => {
        api.get('api/user',{withCredentials:true}).then(({data:user}) => {
            dispatch({type:'login',payload:user})
        }).catch(() => {
            dispatch({type:'not-auth'})
        })
    }

    useEffect(() => {
        initAuthUser()
    },[])

    const [authValue,dispatch] = useReducer(authReducer,{
        isLoading:true,
        user:{}
    })
    const login = async () => {
        const response = await api.get('api/user',{withCredentials:true})
        dispatch({type:'login',payload:response.data})
    }
    const logout = async () => {
        await api.post('logout',{},{withCredentials:true})
        dispatch({type:'logout'})
    }
    return(
        <AuthContext.Provider value={{
            authValue,
            login,
            logout,
        }}>
            {
                !authValue.isLoading ? 
                (
                    <RootRouter />
                ):(
                    <SplashScreen />
                )
            }
        </AuthContext.Provider>
    )
}