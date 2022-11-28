require('dotenv').config(); // enables loading .env vars
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const cors = require('cors');

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAi33z4n4Y9MUAGlR8XaSA1ofHaHSwkqYm8wuxB5TKV600EbJ2
CVztkdbOrwekPQaPaX9YAZxcIxLevOJxSpXkKV6PfrnaUq62/eT2Zi97yWU86ZGE
96hNT6Bc9kNdU1pHq/j2Gyo9z5ZSoM7epwyNffe5zSkAGTfOsjDMHJ5qrvXv6ctY
k3hTHfTMqzaSqo8bhjUiLhCM1I9BI+s/oJbW7q+NuWqXQzhnu86DJ7EHx/o1ADOB
jiM56y9gJwLr799mtdMtOQfDIdLbM8Aq5+lfYL5z2LWH+LGpXOqVTyY7ss0EfKqX
LFN/3rSI6vQj/MzTfEg9fKpgjseKBGsQPfrUcQIDAQABAoIBAGuF0flzQ59hPxwM
pbS0+g7jqKTu1bCk3H8aMwJqAbKlsu41RuEevY1eLAEk/ceAiAlE/Lx5H1h10jV8
wuFAOxhcaHXBovV68VkyJXBNB7kNDW/pGLqiA73uGdpFwOlgPMDl7iawX+bks5p6
+4t+lI5V5uWqxgWqS+x0ytEAl7F2gl95IemCMAPU/Icx/tjck+RsslkQEpv9unpf
0V0Fvh+482op8OxJhFxjt5uFMrg9aao1iErwwcN2CSZyDSpdnIYoOgleOQMHxZvq
3BvwioYFSnUKWNMHUVRCWDkj/UJ8PC4ZdwEI6juRe9uHclxMYH5XcG63u09BH1KD
ernOhYUCgYEA1SifZyR4FdBsy71JhQy21dVe9nnHOkZSXnFQY11VAcUUddLxocED
VnQY+MZ4QNOq+rzwsLwf0xGHSIocazEqZHEIpzWVZxFcEl+I4ILoRJifpvYQZgRK
FGUNqLik4j+97YreawoYkh6RRBxfgTDbZ/Z0VsYQ9KmkDApWxKe+dMsCgYEAp4cN
yKqkGk5PyXLJI44RNT3HX93EhcietUgEPhQP4rnj44Ve0eRyEWhDVQBkG+fG0YHY
SYC9JWLG2sOGTn4UwbVqLBX7kWzEMaTLypxmaJ9Oii8TWohWWaoKnxD89NCLJW0Q
TPq38KRFwGu+4pQqUKVIXbCK7ZCedvMwN256sDMCgYAHCqmBacYBynndnSoxmALu
O3dAozM+rJYKAqpKLgoh3dXYMpjC5DJtB7bPeRb95UAvulAlNoHCokCa190qeVxS
Jx3HEFEYL42gGcHW0NxFb9lOVbCi/h9IXzI9UaQ4ySxIDZ9dX98B7LqVym4pQWju
HUkomLB0tKnzr9+/7V6wUwKBgQCXS6YMKufnhgASq6KxhJVP4wpTLuJT/Fow1+hU
9CNgnIcOLJ30qv7Fb8cXVjIS7aCmB0EBKM4pnGqAmYKLEtzGEIPharz2micZun39
7n+iTvVMYLV21pg9hA7xlxMMOebglv3Yt7k1D/aaj/QlhrAsgwi27ECbyjcCsCBE
f3c39wKBgAiJoY29AOcXeamkSgZJ/ELU+xD8PAgQab3nAFsaWo++Bt+GlUuTK3iI
pEwukJ2Vf/xokbwbrheM09OaKhn5Ayb1rlgZxU76SRTAtbxOtiGcEchf1KLQol0s
rPK2PS7ZK0oM9za0mA1xqJPdURNnxTj7OYAta7PIONc9BHd1O5xh
-----END RSA PRIVATE KEY-----
`;
const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAi33z4n4Y9MUAGlR8XaSA1ofHaHSwkqYm8wuxB5TKV600EbJ2CVzt
kdbOrwekPQaPaX9YAZxcIxLevOJxSpXkKV6PfrnaUq62/eT2Zi97yWU86ZGE96hN
T6Bc9kNdU1pHq/j2Gyo9z5ZSoM7epwyNffe5zSkAGTfOsjDMHJ5qrvXv6ctYk3hT
HfTMqzaSqo8bhjUiLhCM1I9BI+s/oJbW7q+NuWqXQzhnu86DJ7EHx/o1ADOBjiM5
6y9gJwLr799mtdMtOQfDIdLbM8Aq5+lfYL5z2LWH+LGpXOqVTyY7ss0EfKqXLFN/
3rSI6vQj/MzTfEg9fKpgjseKBGsQPfrUcQIDAQAB
-----END RSA PUBLIC KEY-----
`;

app.set('json spaces', 2);

// Allow requests from client-side
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ origin: 'https://9d15-2400-adc5-436-1b00-85c6-2d1e-3ff3-ca0f.in.ngrok.io' }));
// app.use(cors());

app.get('/', (r, res) => res.json({ message: 'hi ' + Date() }));

app.get('/certs', async (req, res) => {
  try {
    res.status(200).json({
      keys: [
        {
          kty: 'RSA',
          e: 'AQAB',
          use: 'sig',
          kid: 'lfr5QMWsLjUILEfYIeii_adEPmgBPwKtv0nMCT6ld9g',
          alg: 'RS256',
          n: 'i33z4n4Y9MUAGlR8XaSA1ofHaHSwkqYm8wuxB5TKV600EbJ2CVztkdbOrwekPQaPaX9YAZxcIxLevOJxSpXkKV6PfrnaUq62_eT2Zi97yWU86ZGE96hNT6Bc9kNdU1pHq_j2Gyo9z5ZSoM7epwyNffe5zSkAGTfOsjDMHJ5qrvXv6ctYk3hTHfTMqzaSqo8bhjUiLhCM1I9BI-s_oJbW7q-NuWqXQzhnu86DJ7EHx_o1ADOBjiM56y9gJwLr799mtdMtOQfDIdLbM8Aq5-lfYL5z2LWH-LGpXOqVTyY7ss0EfKqXLFN_3rSI6vQj_MzTfEg9fKpgjseKBGsQPfrUcQ',
        },
      ],
    });
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
