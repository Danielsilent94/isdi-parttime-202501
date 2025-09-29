import { describe, it, afterEach } from 'mocha';
import { expect } from 'chai';
import * as Products from '../../logic/productsLogic.mjs';
import Product from '../../models/Product.mjs';

describe('Integration - Product Logic', () => {
  afterEach(async () => {
    await Product.deleteMany();
  });

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
    expect(found._id.toString()).to.equal(created._id.toString());
  });

  it('should delete product by ID', async () => {
    const created = await Products.createProduct(productData);
    await Products.deleteProductById(created._id);
    const check = await Product.findById(created._id);
    expect(check).to.be.null;
  });
});