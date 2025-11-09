const mongoose=require('mongoose')

const addressSheema=new mongoose.Schema({
    fullname:String,
    pincode:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },

});

const address=mongoose.model('UserAddress',addressSheema)

module.exports=address