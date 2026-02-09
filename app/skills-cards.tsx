import CircularGallery from './circular-gallery';

interface SkillArray {
    image: string;
    text: string;
}

const SkillsGallery = () => {

    const skillList: SkillArray[] = [
        {
            image: 'icons/icon_angular_wht.png',
            text: 'Angular',
        },
        {
            image: 'icons/ansible.jpg',
            text: 'Ansible',
        },
        {
            image: 'icons/sql.png',
            text: 'SQL'
        },
        {
            image: 'icons/react.png',
            text: 'React.js'
        },
        {
            image: 'icons/python.png',
            text: 'Python'
        },
        {
            image: 'icons/docker.svg',
            text: 'Docker'
        },
        {
            image: 'icons/java.png',
            text: 'Java'
        },
        {
            image: 'icons/git.png',
            text: 'Git'
        },
        {
            image: 'icons/node.png',
            text: 'Node.js'
        },
        {
            image: 'icons/typescript.png',
            text: 'TypeScript'
        },
        {
            image: 'icons/bash.jpg',
            text: 'Shell Scripting'
        },
        {
            image: 'icons/api.png',
            text: 'REST APIs'
        },
        {
            image: 'icons/pngegg.png',
            text: 'PostgreSQL'
        },
        {
            image: 'icons/aws.png',
            text: 'Serverless AWS'
        }
    ]

    
    return (
        <>
            {/* Subtle animated blurred gradient background */}
            <div
                style={{
                    position: 'fixed',
                    zIndex: 0,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    background: `radial-gradient(circle at 25% 30%, rgba(64,142,255,0.20) 0, rgba(64,142,255,0.08) 40%, transparent 70%),
                                 radial-gradient(circle at 75% 70%, rgba(180,64,255,0.16) 0, rgba(180,64,255,0.07) 35%, transparent 70%)`,
                    filter: 'blur(32px)',
                    transition: 'background 0.5s',
                }}
            />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', minHeight: '60vh' }}>
                <div style={{ width: '100vw', height: '75vh', background: 'none', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularGallery
                        items={skillList}
                        bend={2.4}
                        textColor='#ffffff'
                        borderRadius={0.05}
                        font='700 1.5rem Inter, Segoe UI, Arial, sans-serif'
                    />
                </div>
            </div>
        </>
    )
}

export default SkillsGallery;
