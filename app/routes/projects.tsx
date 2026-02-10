import ProjectsPage from "~/projects";

export default function Projects() {
    return (
        <div
            style={{
                background: "#0e172a",
                minHeight: "80vh",
                width: "100%",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                zIndex: 2,
                msOverflowStyle: "none",
                scrollbarWidth: "none",
            }}
            className="hide-scrollbar rounded-none md:rounded-[18px] md:shadow-[0_4px_24px_#000a] p-4 sm:p-6 md:p-8 lg:p-10 m-0 md:mx-auto"
        >
            <ProjectsPage />
        </div>
    );
}