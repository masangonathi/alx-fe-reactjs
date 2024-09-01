// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

test('renders TodoList component with initial todos', () => {
  render(<TodoList />);
  const todoItems = screen.getAllByRole('listitem');
  expect(todoItems).toHaveLength(2);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build a Todo List')).toBeInTheDocument();
});

test('adds a new todo', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'New Todo' },
    });
    fireEvent.click(screen.getByText('Add Todo'));
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles a todo completed status', () => {
    render(<TodoList />);
    const todoItem = screen.getByText('Learn React');
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
  