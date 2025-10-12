import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', dpi: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al registrar')

      // Redirect to login on success
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: 520 }}>
      <div className="card-body">
        <h3 className="card-title mb-3">Registro</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">DPI</label>
            <input className="form-control" name="dpi" value={form.dpi} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} />
          </div>

          <button className="btn btn-primary">Registrarse</button>
        </form>
      </div>
    </div>
  )
}
