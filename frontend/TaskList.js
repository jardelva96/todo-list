import React, { useState, useEffect } from 'react';

const TaskList = () => {
  // Aqui estamos usando o useState para armazenar a lista de tarefas
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Supondo que você tenha uma função para buscar as tarefas da API
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);  // Atualiza o estado com as tarefas
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
