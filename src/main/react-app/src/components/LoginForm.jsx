import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";

import axios from 'axios';
import {Alert, Snackbar} from "@mui/material";


export default function LoginForm() {
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
        error: '',
    });

    const [open, setOpen] = React.useState(false);

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validate = () => {
        if(!values.username){
            return values.error = "Please fill every input before sending auth request."
        }

        if(!values.password){
            return values.error = "Please fill every input before sending auth request."
        }

        return values.error = ''
    }

    const sendRequest = () => {
        validate()

        if(!values.error) {
            axios.post('http://localhost:8080/rest/auth/login',
                {
                    username: values.username,
                    password: values.password,
                })
                .then(res => {
                    console.log(res);
                    console.log(res.data.token);
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('user', res.data.id)
                    window.location.href = '/'
                }).catch(e => {
                console.log(e);
            })
        }
        else{
            handleAlert()
        }
    }

    return (
        <>
            <FormControl sx={{ m: 1, width: '50ch' }} variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    type={'text'}
                    value={values.username}
                    onChange={handleChange('username')}
                    endAdornment={
                        <InputAdornment position="end">
                            <AccountCircle />
                        </InputAdornment>
                    }
                />
            </FormControl>

            <FormControl sx={{ m: 1, width: '50ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            <Button sx={{marginTop: '15px'}} variant="contained" onClick={sendRequest}>Login</Button>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                    {values.error}
                </Alert>
            </Snackbar>
        </>
    );
}