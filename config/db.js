import mongoose from 'mongoose'

const mongooseConnect = async () => {
    try {
        await mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true,
        })
        console.log('connected to mongoDB')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

export default mongooseConnect