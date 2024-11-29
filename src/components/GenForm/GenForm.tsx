import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Stack, Textarea, Image } from '@mantine/core';
import classes from './GenForm.module.css';

interface GenFormProps {
    setImageLink: React.Dispatch<React.SetStateAction<string>>;
}

const GenForm: React.FC<GenFormProps> = ({ setImageLink }) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            model: 'dall-e-3',
            prompt: '',
        },
    });
    const [input, setInput] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setImageLink(input);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="xl" justify="center" align="stretch">
                <Textarea 
                    label="Prompt"
                    placeholder="Prompt"
                    autosize
                    minRows={3}
                    key={form.key("prompt")}
                    {...form.getInputProps('name')}
                />
                <Button type="submit">Submit</Button>
            </Stack>
        </form>
    );
};

export default GenForm;