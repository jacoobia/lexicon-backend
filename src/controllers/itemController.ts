import * as runtypes from 'runtypes';
import { Request, Response } from 'express';
import { IItem, validator } from '../model/itemModel';
import { allItems, create, remove, findOneById, search } from '../repositories/itemRepository';
import { validateRequest } from '../helpers/request';

// TODO Paginate to max page size of around 50 maybe? maybe even put in its own function/endpoint
export const getAllItemRecords = async (req: Request, res: Response) => {
    try {
        const items = await allItems();
        res.status(200).json({ success: true, data: items });
    } catch(err) {
        console.log(err);
        res.status(400).json({ success: false, error: 'An error was thrown trying to process your request.' });
    }
};

/**
 * Tries to convert the input to an ObjectID and lookup the item.
 * Doesn't require type validation since everything will come in
 * from req.params as a string 
 * @param req The request received
 * @param res The response to send
 */
export const getItemRecordById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const found: IItem | null = await findOneById(id);
        if(found) {
            res.status(200).json({ success: true, data: found}); 
        }
        else res.status(404).json({ success: false, data: `No record could be found for the ID: ${id}.`});
    } catch(err) {
        res.status(400).json({ success: false, error: 'An error was thrown trying to process your request.' });
    }
}

/**
 * Create an item based on passed in JSON object, validates that
 * it matches our pattern with allowed optionals and rejects anything
 * extra. Will auto fill the optional values if not present
 * @param req The request received
 * @param res The response to send
 */
export const createItemRecord = async(req: Request, res: Response) => {
    try {
        if(validateRequest(req.body, validator, res)) {
            const data = {
                ...req.body,
                ...(!req.body.gold && { gold: 0 }),
                ...(!req.body.silver && { silver: 0 }),
                ...(!req.body.copper && { copper: 0 }),
                added: new Date(),
            };

            const created: IItem | String = await create(data); 
            if(typeof created !== 'string') {
                res.status(200).json({ success: true, data: created});
            }
            else res.status(400).json({ error: created });
        }
    } catch(err) {
        res.status(400).json({ success: false, error: 'An error was thrown trying to process your request.' });
    }
}

/**
 * Delete records based on passed in object ID's and return the result 
 * @param req The request received
 * @param res The response to send
 */
export const deleteItemRecords = async(req: Request, res: Response) => {
    try {
        const validation = runtypes.Record({ itemIds: runtypes.Array(runtypes.String) }); 
        if(validateRequest(req.body, validation, res)) {
            const deleteResults = await remove(req.body.itemIds);
            res.status(400).json({ data: deleteResults });
        }
    } catch(err) {
        res.status(400).json({ success: false, error: 'An error was thrown trying to process your request.' });
    }
}

export const searchItemRecords = async(req: Request, res: Response) => {
    try {
        console.log(req.body);
        console.log(req.query);
        const validation = runtypes.Record({ name: runtypes.String });
        if(validateRequest(req.body, validation, res)) {
            const name = req.body.name;
            const found: IItem[] | null = await search(name);
            if(found && found.length) {
                res.status(200).json({ success: true, data: found}); 
            } else {
                res.status(200).json({ success: false, error: `Unable to find items based on the input ${name}.` }); 
            }
        }
    } catch(err) {
        res.status(400).json({ success: false, error: 'An error was thrown trying to process your request.' });
    }
}