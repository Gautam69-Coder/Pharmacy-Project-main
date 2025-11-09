const mongoose = require('mongoose');


const aiShcema = new mongoose.Schema({
    usertext: {
        type: String, 
    },
    response: {
        type: String,     
    }
},
)

const ai=mongoose.model("AI",aiShcema)

module.exports=ai;