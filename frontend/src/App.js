import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './pages/TaskList';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword'; // Importando a página de "Esqueceu a Senha"

import Weather from './components/Weather';
import Clock from './components/Clock';
import Map from './components/Map';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <Link className="header-link" to="/tasks">Tarefas</Link>
            <Link className="header-link" to="/login">Login</Link>
            <Link className="header-link" to="/register">Registrar</Link>
            {/* Botão para o portfólio AWS */}
            <a
              className="header-link portfolio-link"
              href="https://portfolio-aws-username.s3.us-east-2.amazonaws.com/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfólio AWS
            </a>
          </div>
          <div className="header-right">
            <Clock />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="map-container">
            <Map />
          </div>
          <div className="weather-container">
            <Weather />
          </div>

          <div className="form-container">
            <Routes>
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Adicionando a rota de "Esqueceu a senha" */}
              <Route path="/" element={<TaskList />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>Projeto desenvolvido como parte do teste para o sistema de gerenciamento de tarefas.</p>
            <p>Desenvolvedor: JARDEL ALVES</p>
            <p>Versão: 1.0.0</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
