const controller=require('./controller')
const express = require('express');
const router = express.Router();


router.get('/', controller.getdataSets)
router.get('/:id', controller.getdataSetsById)

router.post('/',controller.addDataSets)
router.delete('/:id',controller.deleteDataSets)


module.exports = router;