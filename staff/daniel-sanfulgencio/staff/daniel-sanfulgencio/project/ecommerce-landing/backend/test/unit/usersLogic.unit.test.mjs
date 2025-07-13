import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const { expect } = chai;

import * as usersLogic from '../../logic/usersLogic.mjs';

describe('Unit Test - usersLogic', () => {
  it('should export registerUser function', () => {
    expect(usersLogic.registerUser).to.be.a('function');
  });

  it('should export loginUser function', () => {
    expect(usersLogic.loginUser).to.be.a('function');
  });

  it('registerUser should throw if no data', async () => {
    await expect(usersLogic.registerUser()).to.be.rejectedWith('Missing user data');
  });

  it('loginUser should throw if no data', async () => {
    await expect(usersLogic.loginUser()).to.be.rejectedWith('Missing credentials');
  });
});