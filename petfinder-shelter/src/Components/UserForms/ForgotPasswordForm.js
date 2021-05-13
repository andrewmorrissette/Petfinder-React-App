import React from 'react'

import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

import LockIcon from '@material-ui/icons/Lock';


const ForgotPasswordForm = ({goToForm, ...props}) => {
    //Button has no logic behind it. Would need to impliment email to user for password reset.

    const useStyles = makeStyles((theme) => ({
        bgDim: {
            position: "fixed",
            zIndex:"-2",
            backgroundColor:"black",
            width: "100%",
            height: "100%",
          
        },
        fullBgSize: {
            width: "100%",
          height: "100%",
            position:"fixed",
            left:"0",
            right:"0",
            zIndex : "-1",
            display:"block",
            backgroundRepeat :"no-repeat",
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
            backgroundSize : "cover",
            backgroundColor:"black",
            filter:"blur(10px) brightness(60%) ",
            

        },
        content:{
            display:"flex",
            zIndex:"9999",
            padding: `${theme.spacing(5)}px 0px`
            
            
        },
        avatarLarge:{
            width:theme.spacing(7),
            height:theme.spacing(7),
            margin:"auto"
        }
        
      }));
    
    const classes = useStyles();



    return (
        <Grid container spacing={3}  direction="column" justify="center" alignItems="center">
                    <Grid item xs={12} md={6} lg={4} >
                        <Card style={{"alignItems":"center","padding":"10px", "textAlign":"center","justifyContent":"center"}}>
                            <CardContent>
                                <Avatar className={classes.avatarLarge}>
                                    <LockIcon />
                                </Avatar>
                                <h2 style={{"marginTop":"0"}}>Forgot Password</h2>
                                <p>Enter your email. If you have an account with us an email will be sent to your inbox. Thank you!</p>
                                <form>
                                    <TextField 
                                                    variant="filled"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email"
                                                    autoFocus
                                                    type="email"
                                                    InputLabelProps={{'margin':'dense'}}
                                                    
                                    />
                                    <Button variant="contained" color="primary"  style={{"margin":"10px"}}>
                                            Submit
                                    </Button>
                                </form>
                            </CardContent>
                            <CardActions>
                                <Button  color="primary"  style={{"margin":"10px"}} onClick={()=>{goToForm("login")}}>Login?</Button>
                                <Button  color="primary"  style={{"margin":"10px"}} onClick={()=>{goToForm("register")}}>Sign Up?</Button>
                            </CardActions>
                        </Card>
                        
                    </Grid>
                </Grid>
    )
}

export default ForgotPasswordForm
