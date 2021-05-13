import axios from 'axios'
import React from 'react'

import { useHistory } from 'react-router-dom'

import AnimalForm from '../Components/AnimalForm/AnimalForm'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL : "http://localhost:5000"

const AddAnimal = ({user,onAdd,...props}) => {
    const history = useHistory();

    const createAnimal = async (animal, traits, images) => {
        if(images.formImages.length>0){
            //If there are new images, upload images and then use response to give animal correct imgNames
            console.log("Uploading images ...")
            var formData = new FormData();
            images.formImages.forEach((image) => {
                formData.append("file", image.file)
            })
            console.log(formData, "formData")
            // formData.append("files", animal.imgNames)
            axios.post(`${REACT_APP_API_URL}/upload/images`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                axios.post(`${REACT_APP_API_URL}/animals/upload`,{
                    type: animal.type,
                    name: animal.name,
                    breed: animal.breed,
                    age: animal.age,
                    description: animal.description,
                    shelter: user.shelter,
                    traits: traits,
                    imgNames: res.data
                })
            })
            .then(res => {console.log(res); onAdd(true); history.push('/home')})
            .catch((err) => console.log(`Error: ${err}`))
        } else{

            axios.post(`${REACT_APP_API_URL}/animals/upload`,{
            type: animal.type,
            name: animal.name,
            breed: animal.breed,
            age: animal.age,
            description: animal.description,
            shelter: user.shelter,
            traits: traits,
            })
            .then(res => {console.log(res); onAdd(true); history.push('/home')})
            .catch(err => console.log(err))
        }
        
    }

    return (
            <AnimalForm title="Add an Animal" onSubmit={createAnimal}/>
    )
}

export default AddAnimal
