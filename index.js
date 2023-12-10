import express from 'express'

const app = express()
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT, () => {
	console.log(`Server kører på port http://localhost:${process.env.PORT}`);
})


