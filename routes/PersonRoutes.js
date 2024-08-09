const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleWare, generateToken} = require('./../jwt');
// const { error } = require('console');

router.post('/signup', async (req,res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log("data Saved");

        const payload = {
            id: response.id,
            username: response.username,
        }
        const token = generateToken(payload);
        console.log("Token: ",token);

        res.status(200).json({response:response ,token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})

router.post('/login', async(req,res) =>{
    try{
        const {username,password} = req.body;

        const user = await Person.findOne({username:username});
         
        if(!user || !(await user.comparePassword(password)))
        {
            return res.status(401).json({error : 'Invalid username or password'});
        }
        
        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);

        res.json({token});
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.get('/profile',jwtAuthMiddleWare, async(req,res) =>{
    try{
        const userData = req.user;
        console.log("UserData: ",userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: "Internal Server error"});
    }
})

// To get All Data of the Person
router.get('/', jwtAuthMiddleWare,async(req,res) =>{
    try{
        const data = await Person.find();
        console.log("Data Fetched");
        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
        res.status(500),json({error: 'Internal Server Error'});
    }
})


// To get data from their work type
router.get('/:workType', async(req,res) => {
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager')
        {
            const response = await Person.find({work : workType});
            console.log("Data fetched Succesfully");
            res.status(202).json(response);
        }
        else{
            res.status(404).json({error : 'Invalid Data Type'});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async(req,res) => {
    try{
        const PersonId = req.params.id;
        const UpdatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(PersonId,UpdatedPersonData, {
            new: true,
            runValidators: true
        })

        if(!response)
        {
            return res.status(404).json({error: 'Person Not Found'})
        }

        console.log('Data Updated');
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.delete('/:id', async(req,res) => {
    try{

        const PersonId = req.params.id;
        const response = await Person.findByIdAndDelete(PersonId);
        
        if(!response)
        {
            return res.status(404).json({error: 'Person Not Found'})
        }

        console.log('Data Deleted');
        res.status(200).json({message : 'Person Deleted Successfully'});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;