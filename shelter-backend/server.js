//Dependencies
import express from 'express'
//import expressSession from 'express-session'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path'
import passport from 'passport'


//Schema
import mongoAnimals from './models/AnimalModel.js'
import mongoShelters from './models/ShelterModel.js'
import mongoUsers from './models/UserModel.js'

//Routes
import AnimalsRouter from './routes/Animals.js'
import SheltersRouter from './routes/Shelters.js'
import UsersRouter from './routes/Users.js'



/**
 * App Config
 */

Grid.mongo = mongoose.mongo
const app = express();
const port=process.env.PORT || 9000;

/**
 * Middlewares
 */
app.use(bodyParser.json());
app.use(cors())
//app.use(expressSession({secret: 'secret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * DB Config
 */

passport.use(mongoUsers.createStrategy());
passport.serializeUser(mongoUsers.serializeUser());
passport.deserializeUser(mongoUsers.deserializeUser());

const mongoURI='mongodb+srv://admin:AdminPassword@cluster0.tfuqy.mongodb.net/petfinder-db?retryWrites=true&w=majority'
const herokuURI='https://petfinder-react-app.herokuapp.com/'

const conn = mongoose.createConnection(mongoURI, {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let gfs

conn.once('open', () => {
    console.log('DB Connected')

    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('images')
})

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`

            console.log("New Filename",filename)
            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            };

            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });

mongoose.connect(mongoURI, {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

/**
 * API Routes
 */

app.get('/', (req,res) => res.status(200).send('Database Active'))

//Image Routes
app.post('/upload/image',upload.single('file'), (req,res) => {
    res.status(201).send(req.file)
})
app.post('/upload/images/',upload.array('file',9),(req,res) => {
    let tempResponse = []

    const filter = req.files.map((file) => {
        tempResponse.push({"src": `${herokuURI}/retrieve/images/single?name=${file.filename}`, "name":file.filename})
    })

    return Promise.all(filter).then(() => {
        res.status(201).send(tempResponse)
    })    
})
app.get('/retrieve/images/single', (req,res) => {
    gfs.files.findOne({filename: req.query.name}, (err,file)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            if(!file || file.length === 0) {
                res.status(404).json({err: "file not found"})
            } else{
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
                
            }
        }
    })
})

app.delete('/delete/image/:id', (req,res) => {
    gfs.remove({_id: req.params.id, root: "images"}, (err, gridStore) => {
        if(err){
            return res.status(400).json({err})
        } else {
            return res.status(200).send("Image Deleted from Server")
        }
    })
})

//Animal,Shelter,User Route Logic in seperate file
app.use('/animals', function(req, res, next) {
    req.animal_config = {
        grid: gfs
    };
    next();
}, AnimalsRouter);
app.use('/shelters', SheltersRouter);
app.use('/users', UsersRouter);

app.on('error', (err) => {
    console.log(err.message)
})

app.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})