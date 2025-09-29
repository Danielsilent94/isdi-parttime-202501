import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as productsLogic from '../../logic/productsLogic.mjs';

chai.use(chaiAsPromised);

describe('Unit - productsLogic', () => {
  it('should export createProduct function', () => {
    expect(productsLogic.createProduct).to.be.a('function');
  });

  it('should export getAllProducts function', () => {
    expect(productsLogic.getAllProducts).to.be.a('function');
  });

  it('should export getProductById function', () => {
    expect(productsLogic.getProductById).to.be.a('function');
  });

  it('should export deleteProductById function', () => {
    expect(productsLogic.deleteProductById).to.be.a('function');
  });

  it('createProduct should throw if no data', async () => {
    await expect(productsLogic.createProduct()).to.be.rejectedWith('Missing product data');
  });

  it('getProductById should throw if no id', async () => {
    await expect(productsLogic.getProductById()).to.be.rejectedWith('Missing product ID');
  });

  it('deleteProductById should throw if no id', async () => {
    await expect(productsLogic.deleteProductById()).to.be.rejectedWith('Missing product ID');
  });
});