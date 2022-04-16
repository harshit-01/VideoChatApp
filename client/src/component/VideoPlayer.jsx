import React,{useContext,useEffect} from "react";
import {SocketContext} from "../SocketContext";
import Skeleton from '@material-ui/lab/Skeleton';
import './common.css'
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import Tooltip from '@material-ui/core/Tooltip';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles(theme => ({
    root: {
      width: "250px",
      height:"200px",
      [theme.breakpoints.up('md')]: {
        width: '400px',
        height:"200px"
      },
    },
  }));

export default function VideoPlayer(){
    const {name,myVideo,callAccepted,callEnded,stream,call,userVideo,video,showVideo,setShowVideo,audio,setAudio} = useContext(SocketContext);
    const classes = useStyles();
    return (
        <div className="container">
            {/* My Video */}
            <div>
            {stream && showVideo? 
                <div className="my_video_container">
                    <div className="my_video">
                        <h3>{name || "User1"}</h3>
                        <video playsInline ref={myVideo} muted autoPlay></video>
                    </div>
                </div>
                :
                <div style={{display:"flex",flexDirection:"column",marginBottom:"10px"}}>
                    <h3>Video</h3>
                    <Skeleton variant="rect"  className={classes.root}></Skeleton>
                </div>
            }
                <div className="camera_controls">
                    <Tooltip title={showVideo ? "Turn Off camera":"Turn On Camera"} placement="top" arrow>
                        <button onClick={()=>setShowVideo(!showVideo)} variant="outlined" 
                        color="primary" className="btn_show_video">
                            {!showVideo ? 
                            <>
                                <VideocamOffIcon fontSize ="large"/>
                            </>
                            : 
                            <>
                                <VideocamIcon fontSize ="large"></VideocamIcon>
                            </>}
                        </button>
                    </Tooltip>
                    <Tooltip title={audio ? "Mute":"Unmute"} placement="top" arrow>
                        <button onClick={()=>setAudio(!audio)} variant="outlined" 
                         className="btn_audio">
                            {!audio ? 
                            <>
                                <VolumeMuteIcon fontSize ="large" />
                            </>
                            : 
                            <>
                                <VolumeUpIcon fontSize ="large"></VolumeUpIcon>
                            </>}
                        </button>
                    </Tooltip>
                </div>
            </div>   
            {/* Friends Video */}
            <div>
                { callAccepted && !callEnded &&
                <div className="user_video">
                    <h3>{call.name || "User2"}</h3>
                    <video playsInline ref={userVideo} autoPlay></video>
                </div>
                }
            </div>
        </div>
    )
}