import 'dotenv/config';
import { describe, it, before, after, afterEach } from 'mocha';
import { expect } from 'chai';
import { connect, disconnect } from '../../data/database.mjs';
import * as Users from '../../logic/usersLogic.mjs';

describe('Integration - User Logic', () => {
  before(() => connect(process.env.MONGO_URL, process.env.MONGO_DB_TEST));
  after(() => disconnect());
  afterEach(() => import('../../models/User.mjs').then(({ default: User }) => User.deleteMany()));

  const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' };

  it('should register a new user', async () => {
    await Users.registerUser(userData);
    const { default: User } = await import('../../models/User.mjs');
    const user = await User.findOne({ email: userData.email });
    expect(user).to.exist;
  });

  it('should not register the same user twice', async () => {
    await Users.registerUser(userData);
    try {
      await Users.registerUser(userData);
      throw new Error('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.equal('User already exists');
    }
  });

  it('should login with correct credentials', async () => {
    await Users.registerUser(userData);
    const userId = await Users.loginUser({ email: userData.email, password: userData.password });
    expect(userId).to.be.a('string');
  });

  it('should fail login with wrong password', async () => {
    await Users.registerUser(userData);
    try {
      await Users.loginUser({ email: userData.email, password: 'wrongpass' });
      throw new Error('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.equal('Invalid credentials');
    }
  });
});