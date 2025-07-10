import ProjectsPage from "~/projects";

export default function Projects() {

    return (
        
        <div
            style={{
                background: "#0e172a",
                borderRadius: 18,
                boxShadow: "0 4px 24px #000a",
                minHeight: "80vh",
                width: "100%",
                position: "relative",
                overflow: "hidden",
                padding: "2.5rem 2.5rem 2.5rem 2.5rem",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                zIndex: 2,
            }}
        >
            <ProjectsPage />
        </div>
        
    );

}