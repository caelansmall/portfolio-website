import React from 'react';
import RollingGallery from './circular-gallery';

interface SkillArray {
    image: string;
    text: string;
}

const SkillsGallery = () => {

    const skillList: SkillArray[] = [
        {
            image: './images/angular.jfif',
            text: 'Angular',
        },
        {
            image: './images/ansible.jfif',
            text: 'Ansible',
        }
    ]

    
    // return (
        
    //     // <RollingGallery autoplay={true} pauseOnHover={true} />

    // )
}

export default SkillsGallery;