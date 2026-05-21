const prisma = require('../config/prisma')

const limpiarDB = async () => {
  await prisma.favorito.deleteMany()
  await prisma.resena.deleteMany()
  await prisma.pelicula.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.director.deleteMany()
  await prisma.genero.deleteMany()
}

beforeAll(async () => {
  await limpiarDB()
})

beforeEach(async () => {
  await limpiarDB()
})

afterAll(async () => {
  await prisma.$disconnect()
})
