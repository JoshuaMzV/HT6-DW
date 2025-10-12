import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { user, logout } = useAuth()

  return (
    <div className="container mt-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1>HT6 - Usuarios</h1>
        <div>
          {user ? (
            <>
              <span className="me-3">Hola, {user.name}</span>
              <button className="btn btn-sm btn-outline-secondary" onClick={logout}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link className="btn btn-primary me-2" to="/register">Registrar</Link>
              <Link className="btn btn-outline-primary" to="/login">Iniciar sesión</Link>
            </>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<div className="alert alert-info">Bienvenido. Regístrate o inicia sesión.</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
