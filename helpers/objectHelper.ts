import mongoose, { Types } from 'mongoose';

/**
 * Cleans all undefined, null or empty object params
 * @param obj The object to clean
 */
export const clean = (obj: any): void => {
    const keys = Object.keys(obj);
    for (var key in keys) {
        if (obj[key] === null || obj[key] === undefined || !obj[key].length) {
            delete obj[key];
        }
    }
}

/**
 * Checks to make sure an object has a set of keys that
 * matches a pattern.
 * @param obj The object to match keys again
 * @param pattern The object to use as the pattern
 * @returns 
 */
export const keyMatch = (obj: any, pattern: any): boolean => {
    const objKeys = Object.keys(obj);
    const patternKeys = Object.keys(pattern);
    for(const key in objKeys) {
        if(!patternKeys.includes(objKeys[key])) {
            return false;
        }
    }
    return true;
}

/**
 * Converts an object of properties into an object of those
 * properties constructed to be case insensitive when used
 * in a mongodb query.
 * @param obj the object to convert
 * @returns a new set of objects
 */
export const convertToCaseInsensitive = (obj: any) => {
    const result: any = [];
    const keys = Object.keys(obj);
    for(const index in keys) {
        const key = keys[index];
        result.push({key: {'$regex': `^${obj[key]}$`, $options: 'i'}});
    }
    return result;
}

export const convertToObjectId = (id: any): Types.ObjectId => {
    return new mongoose.Types.ObjectId(id);
}