const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = createServer(app);

//server side instance created
const io = new Server(httpServer, { 
    cors:{
        origin:"*", //allow all sources
        method:["GET","POST"]
    }
    /* options */ 
});

app.use(cors());
const PORT = process.env.PORT || 5000; 
app.get("/",(req,res)=>{
   res.send("Server Running")
})
io.on("connection", (socket) => {
  socket.emit("me",socket.id);// emit a message
  socket.on("disconnect", () =>{
      socket.broadcast.emit("callEnded");
  })
  socket.on("callUser",({userToCall,signal,from,name})=>{ // eventname + listener(callback function)
    // console.log(signal)
      io.to(userToCall).emit("callUser",{signal,from,name})
  })
  socket.on("answerCall",(data)=>{
      io.to(data.to).emit("callAccepted",data.signal);
  })
});

httpServer.listen(PORT,()=>{
    console.log("Server is running on "+ PORT);
});