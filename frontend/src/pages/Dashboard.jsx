// frontend/src/pages/Dashboard.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Dashboard() {
  const [projects, setProjects]       = useState([]);
  const [projectName, setProjectName] = useState('');
  const [error, setError]             = useState('');

  const navigate = useNavigate();

  // Read user from localStorage (set during login)
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isCreator = user?.role === 'creator';

  const fetchProjects = async () => {
    try {
      const response = await API.get('projects/');
      setProjects(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load projects');
    }
  };

  const createProject = async () => {
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }
    try {
      await API.post('projects/', { name: projectName });
      setProjectName('');
      setError('');
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create project');
    }
  };

  useEffect(() => {
    if (!user?.user_id) {
      navigate('/signin');
      return;
    }
    fetchProjects();
  }, []);

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Video Collaboration Dashboard 🎬</h1>
        <p style={styles.welcome}>
          Welcome, <b>{user?.username}</b>
          <span style={{
            ...styles.roleBadge,
            background: isCreator
              ? 'linear-gradient(45deg, #FF70BF, #D552A3)'
              : 'rgba(255,255,255,0.2)',
          }}>
            {user?.role}
          </span>
        </p>
      </div>

      {/* Create Project — creators only */}
      {isCreator && (
        <div style={styles.glassCard}>
          <h3 style={{ marginTop: 0 }}>Create Project</h3>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => { setProjectName(e.target.value); setError(''); }}
          />
          <button style={styles.button} onClick={createProject}>
            Create Project
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      )}

      {/* Editor notice */}
      {!isCreator && (
        <div style={{ ...styles.glassCard, opacity: 0.7, textAlign: 'center' }}>
          <p style={{ margin: 0 }}>
            👁️ You have <b>editor</b> access — you can view and edit projects you're invited to.
          </p>
        </div>
      )}

      {/* Project Grid */}
      <div style={styles.grid}>
        {projects.map((project) => (
          <div key={project.id} style={styles.projectCard}>
            <h3 style={{ marginBottom: '8px' }}>{project.name}</h3>
            <p style={{ opacity: 0.6, fontSize: '13px', margin: 0 }}>
              Project ID: {project.id}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #462C7D, #831C91, #D552A3, #FF70BF)',
    padding: '50px 20px',
    fontFamily: "'Segoe UI', sans-serif",
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  welcome: {
    opacity: 0.85,
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  roleBadge: {
    padding: '3px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  glassCard: {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    padding: '25px',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '25px',
    boxSizing: 'border-box',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
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
    marginTop: '8px',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '900px',
  },
  projectCard: {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(15px)',
    borderRadius: '18px',
    border: '1px solid rgba(255,255,255,0.15)',
    padding: '20px',
    transition: '0.3s',
    cursor: 'pointer',
  },
};

export default Dashboard;