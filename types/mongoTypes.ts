import mongoose from 'mongoose';

// Required types
export const reqString = { type: String, required: true };
export const reqNumber = { type: Number, required: true };
export const reqBoolean = { type: Boolean, required: true };
export const reqDate = { type: Date, required: true };
export const reqObjectId = { type: mongoose.Types.ObjectId, required: true }