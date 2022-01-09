import React from 'react';
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Link} from "react-router-dom";
import {Add, Delete, Edit} from "@mui/icons-material";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    CardHeader
} from "@mui/material";
import IconButton from "@mui/material/IconButton";


class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            dialogForm: false,
            dialogUpdateForm: false,
            nameInput: '',
            descriptionInput: '',
            roomToUpdate: null
        }
    }

    handleClickOpen = () => {
        this.setState({
            ...this.state,
            dialogForm: true,
        });
    };

    handleClickOpenUpdate = (roomId) => {
        const roomToUpdate = this.state.rooms[this.state.rooms.findIndex(x => x.id === roomId)]

        this.setState({
            ...this.state,
            dialogUpdateForm: true,
            roomToUpdate: roomToUpdate,
            nameInput: roomToUpdate.name,
            descriptionInput: roomToUpdate.description,
        });
    };

    handleClose = () => {
        this.setState({
            ...this.state,
            dialogForm: false,
            dialogUpdateForm: false,
        });
    };

    updateInputNameValue = (evt) => {
        this.setState({
            ...this.state,
            nameInput: evt.target.value
        });
    }

    updateInputDescriptionValue = (evt) => {
        this.setState({
            ...this.state,
            descriptionInput: evt.target.value
        });
    }

    createRoom = () => {
        axios.defaults.headers.common = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
        axios.post('http://localhost:8080/rest/rooms/', {name: this.state.nameInput, description: this.state.descriptionInput}
        )
            .then(res => {
                const newRooms = this.state.rooms
                newRooms.push(res.data)

                this.setState({
                    ...this.state,
                    rooms: newRooms
                });

                console.log('room created')
            }).catch(e => {
            console.log(e);
        })

        this.handleClose()
        this.render()
    }

    deleteRoom = (roomId) => {
        axios.defaults.headers.common = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
        axios.delete('http://localhost:8080/rest/rooms/' + roomId,
        )
            .then(res => {
                const newRooms = this.state.rooms
                newRooms.splice(newRooms.findIndex(x => x.id === roomId), 1)

                this.setState({
                    ...this.state,
                    rooms: newRooms
                });
            }).catch(e => {
            console.log(e);
        })
    }

    updateRoom = () => {
        axios.defaults.headers.common = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
        axios.put('http://localhost:8080/rest/rooms/' + this.state.roomToUpdate.id, {name: this.state.nameInput, description: this.state.descriptionInput, messages: this.state.roomToUpdate.messages}
        )
            .then(res => {
                this.getRooms()
                this.handleClose()
            }).catch(e => {
            console.log(e);
        })
    }

    getRooms = () => {
        axios.defaults.headers.common = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
        axios.get('http://localhost:8080/rest/rooms/',
        )
            .then(res => {
                this.setState({
                    rooms: res.data
                })
            }).catch(e => {
            console.log(e);
        })
    }

    componentDidMount() {
        this.getRooms()
    }

    render () {
        return (
            <>
                <Box container sx={{ height: 'inherit', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(rgb(0,0,0,0.4),rgb(0,0,0,0.4)), url("/home-image.jpg")'}}>
                    <Container>
                        <Typography variant="h3" component="div" sx={{flexGrow: 1, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px 0px 10px 0px'}}>
                            <strong>Rooms</strong>
                            { this.state.rooms.length < 1 && <p>It seems that no room has been created ...</p> }
                        </Typography>

                        <Button variant="contained" sx={{marginBottom: 5}} onClick={this.handleClickOpen} endIcon={<Add />}>
                            Create room
                        </Button>
                        <Grid container spacing={2}>
                            {this.state.rooms.map( (room, index) => (
                                <Grid key={index} item xs={3}>
                                    <Card sx={{ minWidth: 275, transition: '0.3s ease-in-out','&:hover': {transform: 'scale(1.05)'}}}>
                                        <CardHeader
                                            sx={{borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.2)'}}
                                            title={room.name}
                                            action={
                                                <>
                                                    <IconButton onClick={() => {this.handleClickOpenUpdate(room.id)}} aria-label="update">
                                                        <Edit />
                                                    </IconButton>

                                                    <IconButton onClick={() => {this.deleteRoom(room.id)}} aria-label="delete">
                                                        <Delete />
                                                    </IconButton>
                                                </>
                                            }
                                        />
                                        <CardContent>
                                            <Typography variant="body2" sx={{textAlign: 'justify'}}>
                                                {room.description}
                                            </Typography>
                                        </CardContent>

                                        <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                                            <Button size="small" component={Link} to={"/rooms/" + room.id}>Go to this room</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                <Dialog open={this.state.dialogForm} onClose={this.handleClose}>
                    <DialogTitle>Create room</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a new room, please enter a name and a description.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={this.state.nameInput}
                            onChange={evt => this.updateInputNameValue(evt)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={this.state.descriptionInput}
                            onChange={evt => this.updateInputDescriptionValue(evt)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.createRoom}>Create room</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.dialogUpdateForm} onClose={this.handleClose}>
                    <DialogTitle>Update {!!this.state.roomToUpdate && this.state.roomToUpdate.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To update the room, please enter a name and a description.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={this.state.nameInput}
                            onChange={evt => this.updateInputNameValue(evt)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={this.state.descriptionInput}
                            onChange={evt => this.updateInputDescriptionValue(evt)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.updateRoom}>Update room</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

}

export default Rooms;