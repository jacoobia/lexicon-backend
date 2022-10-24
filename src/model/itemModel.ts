import * as runtypes from 'runtypes';
import mongoose from 'mongoose';
import { reqDate, reqNumber, reqString } from '../types/mongoTypes';

/**
 * The item interace that all items 
 * should match
 */
export interface IItem {
    name: string,
    description: string,
    rarity: number,
    gold: number,
    silver: number,
    copper: number,
    added: Date
};

/**
 * The validator for an IItem
 */
export const validator = runtypes.Record({
    name: runtypes.String,
    description: runtypes.String,
    rarity: runtypes.Number.withConstraint(n => n <= 4 && n >= 0),
    gold: runtypes.Number.optional(),
    silver: runtypes.Number.optional(),
    copper: runtypes.Number.optional(),
});

/**
 * The Item Schema based on the item
 * interface previously defined
 */
export const schema = new mongoose.Schema<IItem>({
    name: reqString,
    description: reqString,
    rarity: reqNumber,
    gold: reqNumber,
    silver: reqNumber,
    copper: reqNumber,
    added: reqDate
});

/**
 * Finally, the model to interact with
 * the database through
 */
export const Item = mongoose.model<IItem>('Item', schema);