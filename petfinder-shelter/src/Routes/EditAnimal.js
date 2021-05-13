import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import AnimalForm from '../Components/AnimalForm/AnimalForm'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL : "http://localhost:5000"

const EditAnimal = ({match:{params:{id}}, onEdited}) => {
    const history = useHistory()

    const getAnimal = async (setAnimal, dispatch) => {
        axios.get(`${REACT_APP_API_URL}/animals/${id}`)
          .then(res => {setAnimal(res.data[0]); dispatch({type:"import",images:res.data[0].imgNames})})
          .catch(err => console.log(err))
      }

    const updateAnimal = async (animal, traits, images) =>{
        //formImages: [], importedImages: []
        //compare import vs form. if import image not in form, delete.
        //compre form vs import. if form not in import, add
        images.importedImages.forEach((importedImage) => {
            let result = images.formImages.find(img => img.name === importedImage.name);
            if(result === undefined){
                //Delete image from server
                console.log("Deleting Image",importedImage)
                axios.delete(`${REACT_APP_API_URL}/delete/image/${importedImage.name}`)
            }
        })

        let tempUploadImages = [];
        images.formImages.forEach((formImage) => {
            let result = images.importedImages.find(img => img.name === formImage.name);
            if(result === undefined){
                tempUploadImages.push(formImage)
                //Save in temp array and then add multiple. Use res for update animal.
            }
        })

        if(tempUploadImages.length > 0){
            var formData = new FormData();
            tempUploadImages.forEach((image) => {
                formData.append("file", image.file)
            })
            // formData.append("files", animal.imgNames)
            axios.post(`${REACT_APP_API_URL}/upload/images`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                let tempImageNames = images.formImages;
                tempImageNames.push(res.data);
                axios.post(`${REACT_APP_API_URL}/animals/update/${id}`,{
                    type: animal.type,
                    name: animal.name,
                    breed: animal.breed,
                    age: animal.age,
                    description: animal.description,
                    shelter: animal.shelter,
                    traits: traits,
                    imgNames:tempImageNames
                })
            })
            .then(res => {console.log(res); onEdited(true); history.push('/home')})
            .catch((err) => console.log(`Error: ${err}`))
        } else {
            console.log("Form Images 2",images.formImages)
            // let tempImageNames = [];
            // images.formImages.map((image) => tempImageNames.push({}))
            axios.post(`${REACT_APP_API_URL}/animals/update/${id}`,{
                type: animal.type,
                name: animal.name,
                breed: animal.breed,
                age: animal.age,
                description: animal.description,
                shelter: animal.shelter,
                traits: traits,
                imgNames: images.formImages
            })
            .then(()=>{console.log("Animal Updated"); onEdited(true); history.push('/home') })
            .catch((err) => {console.log(`Error: ${err}`)})
        }
        
    }

    return (
         <AnimalForm  onLoad={getAnimal} onSubmit={updateAnimal} />
    )
}

export default EditAnimal
