import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../app.js';

const { expect } = chai;
chai.use(chaiHttp);

let createdProductId;

describe('API - Products', () => {
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

  it('should create a new product', async () => {
    const res = await chai
      .request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'This is a test',
        price: 49.99,
        category: 'laptops',
      });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('_id');
    createdProductId = res.body._id;
  });

  it('should get all products', async () => {
    const res = await chai.request(app).get('/api/products');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should get product by ID', async () => {
    const res = await chai.request(app).get(`/api/products/${createdProductId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('_id', createdProductId);
  });

  it('should delete product by ID', async () => {
    const res = await chai.request(app).delete(`/api/products/${createdProductId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
  });
});