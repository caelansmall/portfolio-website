import SkillsGallery from "~/skills-cards";

export default function Skills() {

    return (
        
        <div
            style={{
                background: "#0e172a",
                minHeight: "100vh",
                height: "100vh",
                width: "100vw",
                position: "relative",
                overflow: "hidden",
                padding: 0,
                margin: 0,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                zIndex: 2,
            }}
        >
            <SkillsGallery />
        </div>
        
    );

}