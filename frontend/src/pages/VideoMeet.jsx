
import React, { useState, useRef,useEffect } from 'react';
import "../styles/videoComponent.css";
import { Button, TextField } from '@mui/material';
import { connect, io } from "socket.io-client";

 const server_url="http://localhost:8000";

 var connections= {};
 const peerConfigConnections={
    "iceServers":[
        {"urls": "stun:stun.l.google.com:19302"},
    ],
 };



export default function VideoMeetComponenet(){

       var socketRef = useRef();

       let socketIdRef= useRef();

       let localVideoRef= useRef();

       let [videoAvailable, setVideoAvailabele]= useState(true);

       let {audioAvailable,setAudioAvailable}=useState(true);

       let [video, setVideo]=useState();

       let [audio, setAudio]=useState();

       let [screen,setScreen]=useState();

       let[ showModal,setModal]=useState();

       let[ScreenAvailable, setScreenAvailable]=useState();

       let [messages,setMessages]=useState([])

       let[message, setMessage]=useState(" ");

       let [newMessages,setNewMessages]=useState(0);

       let [askForUsername,setAskForUsername]=useState(true);

       let[username,setUsername]=useState("");

       const videoRef=useRef([])

       let [videos,setVideos]=useState([])

    //    if(isChrome()=== false){

    //    }


     const getPermissions= async ()=>{
        try{
            const videopermission =  await navigator.mediaDevices.getUserMedia({video:true});
        
            if (videopermission){
                setVideoAvailabele(true);

            } else{
                 setVideoAvailabele(false);
            }

             const audiopermission =  await navigator.mediaDevices.getUserMedia({audio:true});
        
            if (audiopermission){
                setVideoAvailabele(true);

            } else{
                 setVideoAvailabele(false);
            }

           if( navigator.mediaDevices.getDisplayMedia){
             setScreenAvailable( true);
             
           } else{
               setScreenAvailable(false);
           }


           if ( videoAvailable|| audioAvailable){
            const userMediaStream=await navigator.mediaDevices.getUserMedia({video:videoAvailable,audioAvailable});
             if (userMediaStream){
            window.localStream= userMediaStream;
            if(localVideoRef.current){
                localVideoRef.current.srcObject=userMediaStream;
            }
           }
           }
          
            
        }catch(err){
            console.log(err);

        }
     }


      useEffect(()=>{
        getPermissions();
      },[])

      let getUserMediaSuccess=(stream)=>{

      }
    let getUserMedia=()=>{
        if ((video&& videoAvailable)|| (audio&& audioAvailable)){
            navigator.mediaDevices.getUserMedia({ video:video,audio:audio})
            .then(()=>{})
            .then((stream)=>{})
            .catch((e)=>(console.log(e)))
        }else{
            try{
                let tracks=localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track=> track.stop())
            }catch (e){ }
        }
    }

      useEffect(()=>{
        if( video === undefined && audio===undefined){
            getUserMedia();
        }
      },[audio ,video])


      let getMedia=()=>{
        setVideo(videoAvailable);
        setAudio(audioAvailable);

        // connectToSocketServer();
      }




    return(
        <div> 
            {askForUsername=== true?
          <div>
            <h2> Enter into Lobby</h2>
           
            <TextField id="outlined-basic" label="username" value={username} onChange={(e)=>setUsername(e.target.value)} variant="outlined" />
               <Button variant="contained" onClick={connect}>Connect</Button>

               <div>
                 <video ref={ localVideoRef} autoPlay muted></video>
               </div>
          </div>  :<> </>  
        }
        </div>
    )
}