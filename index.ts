import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import Setup from './src/config';
import routes from './src/routes/router';

const app = express();
const port = process.env.PORT || 8100;

// Enable a default set of strict headers with the helmet middleware
app.use(helmet());

// Enable cors with the cors default middleware 
app.use(cors());

// Configure express to use JSON payloads
app.use(express.json());

// Setup our primary router to direct all requests
app.use(routes);

// Run our setup hook when the port successfully binds 
app.listen(port, Setup);