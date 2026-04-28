// frontend/src/pages/LandingPage.jsx

import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Video Collaboration Platform 🎬</h1>
        <p style={styles.subtitle}>
          Edit, collaborate, and review videos in one unified workspace.
        </p>
        <div style={styles.btnGroup}>
          <button style={styles.btnPrimary} onClick={() => navigate('/signin')}>
            Sign In
          </button>
          <button style={styles.btnOutline} onClick={() => navigate('/signup')}>
            Register
          </button>
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
    padding: '50px 40px',
    maxWidth: '480px',
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
  title: {
    fontSize: '28px',
    fontWeight: 600,
    marginBottom: '12px',
  },
  subtitle: {
    opacity: 0.8,
    fontSize: '15px',
    marginBottom: '30px',
  },
  btnGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  btnPrimary: {
    padding: '12px 28px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(45deg, #FF70BF, #D552A3)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  },
  btnOutline: {
    padding: '12px 28px',
    borderRadius: '12px',
    border: '2px solid rgba(255,255,255,0.5)',
    background: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  },
};

export default LandingPage;