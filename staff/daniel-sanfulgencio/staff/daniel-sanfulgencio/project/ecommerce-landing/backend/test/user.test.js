import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('API - Users', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  it('should register a new user', async () => {
    const res = await chai.request(app).post('/api/users/register').send(userData);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
  });

  it('should not register the same user twice', async () => {
    const res = await chai.request(app).post('/api/users/register').send(userData);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });

  it('should login with correct credentials', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .send({ email: userData.email, password: userData.password });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('userId');
  });

  it('should fail login with wrong password', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .send({ email: userData.email, password: 'wrongpass' });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });
});