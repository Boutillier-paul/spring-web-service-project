import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";


export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Spring Web Service Project, <em>by Paul & Giovanni</em>
                    </Typography>

                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>

                    <Button color="inherit" component={Link} to="/rooms">
                        Rooms
                    </Button>

                    <Button onClick={() => {
                            sessionStorage.removeItem('token');
                            window.location.href = '/';
                        }}
                        color="inherit" component={Link} to="/"
                    >
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}