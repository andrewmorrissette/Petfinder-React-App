import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import AddPhotoAlternateRoundedIcon from '@material-ui/icons/AddPhotoAlternateRounded'
import IconButton from '@material-ui/core/IconButton'
import HighlightOff from '@material-ui/icons/HighlightOff'


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
        
    uploadIcon: {
      fill: 'white',
    },
    deleteIcon: {
        fill: 'black',
    },
    container:{
        padding:"5px",
          
    },
    img:{
        height: "280px",
        width:"100%",
        objectFit:"cover",
        boxShadow:"0px 5px 17px -7px rgba(0,0,0,0.75)",
        borderRadius:"10px",
        cursor:"pointer",
        transition:"transform 100ms ease-in",
        "&:hover":{
        transform:"scale(1.07)"
        }
    },
    noImage:{
        padding: theme.spacing(2),
        backgroundColor: "grey",
        height:"250px",
        borderRadius:"10px",
        "&:hover":{
            backgroundColor : "darkgrey",
            cursor:"pointer"
        }
    },
  }));

const PetPhotoGrid = ({maxImageSize = 9, updateImage, images = [], ...props}) => {

    //Nothing is Required for props to get PetPhotoGrid to work. Does need ability to rerender

    const onImport = (e) =>{
        updateImage ? 
            updateImage({type:"upload", file: e.target.files[0]}) 
            : 
            images.push({src: URL.createObjectURL(e.target.files[0]), file: e.target.files[0]});
        
        
    }

    const onDelete = (index) =>{
        updateImage ? 
            updateImage({type:"delete", index: index}) 
            : 
            images.splice(index,1)
        
    }



    const classes = useStyles();


    const renderPhotos = () =>{
        let renderArray = []
        for (var i = 0; i<maxImageSize ; i++){
            images[i] === undefined ? 
            renderArray.push(
                <Grid item xs={12} md={6} lg={4} key={i}>
                    <input type='file' id={`single ${i}`} onChange={(e) => onImport(e)} hidden/>
                    <label htmlFor={`single ${i}`}>
                    <Paper className={classes.noImage} >
                        <IconButton  >
                            <AddPhotoAlternateRoundedIcon className={classes.uploadIcon}/>
                        </IconButton>
                    </Paper>
                    </label>
                    
                </Grid>
            ) : renderArray.push(
                <Grid item xs={12} md={6} lg={4} key={i}>
                    <img className={classes.img} src={images[i].src} alt={images[i].src} />
                    <IconButton onClick={onDelete.bind(this, i)}>
                        <HighlightOff className={classes.deleteIcon}/>
                    </IconButton>
                </Grid>
            )
        }
        return renderArray
    }


    return (
      <Grid container spacing={3} className={classes.container} justify="center" alignItems="center">
        {renderPhotos()}
      </Grid>
    )
}

export default PetPhotoGrid
