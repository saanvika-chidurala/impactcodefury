import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // DEMO BYPASS — not real auth, just gets us into the app
    localStorage.setItem('demoUser', JSON.stringify({ email: email || 'demo@wealthpath.app' }))
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          <div className="brand-mark">W</div>
          <h1>WealthPath</h1>
          <p>Sign in to continue</p>
        </div>
        <div className="auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@wealthpath.app" />
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="anything works" />
            <button className="auth-button" type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login