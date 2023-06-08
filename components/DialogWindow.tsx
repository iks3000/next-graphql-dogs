import React, { useState } from "react";

import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text, Box } from '@mantine/core';

import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

const DialogWindow = ({ name }) => {

    const [opened, { toggle, close }] = useDisclosure(false);


    const form = useForm({
        validateInputOnChange: true,
        initialValues: { name: '', email: '' },
        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleError = (errors: typeof form.errors) => {
        if (errors.name) {
            notifications.show({ message: 'Please fill name field', color: 'red' });
        } else if (errors.email) {
            notifications.show({ message: 'Please provide a valid email', color: 'red' });
        }
    };

    const handleSubmit = (values: typeof form.values) => {
        if (values.name) {
            console.log(values.name)
            notifications.show({
                title: 'Your request was accepted!',
                message: 'We will contact you as soon as possible',
                icon: <IconCheck size="1.1rem" />,
                color: "teal"
            });
        }
    };


    return (
        <>
            <Group position="center">
                <Button onClick={toggle}>Adopt {name}</Button>
            </Group>

            <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md" position={{ top: 40, right: 70 }}>
                <Text size="sm" mb="xs" weight={500}>
                    Thank you for adopting {name}!
                </Text>
                <Text size="sm" mb={16}>
                    We will carefully review all the details and contact you as soon as possible. Please provide us the best phone number to be contacted at.
                </Text>

                {/* <Group align="flex-end">
                    <TextInput placeholder="hello@gluesticker.com" sx={{ flex: 1 }} />
                    <Button onClick={close}>Subscribe</Button>
                </Group> */}

                <Box>
                    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
                        <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                        <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                        <Button type="submit" mt="sm" onClick={close} disabled={!form.isValid('name') || !form.isValid('email')}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Dialog>
        </>
    );

}

export default DialogWindow;