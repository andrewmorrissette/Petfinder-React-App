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

const RegisterForm = ({goToForm, onSubmit, ...props}) => {

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
        onSubmit(formdata.target)
    }


    return (
        <Grid container spacing={3}  direction="column" justify="center" alignItems="center">
            <Grid item xs={12} md={6} lg={4} >
                <Card style={{"alignItems":"center","padding":"10px", "textAlign":"center","justifyContent":"center"}}>
                    <CardContent>
                        <Avatar className={classes.avatarLarge}>
                            <LockIcon />
                        </Avatar>
                        <h2 style={{"marginTop":"0"}}>Sign Up</h2>
                        <p>Login Information</p>
                        <form onSubmit={onSubmitForm}>
                            <div style={{"display":"flex","width":"100%"}}>
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
                                            style={{"padding":"5px"}}
                            />
                            <TextField 
                                            variant="filled"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            autoFocus
                                            type="password"
                                            InputLabelProps={{'margin':'dense'}}
                                            style={{"padding":"5px"}}
                            />
                            </div>
                            <p>Shelter Information</p>
                            <TextField 
                                            variant="filled"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Shelter Name"
                                            autoFocus
                                            InputLabelProps={{'margin':'dense'}}
                            />
                            <TextField 
                                            variant="filled"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            autoFocus
                                            type="address"
                                            InputLabelProps={{'margin':'dense'}}
                            />
                            <div style={{"display":"flex","width":"100%"}}>
                                <TextField 
                                                variant="filled"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="city"
                                                label="City"
                                                autoFocus
                                                InputLabelProps={{'margin':'dense'}}
                                                style={{"padding":"5px"}}   
                                />
                                <TextField 
                                                variant="filled"
                                                margin="normal"
                                                fullWidth
                                                required
                                                id="state"
                                                label="State"
                                                autoFocus
                                                InputLabelProps={{'margin':'dense'}}
                                                style={{"padding":"5px"}}     
                                />
                            </div>
                            <div style={{"display":"flex","width":"100%"}}>
                                <TextField 
                                                variant="filled"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="zipcode"
                                                label="Zipcode"
                                                autoFocus
                                                InputLabelProps={{'margin':'dense'}}
                                                style={{"padding":"5px"}}  
                                />
                                <TextField 
                                                variant="filled"
                                                margin="normal"
                                                fullWidth
                                                required
                                                id="phone"
                                                label="Phone Number"
                                                type="phone"
                                                autoFocus
                                                InputLabelProps={{'margin':'dense'}}
                                                style={{"padding":"5px"}}    
                                />
                            </div>
                            <Button type="submit" variant="contained" color="primary"  style={{"margin":"10px"}}>
                                    Submit
                            </Button>
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button  color="primary"  style={{"margin":"10px"}} onClick={()=>{goToForm("login")}}>Login?</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default RegisterForm
