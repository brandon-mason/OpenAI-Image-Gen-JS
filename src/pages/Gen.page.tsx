import { Box, Flex, Stack } from '@mantine/core';
import { ReactElement, useState } from 'react';
import classes from './Gen.page.module.css';
import GenForm from '../components/GenForm/GenForm';
import GenImage from '../components/GenImage/GenImage';
import ImageStorage from '../components/ImageStorage/ImageStorage';

function GenPage() {
    const [imageLink, setImageLink] = useState<string>('');
    const [images, setImages] = useState([{url: "", prompt: ""}]); 

    const innerComps = [
        <GenImage imageLink={imageLink} key="genImage" />,
        <GenForm images={images} setImageLink={setImageLink} setImages={setImages} key="genForm" />,
    ];

    return (
        <Flex justify="center" align="center">
            <Box maw={"35em"} p="md">
                <ImageStorage images={images} setImageLink={setImageLink}/>
                <Stack mah="80%" classNames={{root: classes.stackRoot}} justify="space-between" align="stretch">
                    {innerComps.map((comp: ReactElement, index: number) => (
                        <Box key={"comp-" + index} className={"comp-" + index}>{comp}</Box>
                    ))}
                </Stack>
            </Box>
        </Flex>
    )
}

export default GenPage;
