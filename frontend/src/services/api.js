import axios from 'axios';

// Configuração do Axios
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0MTIyODYxLCJpYXQiOjE3MzQxMjEwNjEsImp0aSI6ImY5ZjJmN2E2MGU3ZTRhMDg5OTVjYTdiNmVjOWQyMjFlIiwidXNlcl9pZCI6MX0.ZZfrY4STzw0T1-AmEQEwKR2EugDn2uYFRAB6Fg5cv4s',
    },
});

// Funções de API
export const getTasks = async () => {
    const response = await api.get('/tasks/');
    return response.data;
};

export const createTask = async (task) => {
    const response = await api.post('/tasks/', task);
    return response.data;
};

export const updateTask = async (id, task) => {
    const response = await api.put(`/tasks/${id}/`, task);
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await api.delete(`/tasks/${id}/`);
    return response.data;
};
