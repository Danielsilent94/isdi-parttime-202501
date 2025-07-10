const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const app = require('../app.js')

const expect = chai.expect
chai.use(chaiHttp)

let server
let requester

describe('API - Users', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce-test')
    server = app.listen(0)
    requester = chai.request(server).keepOpen()
  })

  after(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
    await server.close()
    await requester.close()
  })

  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }

  it('should register a new user', async () => {
    const res = await requester.post('/api/users/register').send(userData)
    expect(res).to.have.status(201)
    expect(res.body).to.have.property('message')
  })

  it('should not register the same user twice', async () => {
    const res = await requester.post('/api/users/register').send(userData)
    expect(res).to.have.status(400)
    expect(res.body).to.have.property('error')
  })

  it('should login with correct credentials', async () => {
    const res = await requester
      .post('/api/users/login')
      .send({ email: userData.email, password: userData.password })
    expect(res).to.have.status(200)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('userId')
  })

  it('should fail login with wrong password', async () => {
    const res = await requester
      .post('/api/users/login')
      .send({ email: userData.email, password: 'wrongpass' })
    expect(res).to.have.status(400)
    expect(res.body).to.have.property('error')
  })
})
