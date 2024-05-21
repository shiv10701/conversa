import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import styles from "./styles/videoComponent.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
// import server from './environment';
import { useLocation } from 'react-router-dom';
import { useSocketContext } from "../../socket/socketConnection";
import { useSelector } from "react-redux";

import ringging from "./audio/ring.mp3";
import tune from "./audio/tune.mp3";


// const server_url = server;
var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}
export default function VideoMeetComponent() {
    let [callEnd, setCallEnd] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);

    var socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoref = useRef();
    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video, setVideo] = useState([]);
    let [audio, setAudio] = useState();
    let [screen, setScreen] = useState();
    let [screenAvailable, setScreenAvailable] = useState();
    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState("");
    const videoRef = useRef([])
    let [videos, setVideos] = useState([])

    const { state } = useLocation();
    const { online_users, socket } = useSocketContext();
    const selectedUser = useSelector(state => state.selected_chat)
    const Local_U_data = useSelector(state => state.user_data);
    const localRing = new Audio(ringging);
    const remoteTune = new Audio(tune);

    // TODO     
    // if(isChrome() === false) {
    // }
    // ------------------------------------- 1. ----------------------------------------------- 

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('Video permission denied');
            }
            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }
            if (navigator.mediaDevices.getDisplayMedia) {
                console.log('Screen Sharing permission granted');
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }
            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;

                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream; //assigning local video to video element 
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPermissions();  //This gonna call at every re-render(bcoz it dont have []) 
    }, [])

    // ------------------------------------- 2. ----------------------------------------------- 

    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        let blackStream = new MediaStream([black()]);
        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue
            connections[id].addStream(window.localStream)// For each connection, it adds the local media stream (window.localStream) to the connection. This allows the remote peer to receive the local audio and video streams.
            connections[id].createOffer().then((description) => {// Create an offer for the connection
                connections[id].setLocalDescription(description)// Set the local description for the connection
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }
        // }
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Code executed when a track in the media stream ends
        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }
            // Create a new media stream with black video and silence audio
            window.localStream = stream
            localVideoref.current.srcObject = stream

            // Again same process performed as above 
            // Iterate over connections and update them with the new media stream
            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            console.log("SET STATE HAS =>  VIDEO = ", video, "AUDIO", audio);
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [video, audio])

    // ------------------------------------- 3.Below All about screen sharing ----------------------------------------------- 
    let getDislayMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }
        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue
            connections[id].addStream(window.localStream)
            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        // Stopping Screen Sharing: When the user stops screen sharing or the screen sharing stream ends, the stream's onended event is triggered, and the corresponding handling function is called.
        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream
            getUserMedia()
        })
    }
    // --this is for screeen sharing 

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })// function is called when the screen sharing stream is successfully obtained.
                    .then(getDislayMediaSuccess)
                    .catch((e) => console.log(e))
            }
        }
    }

    useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen])

    //  --------------------------------------- 4. ----------------------------------------------------------------
    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)
        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }
            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }

    let connectToSocketServer = () => {
        // socketRef.current = io.connect(server_url, { secure: false })
        socketRef.current = socket
        socketRef.current.on('signal', gotMessageFromServer)
        // socketRef.current.on('connect', () => {   //********************* */
            socketRef.current.emit('join-call', window.location.href , Local_U_data)
            socketIdRef.current = socketRef.current.id
            // socketRef.current.on('chat-message', addMessage)
            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })
            socketRef.current.on('user-joined', (id, clients) => {
                console.log('user-joined--->','id-->',id, 'clients-->',clients)
                clients.forEach((socketListId) => {
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    // Wait for their ice candidate       
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }
                    // Wait for their video stream
                    connections[socketListId].onaddstream = (event) => {
                        console.log("BEFORE:", videoRef.current);
                        console.log("FINDING ID: ", socketListId);

                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            // Update the stream of the existing video
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            // Create a new video
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            };
                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    };

                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
                })

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue
                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (e) { }
                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        // })
    }

    let getMedia = () => {

        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }
    
    let connect = () => {
        setCallEnd(!callEnd);
        setButtonClicked(true)
        setAskForUsername(false);
        getMedia();
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (callEnd && !buttonClicked) {
                handleEndCall();
            }
        }, 30000);
        return () => clearTimeout(timer);
    }, [callEnd, buttonClicked])

    // ------------------------------- 5.----------------------------------------------------------------

    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }

    let black = ({ width = 300, height = 300 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    let handleVideo = () => {
        setVideo(!video);  //useState hook
        // getUserMedia();
    }

    let handleAudio = () => {
        setAudio(!audio) //useState hook
        // getUserMedia();
    }

    let handleScreen = () => {     //
        setScreen(!screen); //useState hook
    }

    // ---------------------End Call --------------------------------
    let handleEndCall = () => {
        try {
            let tracks = localVideoref.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
            window.location.href = "/"
        } catch (e) { }

        if (selectedUser._id !== undefined) {
            socket.emit("cut_video_request", selectedUser._id)
        } else {
            socket.emit("cut_video_request", state._id)
        }
    }

    useEffect(() => {
        socket.on("cut_video_from_server", (socketId) => {
            let tracks = localVideoref.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
            window.location.href = "/"
        });
        return () => {
            socket.off("cut_video_from_server");
        };
    }, []);
    // -------------------------- Custom code ---------------------------------------------------------------
    useEffect(() => {
        console.log('helllo--------------------------------------------------');
        if (state === 'outgoing_video') {
            connect();
        }
    }, [])
    useEffect(() => {
        console.log('Yello --------------------------------------------------');
    }, [])

    function Accept(){
        remoteTune.pause();
        localRing.pause();
        connect();
        console.log('remote utne paused .....')
    }
    // -------------------------- Return ---------------------------------------------------------------

    return (
        <div>
            {/* style={{ width: '40rem', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} */}
            {askForUsername === true ?
                <div >
                    <h1 style={{ display: 'block', textAlign: 'center' }}>{state.name} </h1>
                    <h2 style={{ display: 'block', textAlign: 'center' }}>Incomming Call...  </h2>
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', gap: '2rem' }}>
                        <Button variant="contained" onClick={Accept} style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>Accept</Button>
                        <Button variant="contained" onClick={handleEndCall} style={{ display: 'block', textAlign: 'center', justifyContent: 'center', backgroundColor: 'red' }}>Decline</Button>
                    </div>
                    <div style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }} >
                        <video ref={localVideoref} autoPlay muted style={{ width: '40rem' }}></video>
                    </div>
                </div> :

                <div className={styles.meetVideoContainer}>

                    {/****************************  Buttons *********************************/}
                    <div className={styles.buttonContainers}>
                        <IconButton onClick={handleVideo} style={{ color: "white" }}>
                            {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
                        </IconButton>
                        <IconButton onClick={handleEndCall} style={{ color: "red" }}>
                            <CallEndIcon />
                        </IconButton>
                        <IconButton onClick={handleAudio} style={{ color: "white" }}>
                            {audio === true ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>

                        {screenAvailable === true ?
                            <IconButton onClick={handleScreen} style={{ color: "white" }}>
                                {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                            </IconButton> : <></>}

                    </div>
                    {/****************************  Remote Users *********************************/}
                    <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted></video>

                    <div className={styles.conferenceView}>
                        {videos.map((video) => (
                            <div key={video.socketId}>
                                <video
                                    data-socket={video.socketId}
                                    ref={ref => {
                                        if (ref && video.stream) {
                                            ref.srcObject = video.stream;
                                        }
                                    }}
                                    autoPlay
                                >
                                </video>
                            </div>
                        ))}
                    </div>
                </div>
            }

        </div>
    )
}
