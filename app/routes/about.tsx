import React from "react";

// Subtle accent SVG background shape
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

const aboutText = [
  "Hi, I’m Caelan Small — a passionate and versatile Software Engineer with a strong foundation in computer engineering and a knack for building efficient, scalable, and user-focused solutions.",
  "I currently work at Northrop Grumman, where I develop full-stack applications, automate infrastructure with tools like Ansible and Docker, and craft backend systems that streamline internal processes. I hold a Bachelor of Science in Computer Engineering with a minor in Mathematics from Merrimack College.",
  "Throughout my career, I’ve tackled a diverse range of projects that showcase my technical versatility and creativity. Notably, I engineered a semi-autonomous RC car and developed a COVID-19 occupancy counter, both of which required seamlessly integrating hardware and software to address real-world challenges. My experience spans technologies from Angular/Node.js web applications to embedded systems and microcontroller programming. These hands-on projects are a testament to my drive for building innovative solutions that have a tangible impact.",
  "I thrive in collaborative environments where I can tackle complex challenges, continuously learn, and contribute to meaningful, impactful projects. I’m committed to building reliable, well-crafted solutions that make a real difference.",
];

export default function About() {
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
          maxWidth: 900,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: 120,
          paddingLeft: 32,
          paddingRight: 32,
          color: '#fff',
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
          boxSizing: 'border-box',
          overflow: 'visible',
          textAlign: 'left',
        }}
      >
        <h1 style={{ fontSize: '2.9rem', fontWeight: 800, marginBottom: '2.1rem', letterSpacing: '-1.5px', background: 'linear-gradient(90deg,#408EFF,#B440FF 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textAlign: 'left' }}>
          About Me
        </h1>
        {aboutText.map((p, i) => (
          <p key={i} style={{ fontSize: '1.32rem', lineHeight: 1.7, marginBottom: '1.8rem', fontWeight: 400, letterSpacing: '-0.2px', color: 'rgba(255,255,255,0.92)', textAlign: 'left' }}>{p}</p>
        ))}
      </main>
    </div>
  );
}
