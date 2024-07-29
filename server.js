let express = require('express');
let app = express();
const db = require('./db.js');
const passport = require('./auth');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());



// Middle Ware
const logRequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false});
app.use(localAuthMiddleware);

app.get('/',function(req,res){
    res.send("Welcome Sir What can I Do For you")
})

const PersonRouter = require('./routes/PersonRoutes');
// const { password } = require('bun');

app.use('/Person',PersonRouter);


app.listen(PORT,() =>{
    console.log("Welcome to Indian Food Services")
})