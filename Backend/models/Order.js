const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    id: {
        type: String
    },
    username: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    previous_mrp: {
        type: Number,
    },
    discount: {
        type: String,
    },
    image: {
        type: String,
    },
    qty: {
        type: Number,
    },
    payment: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    devliverdate:{
        type:String
    },

    //Address
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
    phonenumber:{
        type:Number,
        required:true
    },

    //Total
    total:{
        type:Number
    },
    coupon:{
        type:Number
    }
},);

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;