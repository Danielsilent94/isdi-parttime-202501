# Burguer Bliss Api

## Api Endpoints

### POST `/users`:
```sh
curl -X POST http://localhost:5173/users \
    -H "Content-Type: application/json" \
    -d '{"email": "taylor@mail.com", "password": "12345Aa!"}' -v
```
**expected response:**    
-  201 Created

### POST `/users/auth`
```sh
curl -X POST http://localhost:5173/users/auth \
    -H "Content-Type: application/json" \
    -d '{"email": "danny@mail.com", "password": "12345Aa!"}' -v
```
**expected response:**    
-  200 OK + Body: {id (type: number)}

### GET `/users/username`
```sh
curl -X GET http://localhost:5173/users/username \
    -H "Authorization: Basic 1745520811922" -v
```
**expected response:**    
-  200 OK + Body: {username (type: string)}