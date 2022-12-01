import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.listen(Number(process.env.PORT), 
    () => console.log(`server is listening on PORT ${process.env.PORT}`))