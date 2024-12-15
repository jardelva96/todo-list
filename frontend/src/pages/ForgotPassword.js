import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/forgot-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setError('Erro ao enviar o email de recuperação.');
        return;
      }

      setSuccess('Email de recuperação enviado com sucesso!');
      setEmail('');
      setTimeout(() => {
        navigate('/login'); // Redireciona para a página de login após sucesso
      }, 2000);
    } catch (err) {
      setError('Erro ao conectar ao servidor. Tente novamente.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>Esqueci a Senha</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
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
          <button className="btn-reset-password" type="submit">
            Enviar Link de Recuperação
          </button>
        </form>
        <p className="login-link">
          Lembrou da sua senha? <a href="/login" onClick={() => navigate('/login')}>Entrar</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
