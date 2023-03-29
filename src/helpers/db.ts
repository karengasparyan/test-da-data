import { Client, QueryResult } from 'pg';

interface IDatabaseConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

export default class Database {
    private client: Client;

    constructor(private config: IDatabaseConfig) {
        this.client = new Client(config);
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
            console.log('Connected to database');
        } catch (error) {
            console.error('Error connecting to database', error);
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.client.end();
            console.log('Disconnected from database');
        } catch (error) {
            console.error('Error disconnecting from database', error);
        }
    }

    async query(sql: string, values: any[] = []): Promise<any[] | null> {
        try {
            const result: QueryResult = await this.client.query(sql, values);
            return result.rows;
        } catch (error) {
            console.error('Error executing query', error);
            return null;
        }
    }
}

const dbConfig: IDatabaseConfig = {
    user: 'admin',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
};

export const db: Database = new Database(dbConfig);