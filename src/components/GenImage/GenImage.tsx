import React from 'react';
import { Image } from '@mantine/core';
// import classes from './GenForm.module.css';
import ufo from '../../assets/ufo.png'; 

interface GenImageProps {
    imageLink: string;
}

const GenImage: React.FC<GenImageProps> = ({imageLink}) => {
    return (
        <Image src={imageLink} fallbackSrc={ufo}/>
    );
};

export default GenImage;