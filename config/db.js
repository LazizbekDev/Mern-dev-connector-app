import mongoose from 'mongoose'
import config from 'config'

const db = config.get('mongoURI')

const mongooseConnect = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        })
        console.log('connected to mongoDB')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

export default mongooseConnect