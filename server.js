let express = require('express');
let app = express();
const db = require('./db.js');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const Person = require('./models/Person');

app.get('/',function(req,res){
    res.send("Welcome Sir What can I Do For you")
})

const PersonRouter = require('./routes/PersonRoutes');

app.use('/Person',PersonRouter);


app.listen(PORT,() =>{
    console.log("Welcome to Indian Food Services")
})