const Message = require('../models/Message');

exports. storeMessage = async (req, res) =>{
   try{
    const {message, day, time} = req.body;

    if(!message || !day || !time){
        return res.status(400).json({error: 'Fill all required field'})
    }

    const newMessage = new Message({
        message,
        day,
        time
    });

    await newMessage.save();

    res.status(201).json({
        message: 'Message stored',
        data: newMessage
    });
   }catch(err){
    res.status(500).json({error: 'Internal Server Error'});
   }
};