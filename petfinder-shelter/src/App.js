import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios'
import './App.css'


import DisplayAnimals from './Routes/DisplayAnimals'
import AddAnimal from './Routes/AddAnimal'
import EditAnimal from './Routes/EditAnimal';
import Login from './Routes/Login';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL : "http://localhost:5000"

function App() {

  const [animals,setAnimals] = useState([])
  const headers = ["Type","Name","Breed","Age","Description","Traits","Shelter"]
  const [user,setUser] = useState({username: "", shelter: ""})
  const [refresh,onRefresh] = useState(false)


  
  
  useEffect(() => {

    const getAnimals = async () => {
      axios.post(`${REACT_APP_API_URL}/animals`,{
        "shelters":[user.shelter]
      })
        .then(res => setAnimals(res.data))
        .catch(err => console.log(err))
    }
    
    getAnimals();
    onRefresh(false)
  },[user, refresh])
  
  return (

    <Router>
      <div className='app'>
       <Route path='/' exact>
          <Login onLogin={setUser}/>
        </Route>
        <Route path='/home' >
          <DisplayAnimals onDelete={onRefresh} animals={animals} headers={headers} />
        </Route>
        <Route path='/add'>
          <AddAnimal user={user} onAdd={onRefresh}/>
        </Route>
        <Route path='/edit/:id' render={(props) => (<EditAnimal {...props} onEdited={onRefresh} />)}>
        </Route>
        </div>
    </Router>
  

  );
}

export default App;
