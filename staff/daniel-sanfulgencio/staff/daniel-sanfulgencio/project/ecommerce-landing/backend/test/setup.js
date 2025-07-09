import mongoose from 'mongoose';

before(async () => {
  await mongoose.connect('mongodb://localhost:27017/ecommerce-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});