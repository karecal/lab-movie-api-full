const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../../src/config/prisma')

const crearUsuario = async ({ nombre = 'Test User', email = 'test@test.com', password = 'pass123', rol = 'usuario' } = {}) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const usuario = await prisma.usuario.create({
    data: { nombre, email, passwordHash, rol },
    select: { id: true, nombre: true, email: true, rol: true }
  })
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  )
  return { usuario, token }
}

const crearPelicula = async ({ titulo = 'Película Test', anio = 2024, nota = 8.0 } = {}) => {
  return prisma.pelicula.create({
    data: { titulo, anio, nota }
  })
}

module.exports = { crearUsuario, crearPelicula }