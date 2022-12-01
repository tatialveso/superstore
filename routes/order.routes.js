import express from 'express'
import OrderModel from '../models/order.model.js'
import ProductModel from '../models/product.model.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const getAllOrders = await OrderModel.find()
        return res.status(200).json(getAllOrders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'something went wrong :('})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const getOrderById = await OrderModel.findById(id).populate("products")
        return res.status(200).json(getOrderById)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'something went wrong :('})
    }
})

router.post('/insert', async (req, res) => {
    try {
        const ids = req.body.products
       
        const createNewOrder = await OrderModel.create(
            {
                salesDate: req.body.salesDate,    
                products: { ids }
            }
        )

        await ProductModel.findByIdAndUpdate(
            ids,
            // sempre adiciona dentro da array
            { $push: { orders: createNewOrder._id } }
        )

        return res.status(201).json(createNewOrder)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'something went wrong :('})
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updateOrderById = await OrderModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true}
        )
        return res.status(200).json(updateOrderById)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'something went wrong :('})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await OrderModel.findByIdAndDelete(id)
        return res.status(204).json({msg: 'order deleted!'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'something went wrong :('})
    }
})

export default router