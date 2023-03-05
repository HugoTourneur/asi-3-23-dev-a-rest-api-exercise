import cors from "cors"
import express from "express"
import knex from "knex"
import morgan from "morgan"
import handleError from "../src/middlewares/handleError.js"
import BaseModel from "./db/models/BaseModel.js"
import makeRoutesNavMenu from "./routes/makeRoutesNavMenu.js"
import makeRoutesPages from "./routes/makeRoutesPages.js"
import makeRoutesSign from "./routes/makeRoutesSign.js"
import makeRoutesUsers from "./routes/makeRoutesUsers.js"

const run = async (config) => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(morgan("dev"))

  const db = knex(config.db)
  BaseModel.knex(db)

  //Make routes
  makeRoutesPages({ app, db })
  makeRoutesSign({ app, db })
  makeRoutesUsers({ app, db })
  makeRoutesNavMenu({ app, db })

  app.use(handleError)
  app.use((req, res) => {
    res.status(404).send({ error: [`cannot POST ${req.url}`] })
  })

  // eslint-disable-next-line
  app.listen(config.port, () => console.log(`Listening on : ${config.port}`))
}

export default run
