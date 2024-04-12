import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';

import { getDate } from '@todo/helpers/getDate';
import { getTime } from '@todo/helpers/getTime';
import { useRoutes } from '@todo/hooks/useRoutes';
import { useDeleteTodoMutation } from '@todo/queries/useDeleteTodoMutation';
import { Dialog } from '@todo/ui-kit/components/Dialog/Dialog';
import { TextHighlight } from '@todo/ui-kit/components/TextHighlight/TextHighlight';
import { colors } from '@todo/ui-kit/theme';

import { TodoAction } from '../../enums';
import { capitalizeFirstLetter } from '../../helpers';
import { ConfirmTodoDelete } from '../ConfirmTodoDelete/ConfirmTodoDelete';

import type { TodoCardProps } from './TodoCard.props';
import { StyledTodoCard } from './TodoCard.styles';

export const TodoCard: React.FC<TodoCardProps> = props => {
  const { id, title, description, status, date, highlightedText, resetPage } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { gotoTodo } = useRoutes();
  const deleteTodoMutation = useDeleteTodoMutation();

  const onTodoDelete = async () => {
    await deleteTodoMutation.mutateAsync({ id });
    resetPage();
  };

  return (
    <StyledTodoCard>
      <CardHeader
        title={
          <TextHighlight
            text={capitalizeFirstLetter(title)}
            highlightedTextText={highlightedText}
            textClassName="title-text"
            highlightedTextClassName="highlight-text"
            className="single-line-ellipsis"
          />
        }
      />

      <CardContent>
        <TextHighlight
          text={description}
          highlightedTextText={highlightedText}
          textClassName="description-text"
          highlightedTextClassName="highlight-text"
        />
      </CardContent>

      <CardActions disableSpacing>
        <Box>
          <Typography variant="body2" color={colors.gray}>
            <strong>Status: </strong>
            {status}
          </Typography>

          <Typography variant="body2" color={colors.gray}>
            <strong>Date: </strong>
            {getDate(new Date(date))}
          </Typography>

          <Typography variant="body2" color={colors.gray}>
            <strong>Time: </strong>
            {getTime(new Date(date))}
          </Typography>
        </Box>

        <Box>
          <IconButton
            onClick={async () => {
              await gotoTodo(TodoAction.edit, id);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>

          <IconButton
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </CardActions>

      <Dialog
        testId="todo-card__delete-confirm-dlg"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ConfirmTodoDelete
          isDisable={deleteTodoMutation.isPending}
          onDelete={onTodoDelete}
          onCancel={() => {
            setIsOpen(false);
          }}
        />
      </Dialog>
    </StyledTodoCard>
  );
};

TodoCard.displayName = 'TodoCard';
