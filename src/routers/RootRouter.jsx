import { BrowserRouter,Routes,Route } from "react-router-dom"
import {HomeRoutes} from './HomeRoutes'
import { LoginScreen } from "../componentes/login/LoginScreen"
import { UnirseReunionAuthScreen } from '../componentes/unirse/UnirseReunionAuthScreen'
import {RegisterScreen} from "../componentes/register/RegisterScreen"
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
export const RootRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                }/>
                <Route path="/register" element={
                    <PublicRoute>
                        <RegisterScreen />
                    </PublicRoute>
                }/>
                <Route path="/*" element={
                    <PrivateRoute>
                        <HomeRoutes/>
                    </PrivateRoute>
                }/> 
                <Route path="/unirse/:id" element={
                    <PrivateRoute>
                        <UnirseReunionAuthScreen/>
                    </PrivateRoute>
                }/> 
            </Routes>
        </BrowserRouter>
    )
}