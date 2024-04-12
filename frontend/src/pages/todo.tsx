import React from 'react';

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { PrivateRoute } from '@todo/hoc/PrivateRoute';
import { PageLoading } from '@todo/ui-kit/components/PageLoading/PageLoading';

const TodoPage = dynamic(
  async () => await import('@todo/containers/todo-page/TodoPage').then(module => module.TodoPage),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);

const Todo: NextPage = props => {
  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Your todo list" />
      </Head>

      <PrivateRoute>
        <TodoPage />
      </PrivateRoute>
    </>
  );
};

export default Todo;
