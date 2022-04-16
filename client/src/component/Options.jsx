import React,{useContext,useState} from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {SocketContext} from "../SocketContext";
import './common.css'
import Button from '@material-ui/core/Button';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';
import PhoneIcon from '@material-ui/icons/Phone';
import CallEndIcon from '@material-ui/icons/CallEnd';


export default function Options({children}){
    const {me,callAccepted,name,setName,leaveCall,callUser,callEnded} = useContext(SocketContext);
    const [idToCall,setIdToCall] = useState('');
    const [disabled,setDisabled] = useState(false);
    return (
        <div>
            <div>
                <form noValidate autoComplete="off">
                    <div className="user_input_container">
                        <div className="user_input_one">
                            <label id="name">Join as</label>
                            <input id="name" value={name} type="text"
                            onChange={(e)=>{
                                setName(e.target.value)
                            }}
                            style={{marginLeft:"0px"}}
                            placeholder="Name" 
                            className="form-input"></input>
                            {console.log(me)}
                            {/* <CopyToClipboard text={me}> */}
                                <Button variant="outlined" 
                                color="primary"
                                onClick={() => {navigator.clipboard.writeText(me)}}
                                >
                                    <AssignmentIcon />{" "}Copy your id
                                </Button>
                            {/* </CopyToClipboard> */}
                        </div>
                        <div className="user_input_two">
                        <label id="name">Make a call</label> 
                        {/* Id to call */}
                            <input id="name" value={idToCall} type="text"
                            onChange={(e)=>{
                                setIdToCall(e.target.value)
                            }}
                            style={{marginLeft:"0px"}}
                            placeholder="Add friend id" 
                            className="form-input"></input>
                           {
                               callAccepted && !callEnded ? (
                                   <Button variant="outlined" color="secondary"
                                   fullWidth
                                   onClick={()=>{
                                       leaveCall();
                                       setDisabled(false)
                                   }}
                                   style={{marginRight:"5px"}}
                                   >
                                    <PhoneDisabledIcon />
                                        Hang up
                                   </Button>
                               ) :
                               <Button variant="outlined" color="primary" 
                               onClick={()=>{
                                callUser(idToCall);
                                setDisabled(true)
                            }} 
                            fullWidth
                            disabled={disabled}>
                                   <PhoneIcon style={{marginRight:"5px"}}/>Call
                               </Button>
                           }
                        </div>
                    </div>
                </form>
            </div>
            {children}
        </div>
    )
}