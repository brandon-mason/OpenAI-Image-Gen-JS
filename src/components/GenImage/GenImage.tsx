import React from 'react';
import { AspectRatio, Image } from '@mantine/core';
// import classes from './GenForm.module.css';
import ufo from '../../assets/ufo.png'; 

interface GenImageProps {
    imageLink: string;
}

const GenImage: React.FC<GenImageProps> = ({imageLink}) => {
    return (
        <AspectRatio>
            <Image src={imageLink} fallbackSrc={ufo}/>
        </AspectRatio>
    );
};

export default GenImage;