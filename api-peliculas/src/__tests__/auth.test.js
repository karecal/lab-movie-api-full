const request = require('supertest')
const app = require('../../index')

describe('POST /api/auth/registro', () => {
  it('debe registrar un usuario nuevo', async () => {
    const res = await request(app)
      .post('/api/auth/registro')
      .send({ nombre: 'Test', email: 'test@test.com', password: 'pass123' })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('token')
    expect(res.body.usuario.email).toBe('test@test.com')
  })

  it('debe rechazar registro con email duplicado', async () => {
    await request(app)
      .post('/api/auth/registro')
      .send({ nombre: 'Test', email: 'test@test.com', password: 'pass123' })

    const res = await request(app)
      .post('/api/auth/registro')
      .send({ nombre: 'Test2', email: 'test@test.com', password: 'pass123' })

    expect(res.status).toBe(409)
  })

  it('debe rechazar registro sin campos obligatorios', async () => {
    const res = await request(app)
      .post('/api/auth/registro')
      .send({ email: 'test@test.com' })

    expect(res.status).toBe(400)
  })
})

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/auth/registro')
      .send({ nombre: 'Test', email: 'test@test.com', password: 'pass123' })
  })

  it('debe hacer login con credenciales correctas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'pass123' })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
  })

  it('debe rechazar credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'wrongpassword' })

    expect(res.status).toBe(401)
  })
})