import UserModel from '../models/user.model.js'

const attachCurrentUser = async (req, res, next) => {
    try {
        const loggedUser = req.auth
        const user = await UserModel.findOne(
            { _id: loggedUser._id },
            { password: 0 }
        )

        if(!user) {
            return res.status(400).json({ msg: 'this user does not exist' })
        }

        req.currentUser = user
        
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'something went wrong :('})
    }
}

export default attachCurrentUser