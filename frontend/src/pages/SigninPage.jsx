import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { loginUser } from '../services/api';


function SigninPage() {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  const navigate = useNavigate();


  // -----------------------------
  // Handle Login
  // -----------------------------
  const handleLogin = async () => {

  try {

    const response = await loginUser({
      username,
      password
    });

    // Save user locally
    localStorage.setItem(
      'user',
      JSON.stringify(response.data)
    );

    // Success popup
    alert('Login successful 🎉');

    // Redirect to dashboard
    navigate('/dashboard');

  } catch (error) {

    console.error(error);

    // Error popup
    alert(
      error.response?.data?.error ||
      'Invalid username or password'
    );
  }
};


  return (

    <div className="container mt-5">

      <h2>Sign In</h2>

      <div className="card p-4 mt-3">

        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Sign In
        </button>

        {message && (
          <p className="mt-3">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default SigninPage;