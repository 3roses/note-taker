const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');


const PORT = process.env.PORT || 3000;
const app = express();


// Allow for static files to be accessed
app.use(express.static('Develop/public'));


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);


// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
);


app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/db/db.json'))
);


app.post('/api/notes', (req, res) => {
    console.log(req.body);
    
    const noteNew = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    };

    console.log(noteNew);

    let db = fs.readFileSync('Develop/db/db.json')
    let parsedDB = JSON.parse(db);
    console.log(parsedDB);

    parsedDB.push(noteNew);
    console.log(parsedDB);

    fs.writeFileSync('Develop/db/db.json', JSON.stringify(parsedDB));
    return res.json(noteNew);
});

app.delete('/api/notes:id', function(req, res) {
    
    let db = fs.readFileSync('Develop/db/db.json');
    let parsedDB = JSON.parse(db);

    parsedDB.filter(note => note.id != req.params.id)

    fs.writeFileSync('Develop/db/db.json', JSON.stringify(parsedDB));

    res.send(req.params.id)
})



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



