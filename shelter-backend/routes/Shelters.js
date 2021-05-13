import express from 'express'
import mongoShelters from '../models/ShelterModel.js'

const router = express.Router();

router.route('/').get((req, res) => {
    mongoShelters.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

router.route('/upload').post((req,res) => {
    const dbPost = req.body
    console.log(dbPost)

    mongoShelters.create(dbPost, (err,data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

export default router;