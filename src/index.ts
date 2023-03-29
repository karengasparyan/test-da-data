require('dotenv').config();
import morgan from 'morgan';
import indexRouter from './routes';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import path from "path";
import {error404, errorHandling} from "./helpers/Utils";
const { PORT } = process.env;
import {db} from './helpers/db'

const app = express();
app.use(cors());
app.use(json({}));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api', indexRouter);
app.use(error404);
app.use(errorHandling);

const server = http.createServer(app);

db.connect().then(async () => {
    console.log('db connected')
    await db.query(`
    CREATE TABLE IF NOT EXISTS organization (
    id SERIAL PRIMARY KEY,
    value VARCHAR(255) UNIQUE NOT NULL,
    find_id VARCHAR(255) UNIQUE NOT NULL    
    );`)
})
// I know about Sequelize and Typeorm
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});