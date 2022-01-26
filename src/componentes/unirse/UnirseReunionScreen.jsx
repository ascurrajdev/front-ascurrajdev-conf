import {useEffect, useRef,useState,useContext} from 'react'
import {Modal,ModalBody,ModalHeader} from 'reactstrap'
import {ReunionContext} from '../../reunionauth/reunionContext'
import {Rings} from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
export const UnirseReunionScreen = () => {
    const navigate = useNavigate()
    const videoRef = useRef()
    const [devicesAvailable,setDevicesAvailable] = useState({
        audio:false,
        video:false,
        loaded:false,
        ready:false
    })

    const [myMediaStream,setMyMediaStream] = useState(null)
    const {setUserMedia,acceptHost} = useContext(ReunionContext)
    const [permissionAudio,setPermissionAudio] = useState(false)

    useEffect(() => {
        return () => {

        }
    },[])

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devicesInfo) => {
            let devicesConstraint = {
                audio: devicesInfo.some((dev) => dev.kind === 'audioinput'),
                video: devicesInfo.some((dev) => dev.kind === 'videoinput'),
            }
            if(devicesConstraint.audio){
                navigator.permissions.query({name:"microphone"}).then((res) => setPermissionAudio(res.state !== 'granted'))
            }
            setUserMedia(devicesConstraint)
            setDevicesAvailable({
                ...devicesConstraint,
                loaded:true,
                ready:false
            })
            navigator.mediaDevices.getUserMedia(devicesConstraint).then((stream) => {
                setMyMediaStream(stream)
                setDevicesAvailable((state) => ({...state,ready:true}))
                videoRef.current.srcObject = stream
            }).catch((e) => {
                console.log(e)
            })
        }).catch((e) => {
            console.log(e)
        })
    },[])
    
    const handleUnirseClick = () => {
        setMyMediaStream((mediaStream) => {
            mediaStream.getTracks().forEach((track) => track.stop())
            return mediaStream
        })
        myMediaStream.addEventListener('inactive',() => acceptHost())
    }
    return (
        <div className="row container">
            <div className="col-lg-7">
                <video ref={videoRef} autoPlay={true} muted={true} className="bg-black rounded w-100"></video>
                <div className="d-flex gap-2 justify-content-center">
                {devicesAvailable.loaded ? (
                    <>
                        <button className={'btn rounded-circle btn-lg ' + (devicesAvailable.video ? "btn-outline-dark" : "btn-danger") }>{ devicesAvailable.video ? <i className="zmdi zmdi-videocam"></i> : <i className="zmdi zmdi-videocam-off"></i>}</button>
                        <button className={'btn rounded-circle btn-lg ' + (devicesAvailable.audio ? "btn-outline-dark" : "btn-danger") }><i className="zmdi zmdi-mic-outline"></i></button>
                        <button onClick={handleUnirseClick} className="btn btn-primary" disabled={!devicesAvailable.ready}>Unirse</button>
                    </>
                ) : (
                    <Rings color="#047BC4" radius={15} width={100} height={100}/>
                    )}
                </div>
                <Modal
                    isOpen={permissionAudio}    
                    toggle={() => setPermissionAudio(!permissionAudio)}
                    >
                    <ModalHeader toggle={() => setPermissionAudio(!permissionAudio)}>
                        Permiso denegado
                    </ModalHeader>
                    <ModalBody>
                        Tienes que activar el acceso al microfono para poder unirse a la reunion
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}