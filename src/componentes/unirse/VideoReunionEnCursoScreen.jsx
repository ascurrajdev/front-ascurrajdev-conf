import Peer from "peerjs"
import { useEffect,useContext,useState } from "react"
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { AuthContext } from "../../auth/authContext"
import api from '../../services/api'
import VideoReunion from "./VideoReunion"
import {useParams} from 'react-router-dom'
import {ReunionContext} from '../../reunionauth/reunionContext'
import VideoReunionControls from "./VideoReunionControls"

export const VideoReunionEnCursoScreen = () => {
    const [peer,setPeer] = useState(null)
    const [echo,setEcho] = useState(null)
    const [myMediaStream,setMyMediaStream] = useState(null)
    const {reunionAuthValue} = useContext(ReunionContext)
    const {authValue} = useContext(AuthContext)
    const {id:reunionId} = useParams()
    const [peersMediaStreamConnected,setPeerMediaStremConnected] = useState([])
    
    useEffect(() => {
        setPeer(new Peer(authValue.user.id))
        setEcho(new Echo({
            broadcaster: 'pusher',
            key: process.env.REACT_APP_WS_KEY,
            wsHost: process.env.REACT_APP_WS_HOST,
            cluster: process.env.REACT_APP_WS_CLUSTER,
            wsPort: process.env.REACT_APP_WS_PORT,
            encrypted: process.env.REACT_APP_WS_ENCRYPTED,
            disableStats: true,
            authorizer: (channel, options) => {
                return {
                    authorize: (socketId, callback) => {
                        api.post('api/broadcasting/auth', {
                            socket_id: socketId,
                            channel_name: channel.name
                        },{withCredentials:true})
                        .then(response => {
                            callback(false, response.data);
                        })
                        .catch(error => {
                            callback(true, error);
                        });
                    }
                };
            },
        }))
    },[])
    useEffect(() => {
        if(peer !== null){
            navigator.mediaDevices.getUserMedia(reunionAuthValue.userMedia).then((stream) => {
                setMyMediaStream(stream)
                peer.on('call',(call) => {
                    call.answer(stream)
                    call.on('stream',(remoteStream) => {
                        setPeerMediaStremConnected([
                            ...peersMediaStreamConnected,
                            {
                                user:call.metadata,
                                mediaStream:remoteStream
                            }
                        ])
                    })
                })
                echo.join(`reunion.${reunionId}`)
                .joining((user) => {
                    const call = peer.call(user.id,stream,{metadata: authValue.user})
                    call.on('stream', (remoteStream) => {
                        setPeerMediaStremConnected([
                            ...peersMediaStreamConnected,
                            {
                                user,
                                mediaStream:remoteStream
                            },
                        ])
                    });
                })
                .leaving((user) => {
                    setPeerMediaStremConnected((peersMedia) =>{
                        return peersMedia.filter((peerMedia) => {
                            return peerMedia.user.id !== user.id
                        })
                    })
                })
            }).catch((e) => {
                console.log(e)
            })
        }
    },[peer])

    return (
        <div className="container">
            <div className="row my-auto justify-content-center align-items-center">
                {
                    myMediaStream && <VideoReunion muted={true} peerMedia={myMediaStream}/>
                }
                {
                    peersMediaStreamConnected.map(({mediaStream}) => (
                        <VideoReunion peerMedia={mediaStream} key={mediaStream.id}/>
                    ))
                }
            </div>
            <VideoReunionControls echo={echo} peer={peer} mediaStream={myMediaStream} setMediaStream={setMyMediaStream}/>
        </div>
    )
}