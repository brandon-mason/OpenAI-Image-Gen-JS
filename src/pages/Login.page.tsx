import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, PasswordInput, Stack } from '@mantine/core'
import classes from './Login.page.module.css';
import { useDisclosure } from '@mantine/hooks';

function LoginPage() {
    const navigate = useNavigate();
    const [visible, { toggle }] = useDisclosure(false);

    const handleClick = () => {
        navigate("/generator");
    }

    return (
        <Stack justify="center" align="center" style={{height: "100vh"}}>
            <PasswordInput
                size="xl"
                label="Input label"
                description="Input description"
                placeholder="Input placeholder"
                visible={visible}
                onVisibilityChange={toggle}
                classNames={{
                    root: classes.inputRoot
                    
                }}
            />
            <Button
                size='md'
                onClick={handleClick}
            >
                Submit
            </Button>
        </Stack>
    )
}

export default LoginPage;
