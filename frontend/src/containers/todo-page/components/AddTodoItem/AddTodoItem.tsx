import React from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useRoutes } from '@todo/hooks/useRoutes';
import { useCreateTodoMutation } from '@todo/queries/useCreateTodoMutation';

import { TodoStatus } from '../../enums';

import type { AddTodoItemProps } from './AddTodoItem.props';
import { AddTodoItemWrapper } from './AddTodoItem.styles';

const AddTodoItemSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

export const AddTodoItem: React.FC<AddTodoItemProps> = props => {
  const createTodoMutation = useCreateTodoMutation();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: AddTodoItemSchema,
    onSubmit: values => {
      const { title, description } = values;
      createTodoMutation.mutate({ title, description, status: TodoStatus.todo });
    },
  });

  const { gotoTodo } = useRoutes();

  return (
    <AddTodoItemWrapper>
      <Box className="title-box-wrapper">
        <Typography variant="h4">Add Todo</Typography>

        <IconButton
          onClick={async () => {
            await gotoTodo();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Box>

      <Box component="form" className="add-todo-form" onSubmit={handleSubmit}>
        <Box className="text-field-wrapper">
          <Typography>Title</Typography>

          <TextField
            id="title"
            placeholder="Title"
            name="title"
            type="text"
            required
            fullWidth
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
          />
        </Box>

        <Box className="text-field-wrapper">
          <Typography>Description</Typography>

          <TextField
            id="description"
            placeholder="Description"
            name="description"
            type="text"
            required
            fullWidth
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && !!errors.description}
            helperText={touched.description && errors.description}
          />
        </Box>

        <Button type="submit" fullWidth variant="contained" disabled={createTodoMutation.isPending}>
          Submit
        </Button>
      </Box>
    </AddTodoItemWrapper>
  );
};

AddTodoItem.displayName = 'AddTodoItem';
