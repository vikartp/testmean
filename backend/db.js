const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', (error)=>{
    if(error){
        console.log('Error in Connection: ' + error);
    }else{
        console.log('Mongo Connection Successful');
    }
})

module.exports = mongoose;