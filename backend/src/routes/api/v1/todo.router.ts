import express from 'express';

import todosController from 'src/controllers/todos.controller';
import Authenticate from 'src/middlewares/authenticate';

const args = { mergeParams: true };
const todoRouter = express.Router(args);

todoRouter.route('/').get(Authenticate, todosController.GetAllTodos);

todoRouter.route('/').post(Authenticate, todosController.CreateTodo);

todoRouter.route('/:todoId').put(Authenticate, todosController.UpdateTodo);

todoRouter.route('/:todoId').delete(Authenticate, todosController.DeleteTodo);

export { todoRouter };
