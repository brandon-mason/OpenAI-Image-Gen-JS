import { Box, Flex, Stack } from '@mantine/core';
import { ReactElement, useState } from 'react';
import classes from './Gen.page.module.css';
import GenForm from '../components/GenForm/GenForm';
import GenImage from '../components/GenImage/GenImage';

function GenPage() {
    const [imageLink, setImageLink] = useState<string>('');

    const innerComps = [
        <GenImage imageLink={imageLink} key="genImage" />,
        <GenForm setImageLink={setImageLink} key="genForm" />,
    ];

    return (
        <Flex justify="center" align="center">
            <Box maw={"40em"} p="xl" >
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
