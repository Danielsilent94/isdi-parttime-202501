import 'dotenv/config';
import mongoose from 'mongoose';
import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../server.mjs';
import User from '../models/User.mjs';

describe('User API', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it('Debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: '123456'
      });

    expect(res.status).to.equal(201);
    expect(res.body.user).to.have.property('_id');
    expect(res.body.user.email).to.equal('testuser@example.com');
  });

  it('No debería permitir registro duplicado', async () => {
    await request(app).post('/api/users/register').send({
      name: 'Test User',
      email: 'dup@example.com',
      password: '123456'
    });

    const res = await request(app).post('/api/users/register').send({
      name: 'Test User',
      email: 'dup@example.com',
      password: '123456'
    });

    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('El usuario ya existe');
  });
});