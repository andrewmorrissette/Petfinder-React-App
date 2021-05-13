import React from 'react'
import { DataGrid } from '@material-ui/data-grid'


const DataTable = ({animals = [{}], headers, onSelect, ...props}) => {
    const columns = [];
    const rows = [];
    

    if(animals){
        
        //Refactor
        if(!headers){
            let animalKeys = animals[0];
            if (animalKeys){
                headers = Object.keys(animalKeys)
            }      
                    
        } 
        if(headers) {
            headers.forEach((header) =>{
                if(header !== "__v"){
                    if(header=== "_id"){
                        header="id";
                    }
                    if(header === "description" || header === "traits"){
                        columns.push({field: header, headerName: header, flex: 1 })
                    } else{
                        columns.push({field: header, headerName: header, width: 120 })
                    }
                    
                }
            })
        }

        
        animals.forEach((animal)=>{
            let row = {}
            let animalEntries = Object.entries(animal);

            animalEntries.forEach((animalValues)=>{
                if(animalValues[0] !== "__v"){
                    if(animalValues[0]==="imgNames"){
                        animalValues[0] = "images"
                        animalValues[1] = animalValues[1].length
                    } else{
                        if(Array.isArray(animalValues[1])){
                            animalValues[1] = animalValues[1].join(', ')
                        }
                    }
                    
                    if(animalValues[0]==="_id"){
                        animalValues[0]="id"
                    }
                    
                    row[animalValues[0]] = animalValues[1];
                }
            })
            rows.push(row);
        })
        
        return (
            <div className='table' style={{height:500, width: '100%'}}>
                <div style={{display:'flex', height:"100%"}}>
                    <div style={{flexGrow:1}}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} disableExtendRowFullWidth={false}disableMultipleSelection={true} onRowSelected={(selection)=>{onSelect(selection.data)}}  />

                    </div>
                </div>
                
            </div>
            
        )
    } else {
        return (
            <div></div>
        )
    }
}


export default DataTable

