const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const app = require('../app.js')

const expect = chai.expect
chai.use(chaiHttp)

let server
let requester
let createdProductId

describe('API - Products', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce-test')
    server = app.listen(0) // puerto aleatorio
    requester = chai.request(server).keepOpen()
  })

  after(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
    await server.close()
    await requester.close()
  })

  it('should create a new product', async () => {
    const res = await requester
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'This is a test',
        price: 49.99,
        category: 'laptops'
      })
    expect(res).to.have.status(201)
    expect(res.body).to.have.property('_id')
    createdProductId = res.body._id
  })

  it('should get all products', async () => {
    const res = await requester.get('/api/products')
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array')
  })

  it('should get product by ID', async () => {
    const res = await requester.get(`/api/products/${createdProductId}`)
    expect(res).to.have.status(200)
    expect(res.body).to.have.property('_id', createdProductId)
  })

  it('should delete product by ID', async () => {
    const res = await requester.delete(`/api/products/${createdProductId}`)
    expect(res).to.have.status(200)
    expect(res.body).to.have.property('message')
  })
})
