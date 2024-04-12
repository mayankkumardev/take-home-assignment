import Joi from 'joi';

import { AppDataSource } from 'src/utils/data-source';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_TODO,
  INVALID_TODO_ID,
  UNAUTHORIZED,
} from 'src/utils/constants';

import type { ServiceResponseReturnType } from 'src/types';
import { Todo } from 'src/entities/todo';
import { fieldsValidator } from 'src/utils/methodHelper';

const DeleteTodoSchema = Joi.object({
  todoId: Joi.string().guid().message(INVALID_TODO_ID),
});

interface IDeleteTodoServiceParams {
  todoId: string;
  userId: string;
}

class DeleteTodoService {
  static async run({ userId, todoId }: IDeleteTodoServiceParams): ServiceResponseReturnType {
    try {
      // Validating parameters
      const errors = fieldsValidator({
        schema: DeleteTodoSchema,
        fields: { todoId },
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

      await todoRepository.delete({ id: todoId });

      return [null, { message: `To Do '${todoData.title}' successfully deleted!` }];
    } catch (error) {
      console.log('Error while deleting a todo item', error);
      return [{ errorType: INTERNAL_SERVER_ERROR }];
    }
  }
}

export default DeleteTodoService;
