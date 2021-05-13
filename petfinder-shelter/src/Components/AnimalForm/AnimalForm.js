import React, { useState, useEffect, useReducer } from 'react'

import Navbar from '../Navbar/Navbar';
import PetPhotoGrid from '../PetPhoto/PetPhotoGrid'

import Grid from '@material-ui/core/Grid'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import ChipInput from 'material-ui-chip-input'

const AnimalForm = ({title="", maxImageSize, onSubmit, onLoad, ...props}) => {
    //To Fix: Update state of Traits onLoad, otherwise traits reset if edited and not changed.

    function imageReducer(state, action) {
        switch( action.type ) {
            case 'upload':
            {
                const newImage = {
                    src: URL.createObjectURL(action.file),
                    file: action.file
                };
                return {
                    formImages: [...state.formImages, newImage],
                    importedImages: state.importedImages
                }
            }
            case 'delete':
            {
                const newImages = Object.assign([],state.formImages);
                newImages.splice(action.index , 1);
                return {
                    formImages: newImages,
                    importedImages: state.importedImages
                }
            } case 'import':
            {
                return {
                    formImages: action.images,
                    importedImages: action.images
                }
            }
            default:
                throw new Error();
        }
    }

    const [formChips, setChips] = useState([])
    const [imageState, dispatch] = useReducer(imageReducer, {formImages: [], importedImages: []})
    const [animal, setAnimal] = useState({
        type:"",
        name: "",
        breed:"",
        age:0,
        description:"",
        shelter:"",
        traits:[],
        imgNames:[]
    })

    const useStyles = makeStyles((theme) => ({
        root: {
          margin:"100px"
        },
        
      }));
    const classes = useStyles();

    const handleChipChange = (chips) => {
        setChips(chips);
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        console.log(e.target)
        console.log("animal",animal)
        onSubmit(animal, formChips, imageState)
    }

    useEffect(()=>{
        console.log("On Effect")
        if(onLoad){
            //Refactor w/ isMounted or useAsync hook to remove memory leak
            onLoad(setAnimal, dispatch)
            
        }
        if(animal.imgNames !== []){
            dispatch({type:"import", images:animal.imgNames})
        }
    },[onLoad])


    return (
        <Grid container justify="center" align="center" >
                    <Grid item xs={12}>
                    <Navbar title={animal.name !== "" ? `Edit ${animal.name}` : title}/>
                    </Grid>
                    <div className={classes.root}>
                    <Grid container justify="center" spacing={3}>
                        <form noValidate onSubmit={(e)=>{onSubmitForm(e)}} encType="multipart/form-data" method="post">
                            <Grid item xs={12}>
                            
                                <TextField 
                                    value={animal.type}
                                    onChange={(e) => {setAnimal({...animal,type:e.target.value})}}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="type"
                                    label="Type"
                                    InputLabelProps={{'margin':'dense','shrink':true}}
                                />
                                <TextField 
                                    value={animal.name}
                                    onChange={(e) => {setAnimal({...animal,name:e.target.value})}}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    InputLabelProps={{'margin':'dense', 'shrink':true}}
                                />
                                <TextField 
                                    value={animal.breed}
                                    onChange={(e) => {setAnimal({...animal,breed:e.target.value})}}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="breed"
                                    label="Breed"
                                    InputLabelProps={{'margin':'dense', 'shrink':true}}
                                />
                                <TextField
                                    value={animal.age}
                                    onChange={(e) => {setAnimal({...animal,age:e.target.value})}}
                                    variant="outlined"
                                    margin="normal"
                                    id="age"
                                    label="Age"
                                    type="number"
                                    InputLabelProps={{'margin':'dense', 'shrink':true}}
                                />
                                    
                                    
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={animal.description}
                                    onChange={(e) => {setAnimal({...animal,description:e.target.value})}}
                                    variant="outlined"
                                    margin="normal"
                                    id="description"
                                    label="Description"
                                    multiline
                                    rows={6}
                                    InputLabelProps={{'shrink': true}}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ChipInput
                                    defaultValue={animal.traits}
                                    label="Traits (Press Enter for new Trait)"
                                    fullWidth
                                    onChange={(chips) => handleChipChange(chips)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <h3>Upload Photos</h3>
                            </Grid>
                            <PetPhotoGrid maxImageSize={maxImageSize} images={imageState.formImages} updateImage={dispatch}/>
                            <Grid item xs={12} >
                            <Button type="submit" variant="contained" color="primary" startIcon={<AddCircleIcon/>} style={{"margin":"10px"}}>
                                    Submit
                            </Button>
                            </Grid>
                        </form>
                    </Grid>
                    </div>

                    
                </Grid>
    )
}

export default AnimalForm
