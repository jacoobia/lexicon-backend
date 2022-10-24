import { Response } from 'express';

export const validateRequest = (data: any, validator: any, res: Response): boolean => {
    const result = validator.validate(data);
    if(result.success) {
        return true;
    } else {
        res.status(400).json({ success: false, data: result.details});
        return false;
    }
}