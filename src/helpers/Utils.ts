import {NextFunction, Request, Response} from "express";
import httpError from "http-errors";
import { Pool } from 'pg';
const {NODE_ENV, HOST, DB_USER, DB_NAME, DB_PASSWORD} = process.env;

export const error404 = (req: Request, res: Response, next: NextFunction) => {
 return next(httpError(404));
}

export const errorHandling = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status || 500).send({
    status: "error",
    message: err.message,
    stack: NODE_ENV === 'development' ? err.stack : {},
  });
}

export const connectDatabase = () => {
  const pool = new Pool({
    user: DB_USER,
    host: HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: 5432
  });
  return pool.connect();
}

