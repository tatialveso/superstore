import express from 'express'
import ProductModel from '../models/product.model.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const getAllProducts = await ProductModel.find()
        return res.status(200).json(getAllProducts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'something went wrong :('})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const getProductById = await ProductModel.findById(id).populate("orders")
        return res.status(200).json(getProductById)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'something went wrong :('})
    }
})

router.post('/create', async (req, res) => {
    try {
        const createNewProduct = await ProductModel.create(req.body)
        return res.status(201).json(createNewProduct)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'something went wrong :('})
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updateProductById = await ProductModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
        )
        return res.status(200).json(updateProductById)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'something went wrong :('})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await ProductModel.findByIdAndDelete(id)
        return res.status(204).json({msg: 'product deleted!'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'something went wrong :('})
    }
})

export default router