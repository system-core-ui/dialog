import React from 'react';

export const Button = ({ children, ...props }: Record<string, unknown>) =>
  React.createElement('button', props, children);

export const IconButton = ({ children, ...props }: Record<string, unknown>) =>
  React.createElement('button', props, children);
