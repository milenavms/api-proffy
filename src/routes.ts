import express from 'express';
import ClassControllers from './controllers/ClassesControllers';

const routes = express.Router();

const classControllers = new ClassControllers();

// Cadastro das Classes (Users, Classes e Schedule)
routes.post('/classes', classControllers.create );


// Listagem das Class
routes.get('/classes', classControllers.index );

export default routes;
