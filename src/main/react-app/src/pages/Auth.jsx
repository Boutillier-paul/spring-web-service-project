import React, {useState} from 'react';
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";


export default function Auth() {

    const [values, setValues] = useState({
        mode: 'login'
    })

    const changeAuthMode = () => {
        if(values.mode === 'login'){
            setValues({
                ...values,
                mode: 'register'
            })
        }
        else{
            setValues({
                ...values,
                mode: 'login'
            })
        }

    }

    return (
        <>
            <Grid container spacing={2} sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Grid item xs={1}></Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <Typography variant="h3" component="div" sx={{ flexGrow: 1, color: '#1976d2' }}>
                            <strong><em>Welcome to our chat app...</em></strong>
                        </Typography>
                        <Box
                            component="img"
                            sx={{
                                width: '100%',
                            }}
                            alt="Auth image."
                            src="/auth-image.png"
                        />
                    </Box>
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Box sx={{ display: 'flex', width: 'min-content', padding: '20px', boxShadow: '3px 3px 10px 0px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap:'wrap' , border: '1px solid rgba(0,0,0,0.5)', borderRadius: '50px', borderColor: 'rgba(0,0,0,0.2)'}}>

                        <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: '#1976d2' }}>
                            <strong>{values.mode.charAt(0).toUpperCase() + values.mode.slice(1)}</strong>
                        </Typography>

                        {values.mode === 'login' ? <LoginForm /> : <RegisterForm />}
                        <p>{values.mode === 'login' ? 'You don\'t have an account yet ?' : 'You already have an account ?'}<Button onClick={changeAuthMode}>{values.mode === 'login' ? 'Create one here !' : 'Login here !'}</Button></p>
                    </Box>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </>
    )
}
