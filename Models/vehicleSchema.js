const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehicleSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required:true
    },
    manufacturer: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required:true
    }
},
    {timestamps:true}
)

vehicleSchema.index({createdAt:1}, {expireAfterSeconds:(60*60*24*3)}) //Delete data after 3 days since its creation

const Car = mongoose.model('Car', vehicleSchema);

module.exports = Car;