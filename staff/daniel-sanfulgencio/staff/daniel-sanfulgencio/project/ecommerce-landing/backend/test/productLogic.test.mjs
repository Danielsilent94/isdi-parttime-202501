import 'dotenv/config';
import { describe, it, before, after, afterEach } from 'mocha';
import { expect } from 'chai';
import { connect, disconnect } from '../data/database.mjs';
import * as Products from '../logic/productsLogic.mjs';

describe('Product Logic', () => {
  before(() => connect(process.env.MONGO_URL, process.env.MONGO_DB_TEST));
  after(() => disconnect());
  afterEach(() => import('../models/Product.mjs').then(({ default: Product }) => Product.deleteMany()));

  const productData = {
    name: 'Test Product',
    description: 'This is a test',
    price: 49.99,
    category: 'laptops'
  };

  it('should create a new product', async () => {
    const product = await Products.createProduct(productData);
    expect(product).to.have.property('_id');
  });

  it('should get all products', async () => {
    await Products.createProduct(productData);
    const products = await Products.getAllProducts();
    expect(products).to.be.an('array').that.is.not.empty;
  });

  it('should get product by ID', async () => {
    const created = await Products.createProduct(productData);
    const found = await Products.getProductById(created._id);
    expect(found).to.have.property('_id');
    expect(found._id.toString()).to.equal(created._id.toString());
  });

  it('should delete product by ID', async () => {
    const created = await Products.createProduct(productData);
    await Products.deleteProductById(created._id);
    const { default: Product } = await import('../models/Product.mjs');
    const check = await Product.findById(created._id);
    expect(check).to.be.null;
  });
});