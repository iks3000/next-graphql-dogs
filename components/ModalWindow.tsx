import React, { useState } from "react";
import { Text, Button, Input, Modal, Group, Box, TextInput } from "@mantine/core";
import { useId } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IMaskInput } from 'react-imask';

import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';

function ModalWindow({ name }) {
    {/*
    const id = useId();

    const openModal = () => modals.openConfirmModal({
        title: `Thank you for adopting ${name}!`,
        centered: true,
        children: (
            <>
                <Text size="sm" mb={16}>
                    We will carefully review all the details and contact you as soon as possible. Please provide us the best phone number to be contacted at.
                </Text>
                <Input.Wrapper id={id} label="Your phone">
                    <Input<any>
                        component={IMaskInput}
                        mask="+1 (000) 000-00-00"
                        id={id}
                        placeholder="Your phone number"
                    />
                </Input.Wrapper>
            </>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => (
            modals.closeAll,
            notifications.show({
                title: 'Your request was accepted!',
                message: 'We will contact you as soon as possible',
            })
        )
    });

    return <Button fullWidth onClick={openModal}>Adopt {name}</Button>;
*/}


    const [opened, { open, close }] = useDisclosure(false);

    const id = useId();

    const form = useForm({
        validateInputOnChange: true,
        initialValues: { name: '', email: '' },
        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (/^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$/.test(value) ? null : 'Invalid email'),
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
                color: "teal",
                withBorder: true
            });
        }

        form.reset();
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title={`Thank you for adopting ${name}!`} centered>
                <Text size="sm" mb={16}>
                    We will carefully review all the details and contact you as soon as possible. Please provide your contact information.
                </Text>
                <Box>
                    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
                        <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} withAsterisk />
                        <Input.Wrapper mt="sm" id={id} label="Your phone">
                            <Input<any>
                                component={IMaskInput}
                                mask="+1 (000) 000-00-00"
                                id={id}
                                placeholder="Your phone number"
                            />
                        </Input.Wrapper>
                        <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} withAsterisk />
                        <Button type="submit" mt="sm" onClick={close} disabled={!form.isValid('name') || !form.isValid('email')} >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>

            <Group position="center">
                <Button onClick={open} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Adopt {name}</Button>
            </Group>
        </>
    );

}

export default ModalWindow;