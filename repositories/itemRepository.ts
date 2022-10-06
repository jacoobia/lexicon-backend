import { IItem, Item } from '../model/itemModel';

/**
 * Grabs all of the items from the database
 * @returns An array of IItem objects
 */
export const allItems = async(): Promise<IItem[]> => {
    return await Item.find({});
}

/**
 * Find an Item document in the database based on
 * a string ID passed in. Has to return null on 
 * error because the promise will return a null 
 * value rather than undefined
 * @param id The String ObjectId of the document
 * @returns IItem or Null if not found
 */
export const findOneById = async(id: string): Promise<IItem | null> => {
    try {
        return await Item.findOne({ _id: id });
    } catch(err) {
        return null;
    }
}

export const findByName = async(name: string) => {
    return await Item.find( {"name": { $regex: new RegExp(`^${name}`, "i") } } );
} 

export const create = async(data: IItem): Promise<IItem | string> => {
    try {
        const found = await findByName(data.name);
        if(!found.length) {
            return Item.create(data);
        }
        return `A record for the item ${data.name} already exists.`;
    } catch(err) {
        return `An error occurred trying to create a record for ${data.name}.`;
    }
}

export const deleteRecords = async(ids: string[]) => {
    try {
        return await Promise.all(
        ids.map(async (id: string) => {
            const deleteResult = await Item.findByIdAndDelete(id);
            return { id: id, deleted: deleteResult !== null };
        }));
    } catch(err) {
        return `An error occurred trying to delete those records.`;
    }
}