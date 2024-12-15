import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); // Alterado de email para username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Função para tratar o login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Exibe erro detalhado, se existir
        setError(data.detail || 'Usuário ou senha incorretos.');
        return;
      }

      // Salva tokens no localStorage
      localStorage.setItem('token', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      // Redireciona para página de tarefas
      navigate('/tasks');
    } catch (err) {
      setError('Erro ao conectar ao servidor. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
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
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-options">
            <label>
              <input type="checkbox" /> Lembrar-me
            </label>
            {/* Usando navigate para recuperação de senha */}
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="forgot-password"
            >
              Esqueceu a senha?
            </button>
          </div>
          <button className="btn-login" type="submit">
            Entrar
          </button>
        </form>
        <p className="register-link">
          Não tem uma conta?{' '}
          <button type="button" onClick={() => navigate('/register')} className="btn-link">
            Registrar-se
          </button>
        </p>
        <div className="social-login">
          <p>Logar com</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" />
            </a>
            <a href="https://apple.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="Apple" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
