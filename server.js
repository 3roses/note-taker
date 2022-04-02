const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');


const PORT = process.env.PORT || 3000;
const app = express();


// Allow for static files to be accessed
app.use(express.static('develop/public'));


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/develop/public/index.html'))
);


// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'develop/public/notes.html'))
);


app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'develop/db/db.json'))
);


app.post('/api/notes', (req, res) =>{
    console.log(req.body);
    
    const noteNew = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    };

    console.log(noteNew);

    let db = fs.readFileSync('develop/db/db.json')
    let parsedDB = JSON.parse(db);
    console.log(parsedDB);

    parsedDB.push(noteNew);
    console.log(parsedDB);

    fs.writeFileSync('develop/db/db.json', JSON.stringify(parsedDB));

});





app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



