import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Memoize headers para evitar dependências desnecessárias
  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : null),
    [token]
  );

  // Carregar tarefas
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tasks/", { headers });
      setTasks(response.data.results || response.data);
    } catch (err) {
      setError("Erro ao buscar as tarefas.");
    }
  }, [headers]);

  // Carregar categorias (fixas no frontend para evitar erros)
  useEffect(() => {
    const defaultCategories = [
      { id: 1, name: "Trabalho" },
      { id: 2, name: "Estudos" },
      { id: 3, name: "Lazer" },
    ];
    setCategories(defaultCategories);
  }, []);

  // Criar tarefa
  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newTask.category) {
      setError("Selecione uma categoria.");
      return;
    }

    try {
      const taskData = {
        title: newTask.title,
        description: newTask.description,
        category: parseInt(newTask.category), // Enviar ID como número
      };

      await axios.post("http://localhost:8000/api/tasks/", taskData, { headers });
      setSuccess("Tarefa criada com sucesso!");
      fetchTasks();
      setNewTask({ title: "", description: "", category: "" });
    } catch (err) {
      setError("Erro ao criar a tarefa. Verifique os dados.");
    }
  };

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    if (headers) {
      fetchTasks();
      setLoading(false);
    } else {
      setError("Você precisa estar logado.");
      setLoading(false);
    }
  }, [headers, fetchTasks]);

  return (
    <div className="tasklist-container">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <h1>Gerenciamento de Tarefas</h1>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="tasklist-box">
            <h2>Criar Nova Tarefa</h2>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  placeholder="Título da tarefa"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <input
                  type="text"
                  placeholder="Descrição"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Categoria</label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-create-task">
                Criar Tarefa
              </button>
            </form>
          </div>

          <div className="tasklist-display">
            <h2>Minhas Tarefas</h2>
            {tasks.length > 0 ? (
              <table className="tasklist-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Data de Criação</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>
                        {categories.find((c) => c.id === task.category)?.name || "Desconhecida"}
                      </td>
                      <td>{new Date(task.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhuma tarefa encontrada.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
