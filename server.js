//server .js
console.log('May Node be with you')



const express = require('express')
const bodyParser= require('body-parser')
const res = require('express/lib/response')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://ronaldli21:a@cluster0.6tper8l.mongodb.net/?retryWrites=true&w=majority'  // helps connect to the cloud.

// MongoClient.connect(connectionString, (err, client) => {             //call back version
//     if (err) return console.error(err)      
//     console.log('Connected to Database')
// })

MongoClient.connect(connectionString, { useUnifiedTopology: true })                 //this is promises isntead of callback  
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())


  //   app.get('/', (req, res) => {
  //       quotesCollection.find().toArray()
  //           .then(results => {
  //               // console.log(results)
  //               res.render('index.ejs',{quotes: results})
  //           })
  //           .catch(error => console.error(error))
  //     })
  //     app.post('/quotes', (req, res) => {
  //       quotesCollection.insertOne(req.body)
  //           .then(result => {
  //               console.log(result)
  //               res.redirect('/')
  //           })
  //           .catch(error => console.error(error))
  //     })
    

  // app.put('/quotes', (req, res) => {
    
  //   quotesCollection.findOneAndUpdate(
  //     {name: 'Yoda'},
  //     {
  //       $set: {
  //         name: req.body.name,
  //         quote: req.body.quote
  //       }
  //     },
  //     {
  //       upsert: true
  //     }
  //   )
  //   .then(result => {
  //     console.log(result)
  //     res,json('success')
  //   })
  //   .catch(error => console.error(error))
  // })
  // app.delete('/quotes', (req, res) => {
  //   quotesCollection.deleteOne(
  //     { name: req.body.name }
  //   )
  //     .then(result => {
  //       if (result.deletedCount === 0) {
  //         return res.json('No quote to delete')
  //       }
  //       res.json("Deleted Darth Vadar's quote")
  //     })
  //     .catch(error => console.error(error))
  //     })

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(quotes => {
        res.render('index.ejs', { quotes: quotes })
      })
      .catch(/* ... */)
  })

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

  app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
      { name: 'Yoda' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      }
    )
      .then(result => res.json('Success'))
      .catch(error => console.error(error))
  })

  app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
      { name: req.body.name }
    )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json('Deleted Darth Vadar\'s quote')
      })
      .catch(error => console.error(error))
  })



  app.listen(3000, function() {
    console.log('listening on 3000')
})

})
.catch(error => console.error(error))
// Make sure you place body-parser before your CRUD handlers!
// app.use(bodyParser.urlencoded({ extended: true }))





// // All your handlers here...
// app.get('/', (req, res) => {/*...*/})
// app.post('/quotes', (req, res) => {/*...*/})


// app.listen(3000, function() {
//     console.log('listening on 3000')
// })



// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
//     // Note: __dirname is the current directory you're in. Try logging it and see what you get!
//     // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
//   })




//   app.post('/quotes', (req, res) => {
//     console.log(req.body)
//   })

//   MongoClient.connect('mongodb-connection-string', (err, client) => {
//     // ... do something here
//   })