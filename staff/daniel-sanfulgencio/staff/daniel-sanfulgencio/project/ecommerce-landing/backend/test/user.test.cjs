const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const app = require('../index.js').default

const expect = chai.expect
chai.use(chaiHttp)

describe('API - Users', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  after(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
  })

  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }

  it('should register a new user', done => {
    chai.request(app)
      .post('/api/users/register')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('should not register the same user twice', done => {
    chai.request(app)
      .post('/api/users/register')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('error')
        done()
      })
  })

  it('should login with correct credentials', done => {
    chai.request(app)
      .post('/api/users/login')
      .send({ email: userData.email, password: userData.password })
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('userId')
        done()
      })
  })

  it('should fail login with wrong password', done => {
    chai.request(app)
      .post('/api/users/login')
      .send({ email: userData.email, password: 'wrongpass' })
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('error')
        done()
      })
  })
})
