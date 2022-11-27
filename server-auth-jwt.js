require('dotenv').config(); // enables loading .env vars
const jwt = require('jsonwebtoken');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const pem2jwk = require('pem-jwk').pem2jwk;

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBPAIBAAJBAPMnQBFsUMxP05b8qkm7MhUFLTNFc6fvNxxUTjGNVHL2pY3a3f0d
rwnhUPKzMEdUR9d8RGEqX8l0wyfflSYnFRcCAwEAAQJBAPFB5p3i/SBbrDPJqyTR
KlYU9s5CgQkFn4bqV1NvSXVuOZts1Sa61mvxOr4nr64Y35WE2MYQvWlFwzlDWGuh
8lECIQD84mNik7CCK+F5Pp+SfWZ0wC9HTZCkRh+pMo7lxHI8RQIhAPYmK31x6hiU
zmB5KdIwia/q1fmv76s85ZtYDNB8rjerAiAeAzhMYL7YFCEkZJxHpH5eaNizm68I
8BGd4RQ4jMIKCQIhAKfCl/1lOAEM2iMSMRiaEB0fVjpYWGZCmNJpDkLB1xMFAiEA
jl9WxawKpk095m3ud/xMra8rVNEbC+qa3veRRarK6vE=
-----END RSA PRIVATE KEY-----`;
const publicKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAPMnQBFsUMxP05b8qkm7MhUFLTNFc6fv
NxxUTjGNVHL2pY3a3f0drwnhUPKzMEdUR9d8RGEqX8l0wyfflSYnFRcCAwEAAQ==
-----END PUBLIC KEY-----`;

app.set('json spaces', 2);

// Allow requests from client-side
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (r, res) => res.json({ message: 'hi ' + Date() }));

app.get('/.well-known/jwks.json', async (req, res) => {
  try {
    // res.status(200).json({ keys: [pem2jwk(publicKey)] });
    res.status(200).json({
      keys: [
        {
          kty: 'RSA',
          e: 'AQAB',
          use: 'sig',
          kid: '1bb9605c36e98e30117a69517569386830202b2d',
          n: 'pAbfKmQ1ljT6yZcrdxaJxqsB7EupbBFcCLiMzmuFQMuk3y_g-vVPR8ZwTJbalwBxD-vUPmxmZAVok_iNthw1mnW0POg3kEwtl1qambgNKlaTeO8S3D-KGlUNV6bU-JXbyquds7v8bQjmIQ5oXhwIQt6x55bEyZTOCQDl3ZHy1XxeBWFyiPUXXnqkO51EFeVNiMi8Ihue16UY_lIizhivl2C_UwJ0Ymx9eWJ-nefPBo7Lr_fIxh81NaLMB6t5L8123RSIaaIcR_r1H_ZbEe9VNTfnGdYS3A0u-pNS_bm5jRSBo1qt01OFu0xEsjcO7-NESTBr8w8SUqGK86tg9oQz5w',
          alg: 'RS256',
        },
        {
          kty: 'RSA',
          e: 'AQAB',
          alg: 'RS256',
          kid: 'c53624af1600da79f31f0314f205d4f37ad6e246',
          use: 'sig',
          n: 'sinuWOLB7u0NoJ5Cy92AUqC7clH0ErjTjrI_b_dBbndg0rrFZryKfbvH4ncZW_yQ9izl2mjLsjsBzVwAyzWIn83QRhTtisdV7k9AkhSGdNu-cG_qPkedhqFPIn_uyBnVpxksp8clMRALetdHncUqcTfhIpngQp_JxFHle0fNsylU510fH-iZfphLO9mMpq6eB5QGynttgpdsLxLuXe1CffNQya0pmtLkU4ATfVdXV_bMqzRxxbDOnzIaLjzUJdsMuScCTjQX93xdfzEu-Vk6zOpdkrBRUuopgAX1e8NPQz150XEOTInkh0Mfhw0t1GeB7zbbjYJDmCgYTIW1g4teBw',
        },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/token', async (req, res) => {
  try {
    const token = jwt.sign(
      {
        sub: 'Custom JWT for Web3Auth Custom Auth',
        name: 'mzk',
        email: 'muneeb.softblock@gmail.com',
        // aud: 'urn:my-resource-server', // -> to be used in Custom Authentication as JWT Field
        iss: 'https://auth-server-jwt-six.vercel.app', // -> to be used in Custom Authentication as JWT Field
        iat: 100,
        // exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      privateKey,
      { algorithm: 'RS256', keyid: '955104a37fa903ed80c57145ec9e83edb29b0c45' },
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/token', async (req, res) => {
  try {
    const token = jwt.sign(
      {
        sub: 'Custom JWT for Web3Auth Custom Auth',
        name: 'mzk',
        email: 'muneeb.softblock@gmail.com',
        // aud: 'urn:my-resource-server', // -> to be used in Custom Authentication as JWT Field
        iss: 'https://auth-server-jwt-six.vercel.app', // -> to be used in Custom Authentication as JWT Field
        iat: 100,
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
