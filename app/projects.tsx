import React from "react";

// Define the type for a project
interface Project {
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

// Example projects array (add more projects here easily)
const projects: Project[] = [
  {
    title: "Semi-Autonomous RC Car",
    description: "Developed a semi-autonomous Arduino-powered RC car with multiple driving modes—including remote control, roaming, parking, and summoning—using custom RF controllers and advanced line tracking with an RGB sensor for path differentiation.",
    imageUrl: "/images/seniorDesign.jpg",
    // link: "https://your-portfolio-link.com",
  },
  {
    title: "COVID-19 Auto Counter",
    description: "Designed and implemented an automated occupancy counter using IR sensors and an LCD display on the 8051 microcontroller, enabling essential businesses to safely monitor store capacity and enforce social distancing without additional staffing.",
    imageUrl: "/images/covidAutoCounter.png",
    // link: "https://your-task-tracker-link.com",
  },
  // Add more projects here
];

// ProjectSection: Handles mouseover effects and larger layout
interface ProjectSectionProps {
  project: Project;
  reverse?: boolean;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project, reverse = false }) => {
  const [hovered, setHovered] = React.useState(false);

  const sectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: reverse ? "row-reverse" : "row",
    alignItems: "center",
    background: hovered ? "#f6f7fa" : "#f8f9fa",
    borderRadius: 26,
    boxShadow: hovered
      ? "0 6px 24px rgba(0,0,0,0.12)"
      : "0 4px 18px rgba(0,0,0,0.09)",
    padding: hovered ? "56px 38px" : "48px 32px",
    gap: 64,
    maxWidth: 1700,
    minHeight: 210,
    margin: "0 auto",
    transition:
      "background 0.18s, box-shadow 0.18s cubic-bezier(.4,2,.6,1), transform 0.15s cubic-bezier(.4,2,.6,1), padding 0.15s cubic-bezier(.4,2,.6,1)",
    transform: hovered ? "scale(1.013)" : "scale(1)"
  };

  const imgStyle: React.CSSProperties = {
    width: hovered ? 260 : 240,
    height: hovered ? 210 : 190,
    objectFit: "cover",
    borderRadius: 20,
    boxShadow: hovered
      ? "0 4px 24px rgba(0,0,0,0.13)"
      : "0 2px 12px rgba(0,0,0,0.09)",
    background: "#e9ecef",
    transition: "box-shadow 0.15s, width 0.15s, height 0.15s, border-radius 0.15s"
  };




  return (
    <section
      style={sectionStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={project.imageUrl} alt={project.title} style={imgStyle} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ margin: 0, fontSize: "2.2rem", color: "#343a40", lineHeight: 1.18 }}>{project.title}</h2>
        <p style={{ margin: "1.1rem 0 1.3rem 0", color: "#495057", fontSize: "1.17rem", lineHeight: 1.62, maxWidth: 700 }}>{project.description}</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: hovered ? "#0056b3" : "#007bff",
              textDecoration: hovered ? "underline" : "none",
              fontWeight: 600,
              fontSize: "1.15rem",
              transition: "color 0.14s, text-decoration 0.14s"
            }}
          >
            View Project
          </a>
        )}
      </div>
    </section>
  );
};

const ProjectsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3.5rem 1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "3rem", fontSize: "2.8rem" }}>My Projects</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {projects.map((project, idx) => (
          <ProjectSection key={idx} project={project} reverse={idx % 2 === 1} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
