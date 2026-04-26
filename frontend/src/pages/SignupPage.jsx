import { useState } from 'react';

import { signupUser } from '../services/api';


function SignupPage() {

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');


  // -----------------------------
  // Handle Signup
  // -----------------------------
  const handleSignup = async () => {

    try {

      const response = await signupUser({
        username,
        email,
        password
      });

      setMessage(response.data.message);

    } catch (error) {

      console.error(error);

      setMessage(
        error.response?.data?.error ||
        'Signup failed'
      );
    }
  };


  return (

    <div className="container mt-5">

      <h2>Create Account</h2>

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
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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
          className="btn btn-success"
          onClick={handleSignup}
        >
          Register
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

export default SignupPage;