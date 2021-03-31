const express=require("express");
const path=require("path");
const fs=require("fs");
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/danceData', {useNewUrlParser: true, useUnifiedTopology: true});

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });
 const Contact = mongoose.model('Contact', contactSchema);
 


const port=80;
const app=express();

app.use('/static', express.static('static'));
app.use(express.urlencoded());


app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));


app.get('/', (req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
});
app.get('/contact', (req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
});
app.post('/contact', (req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    //res.status(200).render('contact.pug');
});
app.listen(port ,()=>{
    console.log(`The application started on port ${port}`);
});