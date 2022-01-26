import {Routes,Route} from 'react-router-dom'
import {Navbar} from '../componentes/ui/Navbar'
import {HomeScreen } from '../componentes/home/HomeScreen.jsx'
import { ReunionListScreen } from '../componentes/reunion/ReunionListScreen'
import { ReunionGeneratorScreen } from '../componentes/reunion/ReunionGeneratorScreen'
export const HomeRoutes = () => {
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomeScreen />}/>
                <Route path="/inicio" element={<HomeScreen />}/>
                <Route path="/reunion" element={<ReunionListScreen />}/>
                <Route path="/reunion/nuevo" element={<ReunionGeneratorScreen/>}/>
            </Routes>
        </>
    )
}