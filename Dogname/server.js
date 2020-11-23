const express = require('express')
const mongo = require('mongodb').MongoClient
let collection = null

const app = express()

app.use(express.urlencoded({extended:true}))


const connectToMongo = () => {

    const url = "mongodb://localhost:27017"
    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("Connection is successful!")

        const db = client.db('dogs')

        collection = db.collection('dogsname')

        

    })
}

connectToMongo()
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    collection.find().toArray((err, items) => {
        if (err) {
            console.error(err)
            return
        }

        res.render('form', {items})

    })

})

app.listen(3000, () => {
    console.log(" App is listening")
})

app.post('/dog', (req, res) =>{
    const name = req.body.dog
    //console.log(name)
    
    collection.insertOne({ "name": name}, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(result)
    })
    res.redirect('/')
})