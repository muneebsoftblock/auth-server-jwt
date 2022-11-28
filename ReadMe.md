why do you wrote this code? what this code do? write steps from start to end.

1. client sends his email and password to auth server
2. server creates a jwt token and send to client, jwt can also contain an expiry date after which it becomes useless
3. client uses public key of server to decode this jwt token to get back his email, name and related data
4. client passes this token to server for future requests
5. if the token is expired or invalid then do not allow user to perform the action

"Info inside JWT is public so do not store passwords in JWT, JWT can not be tempered, But It can be read."

node backend.js
{
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjY1ZTEzMjk5LTcxMWEtNDQxNy1iMWFmLTgwNjA3MTMxMDM4ZiJ9.eyJuYW1lIjoiTXVuZWViIFp1YmFpciBLaGFuIiwiZW1haWwiOiJzaGFoYmF6QHdlYjNhdXRoLmlvIiwic3ViIjoiQ3VzdG9tIEpXVCBmb3IgV2ViM0F1dGggQ3VzdG9tIEF1dGgiLCJhdWQiOiJ1cm46bXktcmVzb3VyY2Utc2VydmVyIiwiaXNzIjoiaHR0cHM6Ly9teS1hdXRoei1zZXJ2ZXIiLCJpYXQiOjE2Njk1NTI4MDUsImV4cCI6MTY2OTU1Mjg2NX0.tPXLHkDFO-YRidQAxLrJGkkSFBGJuYB7-X_X9HHINiTw2leu1ft_qeN7fk8mEyIad70JHnyccGADSekpq33jRg'
}

node frontend.js
{
  decoded: {
    name: 'Muneeb Zubair Khan',
    email: 'shahbaz@web3auth.io',
    sub: 'Custom JWT for Web3Auth Custom Auth',
    aud: 'urn:my-resource-server',
    iss: 'https://my-authz-server',
    iat: 1669552805,
    exp: 1669552865
  }
}

from https://mkjwk.org/

Key Size
2048

Key Use
Signature

Algorithm
RS256: RSASSA-PKCS1-v1_5 using SHA-256

Key ID
SHA-256

Show X.509
No

Public and Private Keypair
{
    "p": "1SifZyR4FdBsy71JhQy21dVe9nnHOkZSXnFQY11VAcUUddLxocEDVnQY-MZ4QNOq-rzwsLwf0xGHSIocazEqZHEIpzWVZxFcEl-I4ILoRJifpvYQZgRKFGUNqLik4j-97YreawoYkh6RRBxfgTDbZ_Z0VsYQ9KmkDApWxKe-dMs",
    "kty": "RSA",
    "q": "p4cNyKqkGk5PyXLJI44RNT3HX93EhcietUgEPhQP4rnj44Ve0eRyEWhDVQBkG-fG0YHYSYC9JWLG2sOGTn4UwbVqLBX7kWzEMaTLypxmaJ9Oii8TWohWWaoKnxD89NCLJW0QTPq38KRFwGu-4pQqUKVIXbCK7ZCedvMwN256sDM",
    "d": "a4XR-XNDn2E_HAyltLT6DuOopO7VsKTcfxozAmoBsqWy7jVG4R69jV4sAST9x4CICUT8vHkfWHXSNXzC4UA7GFxodcGi9XrxWTIlcE0HuQ0Nb-kYuqIDve4Z2kXA6WA8wOXuJrBf5uSzmnr7i36UjlXm5arGBapL7HTK0QCXsXaCX3kh6YIwA9T8hzH-2NyT5GyyWRASm_26el_RXQW-H7jzainw7EmEXGO3m4UyuD1pqjWISvDBw3YJJnINKl2chig6CV45AwfFm-rcG_CKhgVKdQpY0wdRVEJYOSP9Qnw8Lhl3AQjqO5F724dyXExgfldwbre7T0EfUoN6uc6FhQ",
    "e": "AQAB",
    "use": "sig",
    "kid": "lfr5QMWsLjUILEfYIeii_adEPmgBPwKtv0nMCT6ld9g",
    "qi": "CImhjb0A5xd5qaRKBkn8QtT7EPw8CBBpvecAWxpaj74G34aVS5MreIikTC6QnZV__GiRvBuuF4zT05oqGfkDJvWuWBnFTvpJFMC1vE62IZwRyF_UotCiXSys8rY9LtkrSgz3NrSYDXGok91RE2fFOPs5gC1rs8g41z0Ed3U7nGE",
    "dp": "BwqpgWnGAcp53Z0qMZgC7jt3QKMzPqyWCgKqSi4KId3V2DKYwuQybQe2z3kW_eVAL7pQJTaBwqJAmtfdKnlcUicdxxBRGC-NoBnB1tDcRW_ZTlWwov4fSF8yPVGkOMksSA2fXV_fAey6lcpuKUFo7h1JKJiwdLSp86_fv-1esFM",
    "alg": "RS256",
    "dq": "l0umDCrn54YAEquisYSVT-MKUy7iU_xaMNfoVPQjYJyHDiyd9Kr-xW_HF1YyEu2gpgdBASjOKZxqgJmCixLcxhCD4Wq89ponGbp9_e5_ok71TGC1dtaYPYQO8ZcTDDnm4Jb92Le5NQ_2mo_0JYawLIMItuxAm8o3ArAgRH93N_c",
    "n": "i33z4n4Y9MUAGlR8XaSA1ofHaHSwkqYm8wuxB5TKV600EbJ2CVztkdbOrwekPQaPaX9YAZxcIxLevOJxSpXkKV6PfrnaUq62_eT2Zi97yWU86ZGE96hNT6Bc9kNdU1pHq_j2Gyo9z5ZSoM7epwyNffe5zSkAGTfOsjDMHJ5qrvXv6ctYk3hTHfTMqzaSqo8bhjUiLhCM1I9BI-s_oJbW7q-NuWqXQzhnu86DJ7EHx_o1ADOBjiM56y9gJwLr799mtdMtOQfDIdLbM8Aq5-lfYL5z2LWH-LGpXOqVTyY7ss0EfKqXLFN_3rSI6vQj_MzTfEg9fKpgjseKBGsQPfrUcQ"
}


Public and Private Keypair Set
{
    "keys": [
        {
            "p": "1SifZyR4FdBsy71JhQy21dVe9nnHOkZSXnFQY11VAcUUddLxocEDVnQY-MZ4QNOq-rzwsLwf0xGHSIocazEqZHEIpzWVZxFcEl-I4ILoRJifpvYQZgRKFGUNqLik4j-97YreawoYkh6RRBxfgTDbZ_Z0VsYQ9KmkDApWxKe-dMs",
            "kty": "RSA",
            "q": "p4cNyKqkGk5PyXLJI44RNT3HX93EhcietUgEPhQP4rnj44Ve0eRyEWhDVQBkG-fG0YHYSYC9JWLG2sOGTn4UwbVqLBX7kWzEMaTLypxmaJ9Oii8TWohWWaoKnxD89NCLJW0QTPq38KRFwGu-4pQqUKVIXbCK7ZCedvMwN256sDM",
            "d": "a4XR-XNDn2E_HAyltLT6DuOopO7VsKTcfxozAmoBsqWy7jVG4R69jV4sAST9x4CICUT8vHkfWHXSNXzC4UA7GFxodcGi9XrxWTIlcE0HuQ0Nb-kYuqIDve4Z2kXA6WA8wOXuJrBf5uSzmnr7i36UjlXm5arGBapL7HTK0QCXsXaCX3kh6YIwA9T8hzH-2NyT5GyyWRASm_26el_RXQW-H7jzainw7EmEXGO3m4UyuD1pqjWISvDBw3YJJnINKl2chig6CV45AwfFm-rcG_CKhgVKdQpY0wdRVEJYOSP9Qnw8Lhl3AQjqO5F724dyXExgfldwbre7T0EfUoN6uc6FhQ",
            "e": "AQAB",
            "use": "sig",
            "kid": "lfr5QMWsLjUILEfYIeii_adEPmgBPwKtv0nMCT6ld9g",
            "qi": "CImhjb0A5xd5qaRKBkn8QtT7EPw8CBBpvecAWxpaj74G34aVS5MreIikTC6QnZV__GiRvBuuF4zT05oqGfkDJvWuWBnFTvpJFMC1vE62IZwRyF_UotCiXSys8rY9LtkrSgz3NrSYDXGok91RE2fFOPs5gC1rs8g41z0Ed3U7nGE",
            "dp": "BwqpgWnGAcp53Z0qMZgC7jt3QKMzPqyWCgKqSi4KId3V2DKYwuQybQe2z3kW_eVAL7pQJTaBwqJAmtfdKnlcUicdxxBRGC-NoBnB1tDcRW_ZTlWwov4fSF8yPVGkOMksSA2fXV_fAey6lcpuKUFo7h1JKJiwdLSp86_fv-1esFM",
            "alg": "RS256",
            "dq": "l0umDCrn54YAEquisYSVT-MKUy7iU_xaMNfoVPQjYJyHDiyd9Kr-xW_HF1YyEu2gpgdBASjOKZxqgJmCixLcxhCD4Wq89ponGbp9_e5_ok71TGC1dtaYPYQO8ZcTDDnm4Jb92Le5NQ_2mo_0JYawLIMItuxAm8o3ArAgRH93N_c",
            "n": "i33z4n4Y9MUAGlR8XaSA1ofHaHSwkqYm8wuxB5TKV600EbJ2CVztkdbOrwekPQaPaX9YAZxcIxLevOJxSpXkKV6PfrnaUq62_eT2Zi97yWU86ZGE96hNT6Bc9kNdU1pHq_j2Gyo9z5ZSoM7epwyNffe5zSkAGTfOsjDMHJ5qrvXv6ctYk3hTHfTMqzaSqo8bhjUiLhCM1I9BI-s_oJbW7q-NuWqXQzhnu86DJ7EHx_o1ADOBjiM56y9gJwLr799mtdMtOQfDIdLbM8Aq5-lfYL5z2LWH-LGpXOqVTyY7ss0EfKqXLFN_3rSI6vQj_MzTfEg9fKpgjseKBGsQPfrUcQ"
        }
    ]
}


Public Key
{
    "kty": "RSA",
    "e": "AQAB",
    "use": "sig",
    "kid": "lfr5QMWsLjUILEfYIeii_adEPmgBPwKtv0nMCT6ld9g",
    "alg": "RS256",
    "n": "i33z4n4Y9MUAGlR8XaSA1ofHaHSwkqYm8wuxB5TKV600EbJ2CVztkdbOrwekPQaPaX9YAZxcIxLevOJxSpXkKV6PfrnaUq62_eT2Zi97yWU86ZGE96hNT6Bc9kNdU1pHq_j2Gyo9z5ZSoM7epwyNffe5zSkAGTfOsjDMHJ5qrvXv6ctYk3hTHfTMqzaSqo8bhjUiLhCM1I9BI-s_oJbW7q-NuWqXQzhnu86DJ7EHx_o1ADOBjiM56y9gJwLr799mtdMtOQfDIdLbM8Aq5-lfYL5z2LWH-LGpXOqVTyY7ss0EfKqXLFN_3rSI6vQj_MzTfEg9fKpgjseKBGsQPfrUcQ"
}
