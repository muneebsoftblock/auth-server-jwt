require('dotenv').config(); // enables loading .env vars
const jwt = require('jsonwebtoken');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');

const rsaPemToJwk = require('rsa-pem-to-jwk');

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBPAIBAAJBAPMnQBFsUMxP05b8qkm7MhUFLTNFc6fvNxxUTjGNVHL2pY3a3f0d
rwnhUPKzMEdUR9d8RGEqX8l0wyfflSYnFRcCAwEAAQJBAPFB5p3i/SBbrDPJqyTR
KlYU9s5CgQkFn4bqV1NvSXVuOZts1Sa61mvxOr4nr64Y35WE2MYQvWlFwzlDWGuh
8lECIQD84mNik7CCK+F5Pp+SfWZ0wC9HTZCkRh+pMo7lxHI8RQIhAPYmK31x6hiU
zmB5KdIwia/q1fmv76s85ZtYDNB8rjerAiAeAzhMYL7YFCEkZJxHpH5eaNizm68I
8BGd4RQ4jMIKCQIhAKfCl/1lOAEM2iMSMRiaEB0fVjpYWGZCmNJpDkLB1xMFAiEA
jl9WxawKpk095m3ud/xMra8rVNEbC+qa3veRRarK6vE=
-----END RSA PRIVATE KEY-----
`;
const publicKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAPMnQBFsUMxP05b8qkm7MhUFLTNFc6fv
NxxUTjGNVHL2pY3a3f0drwnhUPKzMEdUR9d8RGEqX8l0wyfflSYnFRcCAwEAAQ==
-----END PUBLIC KEY-----
`;
const privateKey2 = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBALXsC7V5AqwQ8RmJIKnbzCiyR87Z03PBpXFUgSd1HpHkQjREhYcH
F5oOQLTipPmZvu8hj+PdBHEv/rlXAyod/X8CAwEAAQJAOydbz1Bf3A9ONl1ub4z2
36zIyKvvo84tu6IctPXSUOF4qR0orcfBPtTqRnm+I78Cmy4AlO6j2rI6XvyTU66f
AQIhAPENz//jo90sPy89OLJl2e/YFJizz7hHMYs+hwcxA9fBAiEAwTOl05F1c60w
MXQn4sxLFcXoFo4HL3XqfxgHbuM9JT8CIQDvyPWnbiKK2IDh1NyZWYe5dhDG9dcj
UG6QPNrE5JUWAQIgOC6+wEGCeDsa0qbGmotyIkjE7xoqOMD/iioAr1xhgZ0CIBIn
O1T08OL6pXWXAORJAc94Yc7Fp/8cgtFOu6EhalxJ
-----END RSA PRIVATE KEY-----
`;
const publicKey2 = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALXsC7V5AqwQ8RmJIKnbzCiyR87Z03PB
pXFUgSd1HpHkQjREhYcHF5oOQLTipPmZvu8hj+PdBHEv/rlXAyod/X8CAwEAAQ==
-----END PUBLIC KEY-----
`;

app.set('json spaces', 2);

// Allow requests from client-side
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());

app.get('/', (r, res) => res.json({ message: 'hi ' + Date() }));

app.get('/.well-known/jwks.json', async (req, res) => {
  try {
    res.status(200).json({
      keys: [
        rsaPemToJwk(privateKey, { use: 'sig', alg: 'RS256', keyid: 'xxUTjGNVHL2pY3a3f0drwnhUPKzMEdUR9d8R' }, 'public'),
        rsaPemToJwk(privateKey2, { use: 'sig', alg: 'RS256', keyid: '3a3f0drwnhUPKzMExxUTjGNVHL2pYdUR9d8R' }, 'public'),
      ],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/.well-known/jwks2.json', async (req, res) => {
  try {
    res.send(publicKey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const issueJwt = async (req, res) => {
  try {
    const token = jwt.sign(
      {
        sub: '1234',
        name: 'mzk',
        email: 'muneeb.softblock@gmail.com',
        // aud: 'urn:my-resource-server', // -> to be used in Custom Authentication as JWT Field
        iss: 'https://auth-server-jwt-six.vercel.app', // -> to be used in Custom Authentication as JWT Field
        iat: 100,
        // exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      privateKey,
      { algorithm: 'RS256', keyid: 'xxUTjGNVHL2pY3a3f0drwnhUPKzMEdUR9d8R' },
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

app.get('/api/token', issueJwt);

app.post('/api/token', issueJwt);

const listener = app.listen(process.env.PORT || 8080, () => console.log('Listening on port ' + listener.address().port));
