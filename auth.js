// Authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require('./models/Person'); 

passport.use(new LocalStrategy(async (USERNAME,pwd,done) =>{
    try{
        console.log("Recieved Credinetials: ",USERNAME,pwd);
        const user = await Person.findOne({username:USERNAME});
        if(!user)
        {
            return done(null,false,{message: "Incorrect Username"})
        }
        const isUserMatch = await user.comparePassword(pwd);
        if(isUserMatch)
        {
            return done(null,user);
        }
        else{
            return done(null,false,{message : "Incorrect Password"})
        }
    }
    catch(err)
    {
        return done(err);
    }
}))

module.exports = passport;