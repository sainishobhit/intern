const { validator } = require('../utils')
const { internModel, collegeModel } = require('../models')

const registerIntern = async function (req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const requestBody = req.body;
        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Please provide Details' })
            return
        }

        const { name, email, mobile, collegeName } = requestBody;

        if (!validator.isValid(name)) {
            res.status(400).send({ status: false, message: 'Name is Required' })
            return
        }

        if (!validator.isValid(email)) {
            res.status(400).send({ status: false, message: 'email is Required' })
            return
        }

        if (!validator.isValid(mobile)) {
            res.status(400).send({ status: false, message: 'mobile is Required' })
            return
        }

        if (!validator.isValid(collegeName)) {
            res.status(400).send({ status: false, message: 'collegeName is Required' })
            return
        }

        if (!validator.isValidString(name)) {
            res.status(400).send({ status: false, message: 'Name should be a string' })
            return
        }

        if (!validator.isValidString(collegeName)) {
            res.status(400).send({ status: false, message: 'collegeName should be a string' })
            return
        }

        if (!validator.validateEmail(email)) {
            res.status(400).send({ status: false, message: 'Invalid Email Id' })
            return
        }

        if (!validator.validateMobile(mobile)) {
            res.status(400).send({ status: false, message: 'Invalid Mobile No.' })
            return
        }

        const isEmailAlreadyUsed = await collegeModel.findOne({ email })

        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email} is already in use` })
        }

        const isMobileAlreadyUsed = await collegeModel.findOne({ mobile })

        if (isMobileAlreadyUsed) {
            res.status(400).send({ status: false, message: `${mobile} is already in use` })
        }

        const college = await collegeModel.findOne({ name: collegeName })
        const collegeId = college._id

        if (!collegeId) {
            res.status(400).send({ status: false, message: 'College name does not exist' })
            return
        }

        const internData = { name, email, mobile, collegeId }
        let newIntern = await internModel.create(internData)

        let details = { isDeleted: newIntern.isDeleted, name: newIntern.name, email: newIntern.email, mobile: newIntern.mobile, collegeId: newIntern.collegeId }
        res.status(201).send({ status: true, message: "Intern Details added :", data: details })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const getIntern = async function (req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    try {

        if (req.query && Object.keys(req.query).length == 0) {
            res.status(400).send({ status: false, message: 'Require query params' })
            return
        }

        const college = await collegeModel.findOne({ name: req.query.collegeName, isDeleted: false })

        if (!college) {
            res.status(400).send({ status: false, message: 'College does not exist' })
            return
        }

        const interns = await internModel.find({ collegeId: college._id }, { name: 1, email: 1, mobile: 1 })
        let details = { name: college.name, fullName: college.fullName, logoLink: college.logoLink, interns: interns }

        res.status(200).send({ status: true, data: details })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {
    getIntern, registerIntern
}