const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id:{
        type:String
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
    qty:{
        type:Number,default: 1,
    }
},);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;