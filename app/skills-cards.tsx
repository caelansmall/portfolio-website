import React from 'react';
import CircularGallery from './circular-gallery';

interface SkillArray {
    image: string;
    text: string;
}

const SkillsGallery = () => {

    const skillList: SkillArray[] = [
        {
            image: '/icons/icon_angular_wht.svg',
            text: 'Angular',
        },
        {
            image: '/icons/ansible.jpg',
            text: 'Ansible',
        },
        {
            image: '/icons/sql.png',
            text: 'SQL'
        },
        {
            image: '/icons/react.png',
            text: 'React.js'
        },
        {
            image: '/icons/python.png',
            text: 'Python'
        },
        {
            image: '/icons/docker.svg',
            text: 'Docker'
        },
        {
            image: '/icons/java.svg',
            text: 'Java'
        },
        {
            image: '/icons/git.png',
            text: 'Git'
        },
        {
            image: '/icons/node.svg',
            text: 'Node'
        }
    ]

    
    return (

        <div className='h-200 relative'>

            <CircularGallery
                items={skillList}
                bend={1}
                textColor='#ffffff'
                borderRadius={0.05}
            />

        </div>

    )
}

export default SkillsGallery;
