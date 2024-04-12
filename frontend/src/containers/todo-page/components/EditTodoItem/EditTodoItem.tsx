import React from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useRoutes } from '@todo/hooks/useRoutes';
import { useUpdateTodoMutation } from '@todo/queries/useUpdateTodoMutation';

import { TodoStatus } from '../../enums';

import type { EditTodoItemProps } from './EditTodoItem.props';
import { EditTodoItemWrapper } from './EditTodoItem.styles';

const EditTodoItemSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
});

export const EditTodoItem: React.FC<EditTodoItemProps> = props => {
  const { todoId, todoList } = props;

  const editTodo = todoList.find(item => item.id === todoId);
  const { title = '', description = '', status = '' } = editTodo ?? {};

  const { gotoTodo } = useRoutes();
  const updateTodoMutation = useUpdateTodoMutation();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title,
      description,
      status,
    },
    validationSchema: EditTodoItemSchema,
    onSubmit: values => {
      const { title, description, status } = values;
      updateTodoMutation.mutate({ id: todoId, title, description, status: status as TodoStatus });
    },
  });

  return (
    <EditTodoItemWrapper>
      <Box className="title-box-wrapper">
        <Typography variant="h4">Update Todo</Typography>

        <IconButton
          onClick={async () => {
            await gotoTodo();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Box>

      <Box component="form" className="edit-todo-form" onSubmit={handleSubmit}>
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
            multiline
            minRows={5}
            maxRows={5}
          />
        </Box>

        <Box className="text-field-wrapper">
          <Typography>Status</Typography>

          <Select
            id="edit-todo__status"
            className="select-root"
            name="status"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {Object.values(TodoStatus).map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button type="submit" disabled={updateTodoMutation.isPending} fullWidth variant="contained">
          Update
        </Button>
      </Box>
    </EditTodoItemWrapper>
  );
};

EditTodoItem.displayName = 'EditTodoItem';
