import { Oval } from 'react-loader-spinner'
const SplashScreen = () => {
    return (
        <div className="d-flex flex-column justify-content-center vh-100 align-items-center">
            <h1>@ascurrajdev</h1><br/>
            <Oval color="#047BC4" radius={15} width={60} height={60}/>
        </div>
    )
}
export default SplashScreen