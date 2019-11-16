# MongoDB rest API

The documentation is available at https://app.swaggerhub.com/apis-docs/Willena/mongodb-rest-api/1.0.0 and also on http://localhost:3000/api-docs if you start the server

## Overview

I designed this API to be as generic as possible and as close as possible to the NodeJs driver.

* Multiple mongodb connection in parallel (the api is multi user) 
* Simple generic interface to the Mongodb nodeJs driver
* queries sent as json in requests

## Bugs & Pull-Request

If you find a bug do not hesitate to open a new issue on the repo. 

Pull-request for new feature or bug correction are welcomed ! Feel free to contribute ! 

## Example:

1. Login to the API (create a server connection on the API server side)

    ```
    POST http://localhost:3000/api/login
    Content-Type: application/json
    
    {
      "username": "",
      "password": "",
      "hosts": [
        {
          "host": "localhost",
          "port": 27017
        }
      ]
    }
    ```
    Answer:
    ```json
    {
        "success" : true,
        "token": "AAAA-BBBB"
    } 
    ```

2. Use any of the endpoint to work with your database (i.e. find all elements in the "SUPPORT" collection in the ANFR db)

    ```
    GET http://localhost:3000/api/database/ANFR/SUPPORT/find?query={}
    X-TOKEN: AAAA-BBBB
    ```
    Answer : 
    ```json
    {
      "success":true,
      "data": [
        {"_id":"5dbb64b717267105a7827e37","SUP_ID":74185}
      ]
    }
    ```
   
3. Logout (to destroy the connexion on the server side) ! 

    ```
    POST http://localhost:3000/api/logout
    X-TOKEN: AAAA-BBBB
    ```
   
   Answer: 
    ```json
    {
       "success": true
    }
    ```

### prerequisites
- NodeJS >= 10.4
- NPM >= 6.10.0

### Running the server  
To run the server, run:  
  
```  
npm start  
```





