import { Router } from 'express';
import cleanPayload from '../middleware/genericMiddlewares';
import { getAllItemRecords, getItemRecordById, createItemRecord, deleteItemRecords, searchItemRecords } from '../controllers/itemController';

const itemRouter = Router();

itemRouter.use(cleanPayload);

// Get ALL items in the database
itemRouter.get('', getAllItemRecords);

itemRouter.post('/search', searchItemRecords);

// Get an item record by its ID
itemRouter.get('/:id', getItemRecordById);

// Create an item record
itemRouter.post('/create', createItemRecord);

// Delete records by id
itemRouter.post('/delete', deleteItemRecords);

export default itemRouter;