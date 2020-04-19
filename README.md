# Linking App Chat Service

_Linking App Chat_ is a NodeJS project which provides a Chat tool in order to allow _Linking App Front_ users a way of communication with each other. Regarding technologies involved, the following list offer an application overview:

- NodeJS
- Javascript
- Express
- Socket.io

## Routes

There is implemented an express routes in order to provide chat health check service. The following table provides a route overview regard to its path and main objective:

| Path    | Method | Req | Res                  | Objective                           |
| ------- | ------ | --- | -------------------- | ----------------------------------- |
| /health | GET    | N/A | Sanity Check message | Test express services health status |

## Available Scripts

In project root directory, it is possible to execute the following scripts:

### `npm start`

Runs the src/app.js file in order to run the application in both development adn production mode. It is important to bear in mind that nodeJS is execution engine:

```
"start": "node src/app.js"
```

### `npm test`

Currently, test is not implemented in this repository. 

## License

BSD

## Author Information

Asier Cidon
