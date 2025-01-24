import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Textarea, Text } from '@mantine/core';
import axios from 'axios';
import classes from './GenForm.module.css';
import loading from '../../assets/loading.gif';

interface GenFormProps {
    setImageLink: React.Dispatch<React.SetStateAction<string>>;
    setImages: React.Dispatch<React.SetStateAction<{url: string, prompt: string}[]>>
    images: {url: string, prompt: string}[];
}

const GenForm: React.FC<GenFormProps> = ({ images, setImageLink, setImages }) => {
    const [errorMsg, setErrorMsg] = useState<string>(' ');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [textareaVal, setTextareaVal] = useState<string>('');
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            model: 'dall-e-3',
            prompt: '',
            size: '1024x1024',
            user: 'bjm241'

        },
    });
    const sess = window.localStorage.getItem("auth");
    const ref = useRef<HTMLTextAreaElement>(null);

    const badAuthRedirect = () => {
        // If no password is set in the environment variables, authorization is not required.
        if(typeof import.meta.env.VITE_PW !== "undefined") {
            var i = 2;
            setErrorMsg("You must be logged in to use this site. Redirecting in: 3");
            setInterval(() => {
                if(i === 0) {
                    navigate("/");
                }
                setErrorMsg("You must be logged in to use this site. Redirecting in: " + i);
                i--;
            }, 1000);
        }
    }
    
    const requestImage = async () => {
        axios.post("https://api.openai.com/v1/images/generations", 
            form.getValues(), {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            setImages([...images, {url: response.data.data[0].url, prompt: textareaVal}]);
            setImageLink(response.data.data[0].url);
            setDisabled(false);
        }).catch((error) => {
            setImageLink(images[images.length - 1].url);
            setDisabled(false);
            setErrorMsg(error.response.data.error.message);
            setTimeout(() => {
                setErrorMsg(" ");
            }, 2000);
        });
    };

    const handleClick = () => {
        if(sess === "true" || typeof import.meta.env.VITE_PW === "undefined") {
            if(ref.current) {
                if(ref.current.value.length > 0) {
                    form.setValues({prompt: ref.current.value});
                    setImageLink(loading);
                    setDisabled(true);
                    requestImage();
                } else {
                    setErrorMsg("Prompt cannot be empty");
                    setTimeout(() => {
                        setErrorMsg(" ");
                    }, 2000);
                }
            }
        } else {
            badAuthRedirect();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaVal(event.currentTarget.value);
    }

    useEffect(() => {
        if(textareaVal.slice(-1) === '\n' && ref.current) {
            ref.current.value = textareaVal.slice(0, -1);
            setTextareaVal(textareaVal.slice(0, -1));
            handleClick();
        }
    }, [textareaVal]);

    useEffect(() => {
        if(ref.current) {
            let length = ref.current.value.length;
            ref.current.focus();
            ref.current.setSelectionRange(length, length);
        }
    }, [disabled]);

    useEffect(() => {
        if(sess !== "true")
            badAuthRedirect();
    }, []);

    return (
        <form>
            <fieldset disabled={disabled}>
                <Stack gap="lg" justify="center" align="stretch">
                    <Textarea 
                        label="Prompt"
                        placeholder="Prompt"
                        value={textareaVal}
                        autosize
                        minRows={3}
                        ref={ref}
                        key={form.key("prompt")}
                        {...form.getInputProps("prompt")}
                        classNames={{
                            root: classes.textareaRoot,
                            label: classes.textareaLabel,
                            input: classes.textareaInput,
                        }}
                        onChange={(event) => handleChange(event)}
                    />
                    <Stack>
                        <Button onClick={handleClick}>Submit</Button>
                        <Text classNames={{root: classes.textRoot}}>{errorMsg}</Text>
                    </Stack>
                </Stack>
            </fieldset>
        </form>
    );
};

export default GenForm;