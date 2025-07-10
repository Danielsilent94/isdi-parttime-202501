import mongoose from 'mongoose';

export async function connect(mongoUrl, dbName) {
  await mongoose.connect(`${mongoUrl}/${dbName}`);
  console.log(`✅ Connected to DB: ${dbName}`);
}

export async function disconnect() {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  console.log('✅ Disconnected from DB and dropped database');
}