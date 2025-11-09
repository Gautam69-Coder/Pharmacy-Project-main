const mongoose =require('mongoose')

const FeedbackSchema=new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    subject: String,
    message: String
})

const feedback = mongoose.model('FeedBack', FeedbackSchema);

module.exports = feedback;