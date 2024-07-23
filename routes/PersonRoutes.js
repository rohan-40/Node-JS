const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/', async (req,res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log("data Saved");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})

// To get All Data of the Person
router.get('/',async(req,res) =>{
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