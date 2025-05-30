import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {

    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    return (

        <div className='fixed top-0 left-0 flex w-full box-border align-center justify-between pt-8 pb-16 pl-32 pr-32 z-999999'>
            <ul 
                onMouseLeave={() => {
                    setPosition((pv) => ({
                        ...pv,
                        opacity: 0,
                    }));
                }}
                className='relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1'
            >
                <Tab setPosition={setPosition}>Home</Tab>
                <Tab setPosition={setPosition}>Skills</Tab>
                <Tab setPosition={setPosition}>Projects</Tab>
                <Tab setPosition={setPosition}>About</Tab>

                <Cursor position={position} />
            </ul>
        </div>
        
    );
};

const Tab = ({children, setPosition}:{children:any,setPosition:any}) => {
    const ref = useRef<HTMLLIElement>(null);
    return (
        <li
            ref={ref}
            onMouseEnter={() => {
                if(!ref.current) return;

                const {width} = ref.current.getBoundingClientRect();

                setPosition({
                    width,
                    opacity: 1,
                    left: ref.current.offsetLeft,
                });
            }}
            className='relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base'
        >
            {children}
        </li>
    )
}

const Cursor = ({position}:{position:any}) => {
    return <motion.li 
        animate={position}
        className='absolute z-0 h-7 w-24 rounded-full bg-black md:h-12'
    />;
};

export default Navbar;
