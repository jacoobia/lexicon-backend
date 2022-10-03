import express from 'express';
import { Setup } from './Config';

const app = express();
const port = process.env.PORT || 8100;

app.use(express.json());
app.listen(port, Setup);