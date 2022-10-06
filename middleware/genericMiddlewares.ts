import { NextFunction, Response, Request } from 'express';
import { clean } from '../helpers/objectHelper';

const cleanPayload = (request: Request, response: Response, next: NextFunction) => {
    if(request.body) {
        clean(request.body);
    }
    if(request.query) {
        clean(request.query);
    }
    next();
}

export default cleanPayload;