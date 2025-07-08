const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const app = require('../index.js').default

const expect = chai.expect
chai.use(chaiHttp)

let createdProductId = null

describe('API - Products', () => {
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

  it('should create a new product', done => {
    chai.request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'This is a test',
        price: 49.99,
        category: 'laptops'
      })
      .end((err, res) => {
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('_id')
        createdProductId = res.body._id
        done()
      })
  })

  it('should get all products', done => {
    chai.request(app)
      .get('/api/products')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should get product by ID', done => {
    chai.request(app)
      .get(`/api/products/${createdProductId}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('_id', createdProductId)
        done()
      })
  })

  it('should delete product by ID', done => {
    chai.request(app)
      .delete(`/api/products/${createdProductId}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message')
        done()
      })
  })
})
