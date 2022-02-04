import {useEffect, useRef,useState,useContext} from 'react'
import {Modal,ModalBody,ModalHeader} from 'reactstrap'
import { useParams,useNavigate } from 'react-router'
import {ReunionContext} from '../../reunionauth/reunionContext'
import {Rings} from 'react-loader-spinner'
import api from '../../services/api'
export const UnirseReunionScreen = () => {
    const videoRef = useRef()
    const {id:reunionId} = useParams()
    const navigate = useNavigate()
    const [devicesAvailable,setDevicesAvailable] = useState({
        audio:false,
        video:false,
        loaded:false,
        ready:false
    })

    const [myMediaStream,setMyMediaStream] = useState(null)
    const [accept,setAccept] = useState(false)
    const [back,setBack] = useState(false)
    const {setUserMedia,acceptHost} = useContext(ReunionContext)
    const [permissionAudio,setPermissionAudio] = useState(false)

    useEffect(() => {
        if(accept){
            acceptHost()
        }
    },[accept])

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devicesInfo) => {
            let devicesConstraint = {
                audio: devicesInfo.some((dev) => dev.kind === 'audioinput'),
                video: devicesInfo.some((dev) => dev.kind === 'videoinput'),
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

    useEffect(() => {
        if(back){
            navigate(-1)
        }
    },[back])
    
    const handleUnirseClick = () => {
        api.post("api/reuniones/unirse",{reunion_id:reunionId},{withCredentials:true})
        setMyMediaStream(
            myMediaStream.getTracks().forEach((track) => track.stop())
        )
        setAccept(true)
    }
    const handleVolverAtras = () => {
        setMyMediaStream(
            myMediaStream.getTracks().forEach((track) => track.stop())
        )
        setBack(true)
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
                        <button onClick={handleUnirseClick} className="btn btn-outline-primary" disabled={!devicesAvailable.ready}>Unirse <i className="zmdi zmdi-arrow-right-top"></i></button>
                        <button onClick={handleVolverAtras} className="btn btn-outline-secondary">Volver <i className="zmdi zmdi-undo"></i></button>
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