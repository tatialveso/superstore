import express from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../models/user.model.js'

const router = express.Router()
const rounds = 10

router.post('/register', async (req, res) => {
    try {
        const { password } = req.body

        if(!password) {
            return res.status(400).json({msg: 'password is incorrect'})
        }

        const saltString = await bcrypt.genSalt(rounds)
        const hashPassword = await bcrypt.hash(password, saltString)

        const user = await UserModel.create({
            ...req.body,
            password: hashPassword
        })

        delete user._doc.password

        return res.status(201).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "something went wrong :(" });
    }
})

export default router