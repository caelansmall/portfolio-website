import React from 'react';
import CircularGallery from './circular-gallery';

interface SkillArray {
    image: string;
    text: string;
}

const SkillsGallery = () => {

    const skillList: SkillArray[] = [
        {
            image: '/icons/icon_angular_wht.png',
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
            image: '/icons/java.png',
            text: 'Java'
        },
        {
            image: '/icons/git.png',
            text: 'Git'
        },
        {
            image: '/icons/node.png',
            text: 'Node'
        },
        {
            image: '/icons/typescript.png',
            text: 'TypeScript'
        },
        {
            image: '/icons/bash.jpg',
            text: 'Shell Scripting'
        },
        {
            image: '/icons/api.png',
            text: 'REST APIs'
        }
    ]

    
    return (

        <div className='h-full relative pt-25 pb-25 bg-[#0e172a]'>

            <CircularGallery
                items={skillList}
                bend={1}
                textColor='#ffffff'
                borderRadius={0.03}
            />

        </div>

    )
}

export default SkillsGallery;
