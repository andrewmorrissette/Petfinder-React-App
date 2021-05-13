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

const LoginForm = ({goToForm, onSubmit, ...props}) => {

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


    const onSubmitForm = (formdata) => {
        formdata.preventDefault();
        onSubmit(formdata.target[0].value,formdata.target[1].value)
    }


    return (
        <Grid container spacing={3}  direction="column" justify="center" alignItems="center">
                    <Grid item xs={12} md={6} lg={4} >
                        <Card style={{"alignItems":"center","padding":"10px", "textAlign":"center","justifyContent":"center"}}>
                            <CardContent>
                                <Avatar className={classes.avatarLarge}>
                                    <LockIcon />
                                </Avatar>
                                <h2 style={{"marginTop":"0"}}>Sign in</h2>
                                <form onSubmit={onSubmitForm}>
                                    <TextField 
                                                    variant="filled"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="email"
                                                    autoFocus
                                                    type="email"
                                                    InputLabelProps={{'margin':'dense'}}
                                                    
                                    />
                                    <TextField 
                                                    variant="filled"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="password"
                                                    label="password"
                                                    autoFocus
                                                    type="password"
                                                    InputLabelProps={{'margin':'dense'}}
                                                    
                                    />
                                    <Button type="submit" variant="contained" color="primary"  style={{"margin":"10px"}}>
                                            Submit
                                    </Button>
                                </form>
                            </CardContent>
                            <CardActions>
                                <Button  color="secondary"  style={{"margin":"10px"}} onClick={()=>{goToForm("forgot")}}>Forgot Password?</Button>
                                <Button  color="primary"  style={{"margin":"10px"}} onClick={()=>{goToForm("register")}}>Sign Up</Button>
                            </CardActions>
                        </Card>
                        
                    </Grid>
                </Grid>
    )
}

export default LoginForm
