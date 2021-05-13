import express from 'express'
import mongoAnimals from '../models/AnimalModel.js'
const router = express.Router();

router.route('/').post((req, res) => {
   mongoAnimals.find({shelter: {$in: req.body.shelters}},(err,data)=>{
       if(err){
           console.log(err)
       } else{
           console.log("Found Animals",data,req.body)
           res.status(200).send(data)
       }
   })
});

router.route('/:id').get((req,res)=>{
    console.log(req.params.id)
    mongoAnimals.find({_id:req.params.id}, (err,item) => {
        if(err){
            res.status(500).send(err)
        } else{
            res.status(200).send(item)
        }
    })
})

router.route('/update/:id').post((req,res) => {

    mongoAnimals.findById(req.params.id).then(
        animal => {
            animal.type = req.body.type;
            animal.name = req.body.name;
            animal.breed = req.body.breed;
            animal.age = Number(req.body.age);
            animal.description = req.body.description;
            animal.traits = req.body.traits;
            animal.imgNames = req.body.imgNames;

            animal.save()
                .then(() => res.json('Animal Updated'))
                .catch(err => res.status(400).send(`Error ${err}`))
        }
    ).catch(err => res.status(400).send(`Error: ${err}`))

})

/* Deleting Animal:
* 1. Find animal in DB from id.
* 2. Obtain each image names & Delete from GridFS (if Applicable)
* 3. Delete Animal from DB */
router.route('/:id').delete((req,res) => {
    var grid = req.animal_config.grid;
    
    mongoAnimals.findById(req.params.id)
        .then((data) => {
            data.imgNames.map((image) => {
                grid.remove({_id: image.name, root: "images"}, (err, gridStore) => {
                    if(err){
                        return res.status(400).json({err})
                    }
                })
            })
        })
        .then(() => {mongoAnimals.findByIdAndDelete(req.params.id, (error) => {
            if(error){
                res.status(400).send("ERROR DELETING ANIMAL")
            } else{
                res.status(200).send("Animal Deleted")
            }
        }) })
        .catch((err)=> {res.status(400).send(`Error Deleting: ${err}`)})

    }
)    


router.route('/upload').post((req,res) => {
    const dbPost = req.body
    console.log(dbPost)

    mongoAnimals.create(dbPost, (err,data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

export default router;