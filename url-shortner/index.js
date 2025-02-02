const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(bodyParser.json()); 
app.use(express.static('public'));
app.use(cors());

const urlDatabase = {};
const baseURL = 'http://localhost:3000/';


// Function to generate a short URL key
function generateShortKey() {
    return Math.random().toString(36).substring(7);
}


app.post('/api/shorten', (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    const shortKey = generateShortKey();
    urlDatabase[shortKey] = longUrl;

    res.json({ shortUrl: `${baseURL}${shortKey}` });
});


app.get('/:shortKey', (req, res) => {
    const { shortKey } = req.params;
    const longUrl = urlDatabase[shortKey];

    if (!longUrl) {
        return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(longUrl);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});