
import React, { useState, useRef, useEffect } from 'react';
import "../styles/videoComponent.css";
import { Button, TextField } from '@mui/material';

import { io } from "socket.io-client";



let connectToSocketServer = () => {
  socketRef.current = io.connect(server_url, { secure: false });
};

const server_url = "http://localhost:8000";

var connections = {};
const peerConfigConnections = {
  "iceServers": [
    { "urls": "stun:stun.l.google.com:19302" },
  ],
};



export default function VideoMeetComponenet() {

  let socketRef = useRef();


  let socketIdRef = useRef();

  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailabele] = useState(true);

  let { audioAvailable, setAudioAvailable } = useState(true);

  let [video, setVideo] = useState([]);

  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();

  let [showModal, setModal] = useState();

  let [ScreenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([])

  let [message, setMessage] = useState(" ");

  let [newMessages, setNewMessages] = useState(0);

  let [askForUsername, setAskForUsername] = useState(true);

  let [username, setUsername] = useState("");

  const videoRef = useRef([])

  let [videos, setVideos] = useState([])

  //    if(isChrome()=== false){

  //    }


  const getPermissions = async () => {
    try {
      const videopermission = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videopermission) {
        setVideoAvailabele(true);

      } else {
        setVideoAvailabele(false);
      }

      const audiopermission = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (audiopermission) {
        setVideoAvailabele(true);

      } else {
        setVideoAvailabele(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);

      } else {
        setScreenAvailable(false);
      }


      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audioAvailable });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }


    } catch (err) {
      console.log(err);

    }
  }


  useEffect(() => {
    getPermissions();
  }, [])

  let getUserMediaSuccess = (stream) => {

  }
  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
        .then(() => { })
        .then((stream) => { })
        .catch((e) => (console.log(e)))
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop())
      } catch (e) { }
    }
  }

  useEffect(() => {
    if (video === undefined && audio === undefined) {
      getUserMedia();
    }
  }, [audio, video])


  let gotMessageFromServer = (fromId, message) => {

    var signal = json.parse(message)

    if (fromId===socketIdRef.current){
      if( signal.sdp)
    }
  }

  let addMessage = () => {

  }
  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false })

    socketRef.current.on('signal', gotMessageFromServer)

    socketRef.current.on("connect", () => {

      socketRef.current.emit("join-call", window.location.href)



      socketIdRef.current = socketRef.current.id

      socketRef.current.on("chat-message", addMessage)

      socketRef.current.on('user-left', (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id))
      });

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {

          connections[socketListId] = new RTCPeerConnection(peerConfigConnections)

          connections[socketListId].onicecandidate = (event) => {

            if (event.candidate !== null) {
              socketRef.current.emit("signal", socketListId, json.stringify({ 'ice': event.candidate }))

            }

          }


          connections[socketListId].onaddstrem = (event) => {

            let videoExists = videoRef.current.find(video => video.socketId === socketListId);


            if (videoExists) {
              setVideo(videos => {
                const updatedVideos = videos.map(video =>
                  video.socketId === socketlistId ? { ...video, stream: event.stream } : video
                );

                videoRef.current = updatedVideos;
                return updatedVideos;


              })
            } else {
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoplay: true,
                playsinline: true
              }

              setVideos(videos => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            }
          };

          if (window.localStream === undefined && window.localStream === null) {
            connections[socketlistId].addStream(window.localStream);
          } else {
            // let blackSlience

          }





        });


        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue

            try {
              connection[id2].addStream(window.localStream)

            } catch (e) {
              connections[id2].createoffer().then((description) => {
                connections[id2].setLocalDescription(description)
                  .then(() => {
                    socketRef.current.emit("signal", id2, json.stringify({ "sdp": connections[id2].LocalDescription }))
                  })
                  .catch((e => console.log(e)))
              })
            }
          }
        }
      });

    })
  }

  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);

    connectToSocketServer();
  }


  let connect = () => {
    setAskForUsername(false);
    getMedia();
  }

  return (
    <div>
      {askForUsername === true ?
        <div>
          <h2> Enter into Lobby</h2>

          <TextField id="outlined-basic" label="username" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" />
          <Button variant="contained" onClick={connect}>Connect</Button>

          <div>
            <video ref={localVideoRef} autoPlay muted></video>
          </div>
        </div> : <> </>
      }
    </div>
  )
}