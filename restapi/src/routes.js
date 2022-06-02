const { Router } = require('express');
const MessageController = require('./app/Controllers/MessageController');
const UserController = require('./app/controllers/UserController');

const routes = new Router();

// USER ROUTES
routes.post("/user/store", UserController.verifyJWT, UserController.store);
routes.post("/user/login", UserController.login);
routes.get("/user/show", UserController.verifyJWT, UserController.show);
routes.put("/user/update", UserController.verifyJWT, UserController.update);
routes.delete("/user/delete", UserController.verifyJWT, UserController.delete);
routes.get("/user/auth", UserController.auth);

// MESSAGE ROUTES
routes.post("/message/show", UserController.verifyJWT, MessageController.show);
routes.post("/message/store", UserController.verifyJWT, MessageController.store);

module.exports = routes;