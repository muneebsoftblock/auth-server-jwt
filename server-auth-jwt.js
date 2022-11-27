require('dotenv').config(); // enables loading .env vars
const jwt = require('jsonwebtoken');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const pem2jwk = require('pem-jwk').pem2jwk;

app.set('json spaces', 2);

// Allow requests from client-side
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (r,res) => res.json({ message: 'hi' }));

app.get('/api/jwks', async (req, res) => {
  try {
    const privateKey = fs.readFileSync('private-key.pem');
    res.status(200).json({ keys: [pem2jwk(privateKey)] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/token', async (req, res) => {
  try {
    const privateKey = fs.readFileSync('privateKey.pem');
    const token = jwt.sign(
      {
        sub: 'Custom JWT for Web3Auth Custom Auth',
        name: 'mzk',
        email: 'muneeb.softblock@gmail.com',
        aud: 'urn:my-resource-server', // -> to be used in Custom Authentication as JWT Field
        iss: 'https://my-authz-server', // -> to be used in Custom Authentication as JWT Field
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      privateKey,
      { algorithm: 'RS256', keyid: '955104a37fa903ed80c57145ec9e83edb29b0c45' },
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const listener = app.listen(process.env.PORT || 8080, () => console.log('Listening on port ' + listener.address().port));
