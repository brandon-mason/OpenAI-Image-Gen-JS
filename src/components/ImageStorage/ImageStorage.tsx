import { Button, Drawer, Text } from '@mantine/core';
import React from 'react';
import classes from './ImageStorage.module.css';
import { useDisclosure } from '@mantine/hooks';

interface ImageStorageProps {
    images: {url: string, prompt: string}[];
    setImageLink: React.Dispatch<React.SetStateAction<string>>;
}

const ImageStorage: React.FC<ImageStorageProps> = ({images, setImageLink}) => {
    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <> 
            <Button onClick={open} classNames={{root: classes.buttonRoot}}>See Images</Button>
            <Drawer opened={opened} onClose={close} classNames={{root: classes.drawerRoot}}>
                {images.map((image, index) => 
                    (index !== 0) ? 
                    <Button key={index} onClick={() => setImageLink(image.url)} classNames={{root: classes.imgRoot}}>
                        <Text truncate="end">{image.prompt}</Text>
                    </Button> 
                    : null
                )}
            </Drawer>
        </>
    );
};

export default ImageStorage;