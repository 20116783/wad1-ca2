'use strict';

import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import routes from './routes.js';
import logger from './utils/logger.js';
import { create } from 'express-handlebars';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }));

const handlebars = create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use('/', routes);

app.listen(port, () => logger.info(`Your app is listening on port ${port}`));
