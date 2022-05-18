const { Router } = require('express');
const MessageController = require('./app/Controllers/MessageController');
const UserController = require('./app/controllers/UserController');

const routes = new Router();

// USER ROUTES
routes.post("/user/store", UserController.store);
routes.post("/user/login", UserController.login);
routes.get("/user/show", UserController.show);
routes.put("/user/update", UserController.update);
routes.delete("/user/delete", UserController.delete);

// MESSAGE ROUTES
routes.get("/message/show", MessageController.show);
routes.post("/message/store", MessageController.store);

module.exports = routes;