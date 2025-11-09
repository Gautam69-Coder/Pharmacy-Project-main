const mongoose =require('mongoose');

const Doctors=mongoose.Schema({
    id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: String, 
    required: true
  },
  image: {
    type: String 
  },
  availability: {
    type: String 
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  fee: {
    type: String 
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  location: {
    type: String
  },
  languages: {
    type: [String], 
    default: []
  },
  consultationType: {
    type: [String], 
    default: []
  },
  nextSlot: {
    type: String 
  },
  badges: {
    type: [String], 
    default: []
  },
  education: {
    type: String
  },
  about: {
    type: String
  }
},{ timestamps: true })

module.exports=mongoose.model('Booked Doctors', Doctors);