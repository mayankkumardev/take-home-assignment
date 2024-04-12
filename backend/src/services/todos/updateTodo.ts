import Joi from 'joi';

import { AppDataSource } from 'src/utils/data-source';
import { INTERNAL_SERVER_ERROR, INVALID_TODO, UNAUTHORIZED } from 'src/utils/constants';

import type { TodoStatus } from 'src/entities/todo';
import { DONE, INPROGRESS, TODO, Todo } from 'src/entities/todo';
import type { ServiceResponseReturnType } from 'src/types';
import { fieldsValidator } from 'src/utils/methodHelper';

interface IUpdateTodoSchemaParams {
  status?: TodoStatus;
  description?: string;
  title?: string;
  todoId: string;
  userId: string;
}

const UpdateTodoSchema = Joi.object({
  status: Joi.string().valid(TODO, INPROGRESS, DONE),
  description: Joi.string().trim(),
  title: Joi.string().trim(),
}).or('status', 'description', 'title');

class UpdateTodoService {
  static async run({
    status,
    description,
    title,
    userId,
    todoId,
  }: IUpdateTodoSchemaParams): ServiceResponseReturnType {
    try {
      // Validating parameters
      const errors = fieldsValidator({
        schema: UpdateTodoSchema,
        fields: { status, description, title },
      });

      if (errors) {
        return [errors];
      }

      const todoRepository = AppDataSource.getRepository(Todo);

      const todoData = await todoRepository.findOneBy({
        created_by: {
          id: userId,
        },
        id: todoId,
      });

      if (!todoData) {
        return [
          {
            errorType: UNAUTHORIZED,
            message: INVALID_TODO,
          },
        ];
      }

      await todoRepository.save({
        id: todoId,
        status: status ?? todoData.status,
        description: description ?? todoData.description,
        title: title ?? todoData.title,
      });

      return [
        null,
        {
          data: { status, description, title },
          message: `To Do record has been successfully updated!`,
        },
      ];
    } catch (error) {
      console.log('Error while updating a todo item', error);
      return [{ errorType: INTERNAL_SERVER_ERROR }];
    }
  }
}

export default UpdateTodoService;
