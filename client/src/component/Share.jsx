import React from 'react';
import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
  } from "react-share";
import "./common.css"

export default function Share(){
    return(
        <div className="share-container">
            <p style={{marginBottom: '5px',fontWeight: 'bold'}}> # Share your id with your friends so they can call you.</p>
            <p style={{marginBottom: '5px',fontWeight: 'bold'}}> # Id changes everytime you join.</p>
            <WhatsappShareButton url={"https://web.whatsapp.com/"}> <WhatsappIcon size={32} round={true}/></WhatsappShareButton>
        </div>
    )
}