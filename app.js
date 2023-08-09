const express = require('express');

const app = express();
// const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const port = 80;

// Express Specific Code
app.use('/static',express.static('static'));
app.use(express.urlencoded());

// Pug Specific Code
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

// Mongoose Related Stuff
main1().catch(err => console.log(err));
let contact;
async function main1() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // Define Mongoose Schema
  const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: String,
    passion: String
  });

  contact = mongoose.model('contact', contactSchema);
}
main1();



// Pug specific Endpoint
app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        // alert("This item has been saved to the Database");
        res.send("This item has been saved to the Database")
    }).catch(()=>{
        res.status(404).send("Item was not saved to the Database")
    })

    // res.status(200).render('contact.pug');
})

// For Listening the Code or For Running
app.listen(port,()=>{
    console.log(`Application Listening Succesfully Started on Port localhost:${port}`);
})