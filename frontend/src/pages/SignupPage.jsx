// frontend/src/pages/SignupPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/api';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole]         = useState('');
  const [error, setError]       = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !password || !role) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signupUser({ username, email, password, role });
      alert('Registration successful! Please sign in.');
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => { setUsername(e.target.value); setError(''); }}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
        />

        <select
          style={styles.input}
          value={role}
          onChange={(e) => { setRole(e.target.value); setError(''); }}
        >
          <option value="">Select Role</option>
          <option value="creator">Creator</option>
          <option value="editor">Editor</option>
        </select>

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleSignup}>
          Register
        </button>

        <div style={styles.switchText} onClick={() => navigate('/signin')}>
          Already have an account? Sign In
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

export default SignupPage;