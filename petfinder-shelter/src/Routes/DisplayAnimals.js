
import React, {useState} from 'react'

import { Link } from 'react-router-dom';


import Grid from '@material-ui/core/Grid'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import Navbar from '../Components/Navbar/Navbar';
import DataTable from '../Components/DataTable/DataTable.js'
import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL : "http://localhost:5000"



const DisplayAnimals = ({animals, headers, onDelete}) => {
    const [selected,onSelect] = useState({})

    const deleteAnimal = async (e) => {
        e.preventDefault()
        selected.id !== undefined && 
            axios.delete(`${REACT_APP_API_URL}/animals/${selected.id}`)
                .then((res) => {console.log(res); onDelete(true)})
                .catch((err) => {console.log(err)})
        
    }

    if(animals && headers){
        return (
            <Grid container justify="center" align-items="center" style={{"textAlign":"center"}}>
                <Grid item xs={12}>
                  <Navbar title='Animals '/>
                </Grid>
                <Grid item xs={12}>
                  <DataTable animals={animals} headers = {["id","type","name","breed","age","description","traits","images","shelter"]} onSelect={onSelect}/>
                </Grid>
                <Grid item xs= {4} md={2} lg={1}>
                    <Link to={selected.id !== undefined ? `/edit/${selected.id}` : "#"}>
                        <IconButton aria-label="Edit an Animal">
                            <EditIcon fontSize="large"/>
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item xs= {4} md={2} lg={1}>
                    <Link to="/add">
                        <IconButton aria-label="Add an Animal">
                            <AddCircleIcon fontSize="large"/>
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item xs= {4} md={2} lg={1}>
                    <IconButton aria-label="Delete Selected Animal" onClick={(e) => {deleteAnimal(e)}}>
                        <DeleteForeverIcon fontSize="large"/>
                    </IconButton>
                </Grid>
              </Grid>
        )
    } else return(<div></div>)
    
}

export default DisplayAnimals
