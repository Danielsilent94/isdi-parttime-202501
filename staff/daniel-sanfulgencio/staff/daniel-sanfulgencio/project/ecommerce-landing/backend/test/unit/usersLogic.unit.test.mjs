import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as usersLogic from '../../logic/usersLogic.mjs';

chai.use(chaiAsPromised);

describe('Unit - usersLogic', () => {
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