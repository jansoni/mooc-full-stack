const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const PORT = 3001

let notes = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-12304123",
    },
    {
        id: 2,
        name : "Ada Lovelace",
        number: "39-44-12313",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12313123",
    },
]

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.get('/info', (req, res) => {
    const time = new Date() 
    const phonebook_len = notes.length
    res.send(`
        <p>Phonebook has info for ${phonebook_len}</p> 
        <p>${time}</p>
    `)
})

app.get('/api/persons', (req, res) => {
    res.json(notes)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = notes.find(note => note.id === id)
    data ? res.json(data) : res.send(`No person found with id:${id}`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const findIndex = (id, array) => {
        let index = 0
        for (let i = 0; i < array.length; i++) {
            if (id === notes[i].id) {
                break
            } else {
                index++;
            }
        }
        return index
    }
    const found = notes.splice(findIndex(id, notes), 1)
    if (found.length == 0) {
        res.status(422).json({error: `No person found with id ${id}`}).end()
    } else {
        res.status(204).end()
    }
})

app.post('/api/persons', (req, res) => {
    const note = req.body
    if (note.hasOwnProperty('name') && note.hasOwnProperty('number')) {
        const unique = (note, array) => {
            let unique = true
            for (let i = 0; i < array.length; i++) {
                if (note.name === array[i].name) {unique = false}
            }
            return unique
        }
        if (unique(note, notes)) {
            note.id = Math.floor(Math.random() * 5000)
            notes = notes.concat(note)
            res.status(201).end()
        } else {
            res.status(400).json({error: 'name not unique'}).end()
        }
    } else {
        res.status(400).json({error: 'missing number or name field'}).end()
    }
    
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

