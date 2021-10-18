const { validator } = require('../utils')
const { collegeModel } = require('../models')

const registerCollege = async function (req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const requestBody = req.body;
        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Please provide Details' })
            return
        }

        const { name, fullName, logoLink } = requestBody;

        if (!validator.isValid(name)) {
            res.status(400).send({ status: false, message: 'Name is Required' })
            return
        }

        if (!validator.isValid(fullName)) {
            res.status(400).send({ status: false, message: 'fullName is Required' })
            return
        }

        if (!validator.isValid(logoLink)) {
            res.status(400).send({ status: false, message: 'logoLink is Required' })
            return
        }

        if (!validator.isValidString(name)) {
            res.status(400).send({ status: false, message: 'Name should be a string' })
            return
        }

        if (!validator.isValidString(fullName)) {
            res.status(400).send({ status: false, message: 'fullName should be a string' })
            return
        }

        if (!validator.isValidString(logoLink)) {
            res.status(400).send({ status: false, message: 'logoLink should be a string' })
            return
        }

        const isNameAlreadyUsed = await collegeModel.findOne({ name })

        if (isNameAlreadyUsed) {
            res.status(400).send({ status: false, message: `${name} is already created` })
        }

        const collegeData = { name, fullName, logoLink }
        const college = await collegeModel.create(collegeData)

        let details = { name: college.name, fullName: college.fullName, logoLink: college.logoLink, isDeleted: college.isDeleted }
        res.status(201).send({ status: true, data: details })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { registerCollege }