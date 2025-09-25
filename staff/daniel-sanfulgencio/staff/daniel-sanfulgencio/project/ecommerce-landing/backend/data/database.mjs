import mongoose from 'mongoose';

export const connect = async (mongoUrl, dbName) => {
  if (!mongoUrl) {
    throw new Error(`❌ Missing mongoUrl. Got mongoUrl="${mongoUrl}"`);
  }

  if (!dbName) {
    throw new Error(`❌ Missing dbName. Got dbName="${dbName}"`);
  }

  const fullUri = `${mongoUrl}/${dbName}`;
  
  try {
    await mongoose.connect(fullUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ DB connected to', fullUri);
  } catch (error) {
    console.error('❌ Error connecting to DB:', error.message);
    throw error;
  }
};