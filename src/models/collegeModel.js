const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'College name is required',
        uppercase: true,
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        required: " college's name is required",
    },
    logolink: {
        type: String,
        required: 'Title is required'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('College', collegeSchema, 'college')