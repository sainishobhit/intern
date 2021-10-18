const express = require('express');
const router = express.Router();
const { internController, collegeController } = require('../controllers')

router.post('/colleges', collegeController.registerCollege);

router.post('/interns', internController.registerIntern);
router.get('/collegeDetails', internController.getIntern);

module.exports = router;