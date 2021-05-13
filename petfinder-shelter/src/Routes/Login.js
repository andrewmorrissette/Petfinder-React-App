import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from '../Components/UserForms/LoginForm'
import RegisterForm from '../Components/UserForms/RegisterForm'
import ForgotPasswordForm from '../Components/UserForms/ForgotPasswordForm'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL : "http://localhost:5000"



const Login = ({onLogin, ...props}) => {

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
    const history = useHistory();

    const [showForm,formSelector] = useState("login")

    const createUser = async(formData, shelterID) =>{
        axios.post(`${REACT_APP_API_URL}/users/register`,{
            username: formData[0].value,
            password: formData[1].value,
            shelter: shelterID
        })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }

    const createShelter = async (formData) => {
        axios.post(`${REACT_APP_API_URL}/shelters/upload`,{
            name: formData[2].value,
            address: formData[3].value,
            city: formData[4].value,
            state:formData[5].value,
            zipcode:formData[6].value,
            telephone:formData[7].value
        })
      .then(res => {console.log(res); console.log(res.data._id,"id"); createUser(formData,res.data._id)})
      .catch(err => console.log(err))
    }

    const loginUser = async (username, password) =>{
        axios.post(`${REACT_APP_API_URL}/users/login`,{
            username: username,
            password: password
        })
        .then(res => {if(res.status === 200){onLogin({"username":res.data.username,"shelter":res.data.shelter}); history.push('/home')} })
        .catch(err => console.log(err))
    }


    return (

        <div >

            {/* Background Image */}
            <div className={classes.bgDim} />
            <div className={`${classes.fullBgSize}`} style={{"backgroundImage" : "url('https://images.unsplash.com/photo-1612465566991-0ec68094b0a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1097&q=80')"}}/>
            
            {/* Overlay - must be wrapped with classes.content to be ontop of background */}
            <div className={classes.content }>
                {showForm==="login" ?<LoginForm goToForm={formSelector} onSubmit={loginUser}/>
                    :showForm==="register"?<RegisterForm goToForm={formSelector} onSubmit={createShelter}/>
                    :showForm==="forgot"?<ForgotPasswordForm goToForm={formSelector}/>
                    :<LoginForm/>}
                
            </div>

        </div>
        
    )
}

export default Login
