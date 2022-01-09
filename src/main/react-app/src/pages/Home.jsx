import React from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

import axios from 'axios';

import '../style/home.css'
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        axios.defaults.headers.common = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
        axios.get('http://localhost:8080/rest/users/' + sessionStorage.getItem('user'),
            )
            .then(res => {
                    this.setState({
                        user: res.data
                    })
                    sessionStorage.setItem('username', res.data.username)
                }).catch(e => {
                    console.log(e);
                })
    }

    render() {
        return (
            <>
                <Box container sx={{ height: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(rgb(0,0,0,0.4),rgb(0,0,0,0.4)), url("/home-image.jpg")'}}>
                    <Typography variant="h3" component="div" sx={{flexGrow: 1, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <strong>Hello {this.state.user && this.state.user.username},</strong>
                        <p>& Welcome to our chat-app...</p>
                        <p><em>A unique place where we can talk about TFT...</em></p>
                        <Button variant="contained" size={'large'} color={"primary"} component={Link} to="/rooms">
                            Go to chat rooms !
                        </Button>
                    </Typography>
                </Box>
            </>
        )
    }
}

export default Home;