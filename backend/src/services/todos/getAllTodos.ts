import type { ServiceResponseReturnType } from 'src/types';

import { AppDataSource } from 'src/utils/data-source';
import {
  ASCENDING_ORDER_TYPE,
  DESCENDING_ORDER_TYPE,
  INTERNAL_SERVER_ERROR,
} from 'src/utils/constants';

import { Todo, TodoStatus } from 'src/entities/todo';
import { Brackets } from 'typeorm';

interface IGetAllTodosServiceParams {
  pageNumber: number;
  pageSize: number;
  searchKeyword?: string;
  status?: string;
  sortByTitle?: string;
  sortByDate?: string;
  loggedInUserId: string;
}

class GetAllTodosService {
  static async run(parameters: IGetAllTodosServiceParams): ServiceResponseReturnType {
    try {
      const {
        pageNumber,
        pageSize,
        loggedInUserId,
        searchKeyword,
        sortByDate,
        sortByTitle,
        status,
      } = parameters;

      const todoQuery = AppDataSource.getRepository(Todo).createQueryBuilder('todo');

      todoQuery.where('todo.created_by = :userId', { userId: loggedInUserId });

      if (status) {
        let statusText: TodoStatus | undefined;
        if (status === 'TODO') {
          statusText = TodoStatus.TODO;
        } else if (status === 'IN_PROGRESS') {
          statusText = TodoStatus.INPROGRESS;
        } else if (status === 'DONE') {
          statusText = TodoStatus.DONE;
        }

        if (statusText) {
          todoQuery.andWhere('todo.status = :status', {
            status: statusText,
          });
        }
      }

      if (searchKeyword?.trim()) {
        todoQuery.andWhere(
          new Brackets(qb => {
            qb.where('todo.title Ilike :title OR todo.description Ilike :description', {
              title: `%${searchKeyword}%`,
              description: `%${searchKeyword}%`,
            });
          }),
        );
      }

      if (sortByTitle) {
        todoQuery.orderBy({
          'todo.title':
            sortByTitle === DESCENDING_ORDER_TYPE ? DESCENDING_ORDER_TYPE : ASCENDING_ORDER_TYPE,
        });
      }

      if (sortByDate) {
        todoQuery.orderBy({
          'todo.created_date':
            sortByDate === DESCENDING_ORDER_TYPE ? DESCENDING_ORDER_TYPE : ASCENDING_ORDER_TYPE,
        });
      }

      const [todos, count] = await todoQuery
        .skip((pageNumber - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();

      return [null, { data: { todos, count, pageNumber, pageSize, sortByDate, sortByTitle } }];
    } catch (error) {
      console.log('Error while fetching all todo items', error);
      return [{ errorType: INTERNAL_SERVER_ERROR }];
    }
  }
}

export default GetAllTodosService;
