const mongoose = require('mongoose')
const { validator } = require('../utils')

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        trime: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: { validator: validator.validateEmail, message: 'Please fill a valid email address', isAsync: false },
        match: [validator.emailregex, 'Please fill a valid email address']
    },
    mobile: {
        type: Number,
        unique: true,
        required: 'Mobile Noo. is required',
        validate: { validator: validator.validateMobile, message: 'Please fill a valid email address', isAsync: false },
        match: [validator.mobileregex, 'Please fill a valid email address']
    },
    collegeId: {
        type: mongoose.Types.ObjectId,
        ref: ' College'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Intern', internSchema, 'intern')