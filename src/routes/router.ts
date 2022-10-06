import { Router } from 'express';
import itemRouter from './itemRoutes';

// The root router of the app directing requests to their corresponding controller
const routes = Router();

routes.use("/items", itemRouter);

export default routes;