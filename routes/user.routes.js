import express from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../models/user.model.js'
import generateToken from '../config/jwt.config.js'

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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email: email })

        if(!user) {
            return res.status(400).json({ msg: 'this e-mail is not registered'})
        }

        if(await bcrypt.compare(password, user.password)) {
            delete user._doc.password
            const token = generateToken(user)
            
            return res.status(200).json({
                user: { ...user._doc },
                token: token
            })
        } else {
            return res.status(401).json({ msg: 'e-mail and password not registered'})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "something went wrong :(" });
    }
})

export default router