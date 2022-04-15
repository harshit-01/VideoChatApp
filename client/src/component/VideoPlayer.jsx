import React,{useContext,useEffect} from "react";
import {SocketContext} from "../SocketContext";
import Skeleton from '@material-ui/lab/Skeleton';
import './common.css'
import { makeStyles } from '@material-ui/core';

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
    const {name,myVideo,callAccepted,callEnded,stream,call,userVideo,video} = useContext(SocketContext);
    const classes = useStyles();
    return (
        <div className="container">
            {/* My Video */}
            {stream ? 
            <div className="my_video">
                <h3>{name || "User1"}</h3>
                <video playsInline ref={myVideo} muted autoPlay></video>
            </div>:
            <div style={{display:"flex",flexDirection:"column"}}>
                <h3>Video</h3>
                <Skeleton variant="rect"  className={classes.root}></Skeleton>
            </div>
            }
            {/* Friends Video */}
            { callAccepted && !callEnded &&
            <div className="user_video">
                <h3>{call.name || "User2"}</h3>
                <video playsInline ref={userVideo} autoPlay></video>
            </div>
            }
        </div>
    )
}