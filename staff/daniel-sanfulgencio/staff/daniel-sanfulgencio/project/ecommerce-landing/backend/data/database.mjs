import mongoose from 'mongoose';

export async function connect(mongoUrl, dbName) {
  if (!mongoUrl || !dbName) {
    throw new Error(`❌ Missing mongoUrl or dbName. Got mongoUrl="${mongoUrl}", dbName="${dbName}"`);
  }

  await mongoose.connect(mongoUrl, { dbName });
  console.log(`✅ Connected to DB: ${dbName}`);
}

export function disconnect() {
  return mongoose.connection.dropDatabase().then(() => mongoose.disconnect());
}