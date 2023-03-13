const controller=require('./controller')
const express = require('express');
const router = express.Router();


router.get('/', controller.getdataSets)
router.get('/:id', controller.getdataSetsById)

router.post('/',controller.addDataSets)



module.exports = router;