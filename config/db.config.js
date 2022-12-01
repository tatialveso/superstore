import mongoose from 'mongoose'

async function connect() {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`${dbConnection.connection.name} db connected`)
    } catch (error) {
        console.log('something went wrong', error)
    }
}

export default connect