import express from 'express'


const app = express()

const PORT = 5000

app.get('/', (req, res) => {

    res.send('<h1> Hola mundo </h1>')
})


app.listen(PORT, 
    console.log( `App  corriendo por el puerto http://localhost:${PORT}`)
)