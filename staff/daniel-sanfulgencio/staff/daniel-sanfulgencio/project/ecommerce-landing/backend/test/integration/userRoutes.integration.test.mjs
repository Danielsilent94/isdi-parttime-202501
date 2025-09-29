import { describe, it, beforeEach, after } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../server.mjs';
import User from '../../models/User.mjs';

describe('Integration - User Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('GET /api debería responder con estado 200', async () => {
    const res = await request(app).get('/api');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
  });

  it('POST /api/users/register debería registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Daniel', email: 'daniel@test.com', password: '123456' });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('user');
    expect(res.body.user).to.have.property('email', 'daniel@test.com');
  });

  it('POST /api/users/login debería loguear al usuario registrado', async () => {
    await request(app).post('/api/users/register').send({
      name: 'Daniel',
      email: 'daniel@test.com',
      password: '123456'
    });

    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'daniel@test.com', password: '123456' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    expect(res.body.user).to.have.property('email', 'daniel@test.com');
  });
});