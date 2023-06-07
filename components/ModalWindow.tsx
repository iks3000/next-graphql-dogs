import React, { useState } from "react";
import { Text, Button, Input } from "@mantine/core";
import { useId } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IMaskInput } from 'react-imask';

function ModalWindow({ name }) {
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


}

export default ModalWindow;