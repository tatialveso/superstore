import express from 'express'
import * as dotenv from 'dotenv'
import dbConnection from './config/db.config.js'
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/order.routes.js'
import userRouter from './routes/user.routes.js'

dotenv.config()

dbConnection()

const app = express()
app.use(express.json())

app.use('/user', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)

app.listen(Number(process.env.PORT), 
    () => console.log(`server is listening on PORT ${process.env.PORT}`))