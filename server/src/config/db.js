import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import { Pool } from 'pg';
import { MongoClient } from 'mongodb';

dotenv.config();

let pool;
let mongoClient;
let dbMode;

const postgresConnectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.SUPABASE_DB_URL || 'postgresql://postgres:postgres@127.0.0.1:5432/luxestep';
const mongoConnectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luxestep';
const mongoDatabaseName = process.env.MONGO_DB || 'luxestep';

export const getDatabaseMode = () => {
  if (dbMode) return dbMode;

  if (process.env.NODE_ENV === 'production') {
    dbMode = 'postgres';
    return dbMode;
  }

  dbMode = process.env.MONGO_URI ? 'mongo' : 'postgres';
  return dbMode;
};

export const getDBClient = async () => {
  const mode = getDatabaseMode();

  if (mode === 'mongo') {
    if (!mongoClient) {
      mongoClient = new MongoClient(mongoConnectionString, {
        serverSelectionTimeoutMS: 5000,
      });
      await mongoClient.connect();
    }

    return {
      client: mongoClient,
      db: mongoClient.db(mongoDatabaseName),
    };
  }

  if (!pool) {
    pool = new Pool({
      connectionString: postgresConnectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
  }

  return pool;
};

const normalizeMongoRow = (row) => {
  if (!row) return null;
  const normalized = { ...row };
  if (normalized._id && !normalized.id) {
    normalized.id = normalized._id.toString();
  }
  if (normalized.id && !normalized._id) {
    normalized._id = normalized.id;
  }
  return normalized;
};

export const createOrUpdateRecord = async (table, payload) => {
  const mode = getDatabaseMode();
  const id = payload.id || payload._id || randomUUID();
  const safePayload = { ...payload, id };

  if (mode === 'mongo') {
    safePayload._id = id;
    const { db } = await getDBClient();
    const collection = db.collection(table);
    await collection.updateOne({ _id: id }, { $set: safePayload }, { upsert: true });
    const created = await collection.findOne({ _id: id });
    return normalizeMongoRow(created);
  }

  const client = await getDBClient();
  const fields = Object.keys(safePayload);
  if (!fields.length) return null;

  const fieldList = fields.join(', ');
  const placeholders = fields.map((_, index) => `$${index + 2}`).join(', ');
  const updateSet = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
  const values = fields.map((field) => safePayload[field]);

  const result = await client.query(
    `INSERT INTO ${table} (id, ${fieldList}) VALUES ($1, ${placeholders}) ON CONFLICT (id) DO UPDATE SET ${updateSet} RETURNING *`,
    [id, ...values]
  );

  return result.rows[0] || null;
};

export const getAllRows = async (table) => {
  const mode = getDatabaseMode();

  if (mode === 'mongo') {
    const { db } = await getDBClient();
    const rows = await db.collection(table).find({}).toArray();
    return rows.map(normalizeMongoRow);
  }

  const client = await getDBClient();
  const result = await client.query(`SELECT * FROM ${table} ORDER BY created_at DESC`);
  return result.rows;
};

export const deleteRecord = async (table, id) => {
  const mode = getDatabaseMode();

  if (mode === 'mongo') {
    const { db } = await getDBClient();
    await db.collection(table).deleteOne({ _id: id });
    return true;
  }

  const client = await getDBClient();
  await client.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
  return true;
};

const initializeSchema = async () => {
  const mode = getDatabaseMode();

  if (mode === 'mongo') {
    const { db } = await getDBClient();
    await db.collection('users').createIndex({ id: 1 }, { unique: true });
    await db.collection('products').createIndex({ id: 1 }, { unique: true });
    await db.collection('orders').createIndex({ id: 1 }, { unique: true });
    return;
  }

  const client = await getDBClient();
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      tags TEXT[] DEFAULT ARRAY[]::TEXT[],
      description TEXT NOT NULL,
      retail_price NUMERIC NOT NULL,
      sale_price NUMERIC,
      sku TEXT NOT NULL UNIQUE,
      current_stock INTEGER NOT NULL DEFAULT 0,
      low_stock_threshold INTEGER DEFAULT 10,
      status TEXT DEFAULT 'Draft',
      images TEXT[] DEFAULT ARRAY[]::TEXT[],
      is_featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      order_items JSONB NOT NULL DEFAULT '[]'::jsonb,
      shipping_address JSONB NOT NULL DEFAULT '{}'::jsonb,
      payment_method TEXT NOT NULL DEFAULT 'Simulated Gateway',
      payment_result JSONB DEFAULT '{}'::jsonb,
      items_price NUMERIC NOT NULL DEFAULT 0,
      tax_price NUMERIC NOT NULL DEFAULT 0,
      shipping_price NUMERIC NOT NULL DEFAULT 0,
      total_amount NUMERIC NOT NULL DEFAULT 0,
      is_paid BOOLEAN DEFAULT FALSE,
      paid_at TIMESTAMP,
      is_delivered BOOLEAN DEFAULT FALSE,
      delivered_at TIMESTAMP,
      status TEXT DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
  `);
};

const connectDB = async () => {
  try {
    await getDBClient();
    await initializeSchema();
    console.log(`Database connected using ${getDatabaseMode()}`);
  } catch (error) {
    console.error(`⚠️ Warning: Database connection failed (${error.message}).`);
    console.error(`Make sure ${getDatabaseMode() === 'mongo' ? 'MongoDB' : 'Postgres/Supabase'} is reachable.`);
  }
};

export default connectDB;
