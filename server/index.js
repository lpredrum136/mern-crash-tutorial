require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-tutorial.r8t4y.mongodb.net/mern-tutorial?retryWrites=true&w=majority`,
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		)
		console.log('MongoDB connected yay')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const app = express()

app.get('/', (req, res) => res.json({ msg: 'Hello world' }))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
