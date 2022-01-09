import React from 'react';

import axios from 'axios';
import SockJsClient from "react-stomp";
import Container from "@mui/material/Container";
import {TextField} from "@mui/material";
import {Send} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Message from '../components/Message'
import Typography from "@mui/material/Typography";


class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            messages: [],
            messageToSend: "",
            room: null,
            roomId: (window.location.pathname).split('/')[2],
        }
    }

    updateInputValue(evt) {
        const val = evt.target.value;
        this.setState({
            ...this.state,
            messageToSend: val
        });
    }

    sendMessage = () => {
        if(!!this.state.messageToSend){
            this.clientRef.sendMessage('/app/room/' + this.state.roomId, JSON.stringify({
                user: {id: sessionStorage.getItem('user'), username: sessionStorage.getItem('username')},
                text: this.state.messageToSend
            }));

            axios.defaults.headers.common = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
            axios.post('http://localhost:8080/rest/messages', {
                    user: {id: sessionStorage.getItem('user'), username: sessionStorage.getItem('username')},
                    text: this.state.messageToSend,
                    room: {id: this.state.roomId}
                }
            )
                .then(res => {
                    console.log("message sent")
                }).catch(e => {
                console.log(e);
            })

            this.setState({
                ...this.state,
                messageToSend: '',
            })
        }
    };

    keyPress = (e) => {
        if(e.keyCode === 13){
            e.preventDefault()
            this.sendMessage()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let messageDiv = document.getElementById("message-list");
        messageDiv.scrollTop = messageDiv.scrollHeight;
    }

    componentDidMount() {
        axios.defaults.headers.common = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
        axios.get('http://localhost:8080/rest/rooms/' + this.state.roomId
        )
            .then(res => {
                this.setState({
                    ...this.state,
                    room: res.data,
                    messages: res.data.messages
                })
            }).catch(e => {
            console.log(e);
        })
    }

    render() {
        return (
            <>
                <Box container sx={{ boxShadow: '1px 1px 5px 1px', height: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(rgb(0,0,0,0.4),rgb(0,0,0,0.4)), url("/home-image.jpg")'}}>

                    <Container sx={{background: 'rgba(250,250,250,0.3)'}}>
                        <Typography variant="h2" component="div" sx={{textAlign: 'center', flexGrow: 1, color: '#1976d2', background: 'white'}}>
                            {!!this.state.room && <strong>{this.state.room.name}</strong>}
                        </Typography>

                        <SockJsClient
                            url='http://localhost:8080/websocket-chat'
                            topics={['/topic/room/' + this.state.roomId]}
                            onConnect={() => {
                                console.log("Connected");
                            }}
                            onDisconnect={() => {
                                console.log("Disconnected");
                            }}
                            onMessage={(msg) => {
                                var jobs = this.state.messages;
                                jobs.push(msg);
                                this.setState({messages: jobs});
                            }}
                            ref={(client) => {
                                this.clientRef = client
                            }}
                        />

                        <Box id={'message-list'} sx={{height: '80%', overflowY: 'scroll', padding: '10px 10px'}}>
                            {this.state.messages.map( (message) => (
                                <Message key={message.id} username={message.user.username} text={message.text} mine={(message.user.username === sessionStorage.getItem('username'))}/>
                            ))}
                        </Box>

                        <Container sx={{display: 'flex', flexDirection: 'row', position: 'sticky', bottom: '0', background: 'white', padding: '10px 0'}}>
                                <TextField multiline variant={'outlined'} maxRows={1} sx={{ maxHeight: 1, width: 1, marginRight: 5}} value={this.state.messageToSend} onChange={evt => this.updateInputValue(evt)} type="text" onKeyDown={this.keyPress}/>
                                <Button variant="contained" onClick={this.sendMessage} endIcon={<Send />}>Send</Button>
                        </Container>
                    </Container>
                </Box>
            </>
        )
    }
}

export default Room;
