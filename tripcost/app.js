const express = require('express')
const app = express()
const cors = require('cors')


const mongo = require('mongodb').MongoClient

app.use(express.json())
app.use(cors())

app.listen(3000, () => console.log('Server ready'))

let db, trips, expenses 
const url = "mongodb://localhost:27017"

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    db = client.db('tripcost')
    trips = db.collection('trips')
    expenses = db.collection('expenses')
})


app.post('/trip', (req, res) =>{
    const name = req.body.name
    console.log(trips)
    trips.insertOne({ name: name }, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
          }
          console.log(result)
          res.status(200).json({ ok: true })
    })

}) 



app.get('/trips', (req, res) =>{trips.find().toArray((err, items) => {
    if (err) {
      console.error(err)
      res.status(500).json({ err: err })
      return
    }
    res.status(200).json({ trips: items })
    })})
    
app.post('/expense', (req, res) =>{
    const trip = req.body.trip
    const date = req.body.date
    const amount = req.body.amount
    const category = req.body.category
    const desciption = req.body.desciption

    console.log(trips)
    trips.insertOne({ trip: trip, date: date, amount: amount, category: category, desciption: desciption }, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
          }
          console.log(result)
          res.status(200).json({ ok: true })
    })
})

app.get('/expenses', (req, res) =>{
    expenses.find({trips: req.body.trips}).toArray((err, items) => {
        if (err) {
          console.error(err)
          res.status(500).json({ err: err })
          return
        }
        res.status(200).json({ trips: items })
        })
})