import React , {createContext,useState,useEffect,useRef} from 'react';
import Peer from "simple-peer";
import {io} from "socket.io-client";

const SocketContext = createContext();
const socket = io('https://tieup-video-feature.herokuapp.com/');

const ContextProvider = ({children})=>{
   
    const [stream,setStream] = useState(null);
    const [me,setMe] = useState(' ');
    const [call,setCall] = useState({});
    const [callAccepted,setCallAccepted] = useState(false);
    const [callEnded,setCallEnded] = useState(false);
    const [name,setName]  = useState("");
    const [showVideo,setShowVideo] = useState(true);
    const [audio,setAudio] = useState(true);
    const myVideo= useRef(null);
    const userVideo= useRef(null);
    const connectionRef= useRef();
    const videoElem = useRef([]);
    const video = async()=>{
        await navigator.mediaDevices.getUserMedia({video:showVideo,audio:audio}).then((currentStream)=>{
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
        }).catch(error => {
            console.error('Error accessing media devices.', error);
        });
    }
    var l=0;
    var displayMediaOptions = {
        video: {
        cursor: "always"
        },
        audio: false
    };
    useEffect(()=>{
        var a = setInterval(()=>{
            console.log(myVideo,l)
            video();
            if(myVideo.current != null || l==10){
                clearInterval(a);
            }
            l++;
        },1000);
        socket.on('connect', () => {
            console.log(socket.id);
            setMe(socket?.id) // an alphanumeric id...
         });
         socket.on("me",(id)=>{debugger;setMe(id)});
         socket.on("callUser",({from,name:callerName,signal})=>{
             setCall({isReceivedCall:true,from,name:callerName,signal})
         })
    },[showVideo,audio])
    const startCapture = async()=>{
        debugger;
        try {
            videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            // dumpOptionsInfo();
        } catch(err) {
            console.error("Error: " + err);
        }
    }
    function stopCapture(evt) {
        let tracks = videoElem.srcObject.getTracks();
      
        tracks.forEach(track => track.stop());
        videoElem.srcObject = null;
      }
    const answerCall = ()=>{
        setCallAccepted(true);
        const peer = new Peer({initiator: false, stream,trickle:false});

        // Fired when the peer wants to send signaling data to the remote peer.
        peer.on('signal',(data)=>{
            socket.emit("answerCall",{signal:data,to:call.from})
        })
        // video stream received
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject = currentStream;

        });
        console.log(call)
        peer.signal(call.signal);
        connectionRef.current = peer;
    };
    const callUser = (id)=>{
        const peer = new Peer({initiator: true, stream,trickle:false});
        peer.on('signal',(data)=>{
            socket.emit("callUser",{userToCall:id,signal:data,from:me,name})
        })
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject = currentStream;

        });
        socket.on("callAccepted",(signal)=>{
            setCallAccepted(true);
            peer.signal(signal);
        })
        connectionRef.current = peer;
    };
    const leaveCall = ()=>{
        setCallEnded(true);
        connectionRef.current.destroy(); // user camera and video is off
        window.location.reload();
    };
    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            callEnded,
            me,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callUser,
            leaveCall,
            answerCall,
            video,
            showVideo,
            setShowVideo,
            setAudio,
            audio,
            startCapture,
            stopCapture,
            videoElem
        }}>
            {children}
        </SocketContext.Provider>
    )
}
export {ContextProvider,SocketContext}; 