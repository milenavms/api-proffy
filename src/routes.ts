import express from 'express';
import ClassControllers from './controllers/ClassesControllers';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

const classControllers = new ClassControllers();
const connectionsController = new ConnectionsController();

// Cadastro das Classes (Users, Classes e Schedule)
routes.post('/classes', classControllers.create );
// Listagem das Class
routes.get('/classes', classControllers.index );


// Criando as Connections
routes.post('/connections', connectionsController.create );
routes.get('/connections', connectionsController.index );

export default routes;
