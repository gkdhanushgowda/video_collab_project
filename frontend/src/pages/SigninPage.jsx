// frontend/src/pages/SigninPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await loginUser({ username, password });

      // Save full user object including role
      localStorage.setItem('user', JSON.stringify(response.data));

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid username or password');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => { setUsername(e.target.value); setError(''); }}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleLogin}>
          Sign In
        </button>

        <div style={styles.switchText} onClick={() => navigate('/signup')}>
          Don't have an account? Register
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #462C7D, #831C91, #D552A3, #FF70BF)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    padding: '40px',
    width: '100%',
    maxWidth: '380px',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 500,
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '7px 0',
    borderRadius: '12px',
    border: 'none',
    outline: 'none',
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    marginTop: '12px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(45deg, #FF70BF, #D552A3)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  },
  error: {
    color: '#ffb3d9',
    fontSize: '13px',
    textAlign: 'center',
    marginTop: '8px',
  },
  switchText: {
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '13px',
    opacity: 0.8,
    cursor: 'pointer',
  },
};

export default SigninPage;