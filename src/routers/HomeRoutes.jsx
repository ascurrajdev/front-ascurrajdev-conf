import {Routes,Route} from 'react-router-dom'
import {Navbar} from '../componentes/ui/Navbar'
import {HomeScreen } from '../componentes/home/HomeScreen.jsx'
import { ReunionListScreen } from '../componentes/reunion/ReunionListScreen'
import { ReunionGeneratorScreen } from '../componentes/reunion/ReunionGeneratorScreen'
import ReunionDesconectado from '../componentes/reunion/ReunionDesconectado'
export const HomeRoutes = () => {
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomeScreen />}/>
                <Route path="/inicio" element={<HomeScreen />}/>
                <Route path="/reunion" element={<ReunionListScreen />}/>
                <Route path="/reunion/nuevo" element={<ReunionGeneratorScreen/>}/>
                <Route path="/reunion/desconectado" element={<ReunionDesconectado />} />
            </Routes>
        </>
    )
}