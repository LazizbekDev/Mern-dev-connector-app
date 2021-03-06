import express from 'express'
import mongooseConnect from "./config/db.js";
import posts from './routes/api/posts.js'
import auth from './routes/api/auth.js'
import profile from './routes/api/profile.js'
import users from './routes/api/users.js'
import path from 'path'

//express ad app
const app = express()

//connect mongoDB
mongooseConnect().then(r => console.log('it is awesome :-)'))

// middleware with express

app.use(express.json())

app.use('/api/posts', posts)
app.use('/api/auth', auth)
app.use('/api/profile', profile)
app.use('/api/users', users)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('server running')
})