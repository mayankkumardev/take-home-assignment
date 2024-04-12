import type { Response } from 'express';

import GetAllTodosService from 'src/services/todos/getAllTodos';
import CreateTodoService from 'src/services/todos/createTodo';
import UpdateTodoService from 'src/services/todos/updateTodo';
import DeleteTodoService from 'src/services/todos/deleteTodo';

import { sendResponse } from 'src/utils/responseHandler';

import type { CustomRequest } from 'src/types';

class TodosController {
  static async GetAllTodos(request: CustomRequest, response: Response) {
    sendResponse({
      service: GetAllTodosService,
      parameters: {
        pageNumber: Number(request.query.page_number) || 1,
        pageSize: Number(request.query.page_size) || 10,
        searchKeyword: request.query.search_keyword,
        sortByDate: request.query.sort_by_date,
        sortByTitle: request.query.sort_by_title,
        status: request.query.status,
        loggedInUserId: request.loggedInUserId,
      },
      response,
    });
  }

  static async CreateTodo(request: CustomRequest, response: Response) {
    sendResponse({
      service: CreateTodoService,
      parameters: {
        status: request.body.status,
        description: request.body.description,
        title: request.body.title,
        loggedInUserId: request.loggedInUserId,
      },
      response,
    });
  }

  static async UpdateTodo(request: CustomRequest, response: Response) {
    sendResponse({
      service: UpdateTodoService,
      parameters: {
        status: request.body.status,
        description: request.body.description,
        title: request.body.title,
        todoId: request.params.todoId,
        userId: request.loggedInUserId,
      },
      response,
    });
  }

  static async DeleteTodo(request: CustomRequest, response: Response) {
    sendResponse({
      service: DeleteTodoService,
      parameters: {
        todoId: request.params.todoId,
        userId: request.loggedInUserId,
      },
      response,
    });
  }
}

export default TodosController;
