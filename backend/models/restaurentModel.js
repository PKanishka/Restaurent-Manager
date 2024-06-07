const mongoose = require('mongoose')

const restaurentSchema = mongoose.Schema(
    {
        user:{
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'  
        },
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        address: {
            type: String,
            required: [true, 'Please add a address']
        },
        telephone: {
            type: String,
            required: [true, 'Please add a telephone']
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Restaurent', restaurentSchema)