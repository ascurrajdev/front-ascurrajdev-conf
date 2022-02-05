import {useEffect, useRef} from 'react'
const VideoReunion = ({peerMedia,muted}) => {
    const videoMedia = useRef()
    useEffect(() => {
        videoMedia.current.srcObject = peerMedia
    },[])
    return(
        <div className="col">
            <video ref={videoMedia} playsinline controls={false} autoPlay={true} muted={muted} className="bg-black w-100" />
        </div>
    )
}
export default VideoReunion 