import "./app.css";
import Navbar from "./navbar";
import { Outlet, useNavigate } from 'react-router-dom';

function LogoButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      aria-label="Go to Home"
      role="link"
      tabIndex={0}
      className="hidden md:flex" // Hide on mobile, show on md+
      style={{
        alignItems: 'center',
        fontFamily: 'Fredoka, Inter, Segoe UI, Arial, sans-serif',
        fontWeight: 600,
        fontSize: '1.35rem',
        color: '#e6e6e6',
        letterSpacing: '0.14em',
        marginLeft: '-48px',
        marginRight: 28,
        userSelect: 'none',
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        outline: 'none',
        transition: 'color 0.15s',
      }}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { navigate('/'); } }}
    >
      CKFS
    </button>
  );
}

export default function App() {
  return (
    <div className="absolute top-0 left-0 h-full w-full" style={{ overflowX: 'hidden' }} >
      <Navbar logoComponent={<LogoButton />} />
      <Outlet />
    </div>
  );
}