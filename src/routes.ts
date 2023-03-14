import { getdataSets, getdataSetsById, addDataSets, deleteDataSets } from './controller';
import express from 'express';
const router = express.Router();


router.get('/', getdataSets)
router.get('/:id', getdataSetsById)

router.post('/', addDataSets)
router.delete('/:id', deleteDataSets)


export { router }