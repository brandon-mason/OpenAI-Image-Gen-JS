import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, PasswordInput, Stack, Text } from '@mantine/core'
import classes from './Login.page.module.css';
import { useDisclosure } from '@mantine/hooks';

function LoginPage() {
    const navigate = useNavigate();
    const [visible, { toggle }] = useDisclosure(false);
    const [errorMsg, setErrorMsg] = useState<string>(' ');
    const ref = useRef<HTMLInputElement>(null);


    const handleClick = () => {
        if(ref.current) {
            if(ref.current.value === import.meta.env.VITE_PW) {
                window.localStorage.setItem("auth", "true");
                navigate("/generator");
            } else {
                setErrorMsg("Incorrect Password");
                setTimeout(() => {
                    setErrorMsg(" ");
                }, 2000);
            }
        }
    }

    useEffect(() => {
        if(window.localStorage.getItem("auth") === "true") {
            navigate("/generator");
        }
    }, []);

    return (
        <Stack justify="center" align="center" style={{height: "100vh"}}>
            <PasswordInput
                size="xl"
                label="Password"
                placeholder="Input Password"
                visible={visible}
                onVisibilityChange={toggle}
                ref={ref}
                classNames={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    label: classes.inputLabel,
                }}
            />
            <Button
                size='md'
                onClick={handleClick}
            >
                Login
            </Button>
            <Text classNames={{root: classes.textRoot}}>{errorMsg}<br/></Text>
        </Stack>
    )
}

export default LoginPage;
