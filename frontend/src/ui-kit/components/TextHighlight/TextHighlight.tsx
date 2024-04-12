import React from 'react';

import { Typography } from '@mui/material';

import type { TextHighlightProps } from './TextHighlight.props';

export const TextHighlight: React.FC<TextHighlightProps> = props => {
  const {
    text = '',
    highlightedTextText,
    textClassName,
    highlightedTextClassName,
    className,
  } = props;

  const getHighlightedJSX = () => {
    const resultParts = text.split(new RegExp(`(${highlightedTextText})`, 'gi'));
    return resultParts.map((item, index) => {
      if (item.toLowerCase() === highlightedTextText?.toLowerCase()) {
        return (
          <Typography
            key={`highlight-text-${item}-${index}`}
            component="span"
            variant="body1"
            className={`${textClassName} ${highlightedTextClassName}`}
          >
            {item}
          </Typography>
        );
      } else {
        return (
          <Typography
            key={`highlight-text-${item}-${index}`}
            component="span"
            variant="body1"
            className={textClassName}
          >
            {item}
          </Typography>
        );
      }
    });
  };

  return (
    <Typography variant="body1" className={`${textClassName} ${className}`}>
      {getHighlightedJSX()}
    </Typography>
  );
};

TextHighlight.displayName = 'TextHighlight';
