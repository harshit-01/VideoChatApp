import React,{useContext} from "react";
import Button from '@material-ui/core/Button';
import {SocketContext} from "../SocketContext";

export default function Notification(){
    const {callAccepted,call,answerCall} = useContext(SocketContext);
    return (
        <>
        {
            !callAccepted && call.isReceivedCall && (
                <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                    <h4 style={{margin:"10px"}}>{call.name} is calling you.</h4>
                    <Button variant="outlined" color="primary" onClick={answerCall}>
                        Answer
                    </Button>
                </div>
            )
        }
        </>
    )
}