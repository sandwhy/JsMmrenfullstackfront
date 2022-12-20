import React, {useEffect, useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core"
import {useDispatch} from "react-redux"
import { useHistory } from 'react-router-dom'
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined"
import GoogleLogin from "react-google-login"
import {gapi} from "gapi-script"

import Icon from "./Icon"
import useStyles from "./styles"
import Input from "./input"
import {signin, signup} from "../../actions/auth"

const initialState = { firstName:"", lastName:"", email:"", password:"", confirmPassword:""}

const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [showPassword, setShowpassword] = useState(false)
    const [isSignup, setisSignup] = useState(false)
    const [formData, setFormdata] = useState(initialState)
    const history = useHistory()

    const handleShowPassword = () => setShowpassword((prevShowPassword) => !prevShowPassword )

    useEffect(() => {
        const clientId='338755508998-jnl0c6qtuf4qe60j1iu13vj64pc85v70.apps.googleusercontent.com'
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope:"https://www.googleapis.com/auth/cloud-platform.read-only"
            })
        }
        gapi.load("client:auth2", initClient)
    })

    const switchMode = () => {
        setisSignup(!isSignup)
        handleShowPassword(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormdata({...formData, [e.target.name]:e.target.value})
    }

    const googleSucces = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({type:"AUTH", data:{result,token}})
            history.push("/")
        } catch (error) {
            console.log(error)
        }
    }
    const googleFaliure = (error) => {
        console.log(error)
        console.log("Google sign in Failed. Please try again later.")
    }

  return (
    <Container components="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3} >
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup? "Sign Up" : "Sign In"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                     {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )
                     }
                     <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                     <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                     { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                     <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup?"Sign Up":"Sign In"}
                     </Button>
                     <GoogleLogin 
                        clientId='338755508998-jnl0c6qtuf4qe60j1iu13vj64pc85v70.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton} 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon/>} 
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSucces}
                        onFailure={googleFaliure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In":"Dont have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth