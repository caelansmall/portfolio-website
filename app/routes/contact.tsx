import React from "react";

// Subtle accent SVG background shape (reuse from About)
const AccentSVG: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    width="700"
    height="700"
    viewBox="0 0 700 700"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute',
      ...style,
      zIndex: 0,
      filter: 'blur(48px)',
      opacity: 0.22,
      pointerEvents: 'none',
    }}
  >
    <circle cx="350" cy="350" r="280" fill="url(#paint0_radial)" />
    <defs>
      <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(350 350) scale(280)">
        <stop stopColor="#408EFF" />
        <stop offset="1" stopColor="#B440FF" stopOpacity="0.7" />
      </radialGradient>
    </defs>
  </svg>
);

const EMAIL = "smallc@merrimack.edu";
const LINKEDIN = "https://www.linkedin.com/in/caelan-small/";

export default function Contact() {
  return (
    <div
      style={{
        background: "#0e172a",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        overflowY: "auto",
        position: "relative",
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle blurred gradient background accents */}
      <div
        style={{
          position: 'fixed',
          zIndex: 0,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          background: `radial-gradient(circle at 25% 30%, rgba(64,142,255,0.20) 0, rgba(64,142,255,0.08) 40%, transparent 70%),\n                       radial-gradient(circle at 75% 70%, rgba(180,64,255,0.16) 0, rgba(180,64,255,0.07) 35%, transparent 70%)`,
          filter: 'blur(32px)',
        }}
      />
      <AccentSVG style={{ top: -120, left: -180 }} />
      <AccentSVG style={{ bottom: -120, right: -180, transform: 'rotate(180deg)' }} />
      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 600,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '48px 32px',
          color: '#fff',
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '2.1rem', letterSpacing: '-1.2px', background: 'linear-gradient(90deg,#408EFF,#B440FF 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textAlign: 'left' }}>
          Get in Touch
        </h1>
        <p style={{ fontSize: '1.18rem', lineHeight: 1.7, marginBottom: '2.2rem', color: 'rgba(255,255,255,0.92)' }}>
          I’m always open to connecting with fellow engineers, collaborators, or anyone interested in my work. Feel free to reach out!
        </p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 28, marginBottom: 32 }}>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              display: 'inline-block',
              padding: '0.85em 2.1em',
              borderRadius: 8,
              background: 'linear-gradient(90deg,#408EFF,#B440FF 85%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.15rem',
              textDecoration: 'none',
              boxShadow: '0 2px 16px 0 rgba(64,142,255,0.10)',
              transition: 'transform 0.12s',
              outline: 'none',
              border: 'none',
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Email Me
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.85em 2.1em',
              borderRadius: 8,
              background: '#232d3d',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.15rem',
              textDecoration: 'none',
              boxShadow: '0 2px 16px 0 rgba(64,142,255,0.10)',
              border: '1.5px solid #408EFF',
              transition: 'background 0.18s, color 0.18s, transform 0.12s',
              outline: 'none',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'linear-gradient(90deg,#408EFF,#B440FF 85%)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#232d3d';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            LinkedIn
          </a>
        </div>
      </main>
    </div>
  );
}
