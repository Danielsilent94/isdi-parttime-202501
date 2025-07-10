import mongoose from 'mongoose';

export async function connect(mongoUrl, dbName) {
  if (!mongoUrl || !dbName) {
    throw new Error(`❌ Missing mongoUrl or dbName. Got mongoUrl="${mongoUrl}", dbName="${dbName}"`);
  }

  const uri = `${mongoUrl.trim()}/${dbName.trim()}`;
  await mongoose.connect(uri);
  console.log(`✅ Connected to DB: ${dbName}`);
}

export async function disconnect() {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  console.log('✅ Disconnected from DB and dropped database');
}