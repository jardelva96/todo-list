import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Função para registrar o usuário
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Verificar se os campos estão preenchidos
    if (!username || !email || !password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registro concluído com sucesso! Redirecionando...');
        setTimeout(() => navigate('/login'), 2000); // Redireciona para a página de login
      } else if (response.status === 400) {
        // Tratamento de mensagens específicas do backend
        if (data.username) {
          setError('Usuário já existe. Tente outro nome.');
        } else if (data.email) {
          setError('Este email já está em uso. Tente outro.');
        } else {
          setError(data.detail || 'Erro ao registrar. Tente novamente.');
        }
      } else {
        setError('Erro ao registrar. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Registrar</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn-register" type="submit">
            Registrar
          </button>
        </form>
        <p className="login-link">
          Já tem uma conta? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
