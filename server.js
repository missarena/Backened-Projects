const express = require('express');
const cors = require('cors');
const useragent = require('useragent');
const requestIp = require('request-ip');

const app = express();
const port = 3000;

app.use(cors());

// Middleware to capture IP address
app.use(requestIp.mw());

// Define the route for the header parser
app.get('/api/whoami', (req, res) => {
  const ipAddress = req.clientIp; // Client's IP address
  const language = req.headers['accept-language']; // Client's language
  const userAgentString = req.headers['user-agent']; // Client's user agent

  // Parse the user-agent string
  const agent = useragent.parse(userAgentString);
  
  const response = {
    ipaddress: ipAddress,
    language: language.split(',')[0], // Use only the first language
    software: agent.os.toString() // Extract OS from the user-agent string
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
