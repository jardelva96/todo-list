// TaskList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

test('exibe tarefas corretamente', () => {
  const tasks = [
    { id: 1, title: 'Tarefa 1', description: 'Descrição da Tarefa 1' },
    { id: 2, title: 'Tarefa 2', description: 'Descrição da Tarefa 2' },
  ];

  render(<TaskList tasks={tasks} onDelete={() => {}} />);

  tasks.forEach((task) => {
    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.description)).toBeInTheDocument();
  });
});

test('deleta uma tarefa', () => {
  const tasks = [{ id: 1, title: 'Tarefa 1', description: 'Descrição da Tarefa 1' }];
  const handleDelete = jest.fn();

  render(<TaskList tasks={tasks} onDelete={handleDelete} />);

  fireEvent.click(screen.getByText('Deletar'));

  expect(handleDelete).toHaveBeenCalledWith(1);
});
