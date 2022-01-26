import Peer from "peerjs"
import { useEffect,useContext,useRef,useState } from "react"
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
            key: 'eaec0efbd968f46ba3f8',
            wsHost:'localhost',
            cluster:'us2',
            wsPort: 6001,
            forceTLS: false,
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
                    console.log(call)
                    call.answer(stream)
                    call.on('stream',(remoteStream) => {
                        setPeerMediaStremConnected((peersMedia) => ([
                            ...peersMedia,
                            {
                                user:call.metadata,
                                mediaStream:remoteStream
                            }
                        ]))
                    })
                })
                echo.join(`reunion.${reunionId}`)
                .here((users) => {
                    console.log(users)
                })
                .joining((user) => {
                    const call = peer.call(user.id,stream,{metadata: authValue.user})
                    call.on('stream', (remoteStream) => {
                        setPeerMediaStremConnected((peersMedia) => ([
                            ...peersMedia,
                            {
                                user,
                                mediaStream:remoteStream
                            },
                        ]))
                    });
                })
                .leaving((user) => {
                    setPeerMediaStremConnected((peersMedia) =>{
                        return peersMedia.filter((peerMedia) => {
                            return peerMedia.user.id != user.id
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