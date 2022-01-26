import {useNavigate,useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
export default function VideoReunionControls({peer,mediaStream,setMediaStream,echo}){
    const {id:reunionId} = useParams()
    const navigate = useNavigate()
    const [mediaConstraints,setMediaConstraints] = useState({audio:false,video:false})
    const {audio,video} = mediaConstraints
    useEffect(() => {
        if(mediaStream !== null){
            setMediaConstraints({
                audio: (mediaStream.getAudioTracks().length > 0) && mediaStream.getAudioTracks()[0].enabled,
                video: (mediaStream.getVideoTracks().length > 0) && mediaStream.getVideoTracks()[0].enabled
            })
        }
    },[mediaStream])
    const disconnectOfVideoReunion = () => {
        peer.disconnect()
        echo.leave(`reunion.${reunionId}`)
        setMediaStream((mediaStream) => {
            mediaStream.getTracks().forEach((track) => track.stop())
            return mediaStream
        })
        mediaStream.addEventListener("inactive",() => {
            navigate("/")
        })

    }
    const changeStateAudio = () => {
        if(mediaStream.getAudioTracks().length > 0){
            setMediaConstraints({
                ...mediaConstraints,
                audio : mediaStream.getAudioTracks()[0].enabled = !audio,
            })
        }
    }
    const changeStateVideo = () => {
        if(mediaStream.getVideoTracks().length > 0){
            setMediaConstraints({
                ...mediaConstraints,
                video : mediaStream.getVideoTracks()[0].enabled = !video,
            })
        }
    }

    return (
        <div className="fixed-bottom d-flex justify-content-center py-3 gap-3 bg-light">
            <button onClick={changeStateVideo} className={'btn btn-lg rounded-circle ' + (video ? 'btn-outline-dark' : 'btn-danger')}> {video ? <i className="zmdi zmdi-videocam"></i> : <i className="zmdi zmdi-videocam-off"></i>}</button>
            <button onClick={changeStateAudio} className={'btn btn-lg rounded-circle ' + (audio ? 'btn-outline-dark' : 'btn-danger')}> {audio ? <i className="zmdi zmdi-mic-outline"></i> : <i className="zmdi zmdi-mic-off"></i>} </button>
            <button className="btn btn-danger rounded-circle btn-lg" onClick={disconnectOfVideoReunion}><i className="zmdi zmdi-phone-end"></i></button>
        </div>
    )
}