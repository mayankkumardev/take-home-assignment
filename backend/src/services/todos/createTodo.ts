import Joi from 'joi';

import type { TodoStatus } from 'src/entities/todo';
import { DONE, INPROGRESS, TODO, Todo } from 'src/entities/todo';
import { User } from 'src/entities/user';

import { AppDataSource } from 'src/utils/data-source';
import { INTERNAL_SERVER_ERROR, INVALID_USER, UNAUTHORIZED } from 'src/utils/constants';

import type { ServiceResponseReturnType } from 'src/types';
import { fieldsValidator } from 'src/utils/methodHelper';

const CreateTodoSchema = Joi.object({
  status: Joi.string().valid(TODO, INPROGRESS, DONE).required(),
  description: Joi.string().trim().required(),
  title: Joi.string().trim().required(),
});

interface ICreateTodoServiceParams {
  status: TodoStatus;
  description: string;
  title: string;
  loggedInUserId: string;
}

class CreateTodoService {
  static async run({
    status,
    description,
    title,
    loggedInUserId,
  }: ICreateTodoServiceParams): ServiceResponseReturnType {
    try {
      // Validating parameters
      const errors = fieldsValidator({
        schema: CreateTodoSchema,
        fields: { status, description, title },
      });

      if (errors) {
        return [errors];
      }

      const UserRepository = AppDataSource.getRepository(User);

      const userData = await UserRepository.findOneBy({ id: loggedInUserId });

      if (!userData) {
        return [
          {
            errorType: UNAUTHORIZED,
            message: INVALID_USER,
          },
        ];
      }

      const todoRepository = AppDataSource.getRepository(Todo);

      const todo = new Todo();
      todo.status = status;
      todo.description = description;
      todo.title = title;
      todo.created_by = userData;

      await todoRepository.save(todo);

      return [
        null,
        {
          data: { status, description, title },
          message: `To Do '${todo.title}' successfully created!`,
        },
      ];
    } catch (error) {
      console.log('Error while creating a todo item', error);
      return [{ errorType: INTERNAL_SERVER_ERROR }];
    }
  }
}

export default CreateTodoService;
