const express = require('express')
const {
  Pool
} = require('pg')

const app = express()

app.use(express.urlencoded({
  extended: true
}))
app.set('view engine', 'pug')





//for safe use the connection parameters should safe to ENV variables
const user = 'postgres'
const host = 'localhost'
const database = 'dogs'
const password = 'new_password'
const port = 5432

const pool = new Pool({
  user,
  host,
  database,
  password,
  port
})

pool.connect()



//CREATE a Table in PSQL database, it is needed only first time
/*
const queryCreate = `
CREATE TABLE dogs (
    dogname varchar,
    age int
);
`

pool.query(queryCreate, (err, res) => {
  if (err) {
      console.error(err);
      return
  }
  console.log('Table is successfully created');
  //pool.end()
})
*/


  let items = []

  const querySelect = `SELECT * FROM dogs`

  pool.query(querySelect, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
    for (let row of res.rows) {
      //console.log(row)
      items.push(row)

    }

    console.log("Hello")

    
  console.log(items)  
  })
 




//pool.end()

app.listen(3000, () => {
  console.log(" App is listening")
})

app.get('/', (req, res) => {
  
    res.render('form', {
      items
    })
  })



app.post('/dog', (req, res) => {
  const name = req.body.dog
  const age = req.body.age
  console.log(name)
  const queryInsert = 'INSERT INTO dogs VALUES($1, $2)'
  const values = [name, age]
  console.log(values)

  pool.query(queryInsert, values, (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(result)
  })
  res.redirect('/')
})