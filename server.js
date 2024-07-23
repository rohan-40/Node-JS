let express = require('express');
let app = express();
const db = require('./db.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const Person = require('./models/Person');

app.get('/',function(req,res){
    res.send("Welcome Sir What can I Do For you")
})

const PersonRouter = require('./routes/PersonRoutes');

app.use('/Person',PersonRouter);


app.listen(3000,() =>{
    console.log("Welcome to Indian Food Services")
})