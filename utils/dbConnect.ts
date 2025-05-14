import { MongoClient, Db } from 'mongodb';

let cachedDb: Db | null = null;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_IP}/${process.env.DB_APPNAME}?retryWrites=true&w=majority`;

export async function connectToDatabase(): Promise<Db> {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        const client = await MongoClient.connect(MONGODB_URI);
        const db = client.db(process.env.DB_APPNAME);
        
        cachedDb = db;
        
        console.log('Successfully connected to MongoDB.');
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

export function getDb(): Db | null {
    return cachedDb;
}

export async function disconnectDatabase(): Promise<void> {
    if (cachedDb) {
        const client = (cachedDb as any).client;
        await client.close();
        cachedDb = null;
        console.log('Disconnected from MongoDB.');
    }
}