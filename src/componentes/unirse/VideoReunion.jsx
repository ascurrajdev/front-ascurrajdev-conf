import {useEffect, useRef} from 'react'
const VideoReunion = ({peerMedia,muted}) => {
    const videoMedia = useRef()
    useEffect(() => {
        videoMedia.current.srcObject = peerMedia
    },[])
    return(
        <div className="col">
            <video ref={videoMedia} autoPlay={true} muted={muted} className="bg-black w-100"></video>
        </div>
    )
}
export default VideoReunion 