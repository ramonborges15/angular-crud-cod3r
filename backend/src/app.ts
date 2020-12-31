import express from 'express'
import { createConnection } from 'typeorm'
import routes from './routes'

const app = express()

// Criar conexão. Automaticamente, os models são criados dentro do banco de dados.
createConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(routes)

export { app }