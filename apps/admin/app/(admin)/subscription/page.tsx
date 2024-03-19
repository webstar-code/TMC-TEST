'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, Button, FormControl, FormField, FormItem, FormMessage, Input } from 'ui';
import SuccessModal from 'components/subscription/SuccessModal';
import ConfirmModal from 'components/subscription/ConfirmModal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "ui"
import { Container } from 'components/Container';

const formSchema = z.object({
    monthly: z.number().min(0, {
        message: 'Monthly amount must be a positive number.',
    }),
    annually: z.number().min(0, {
        message: 'Yearly amount must be a positive number.',
    }),
});

function Page() {
    const [isConfirmClose, handleConfirmClose] = useState<boolean>(false)
    const [isSuccessClose, handleSuccessClose] = useState<boolean>(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        // Handle form submission
        console.log(data);
    };

    return (
        <Container title="Subscription">
            <div>
                <Form {...form}>
                    <div className='flex flex-col w-full md:w-[40%]'>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full mt-8 '>
                            <FormField
                                control={form.control}
                                name='monthly'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className='bg-secondary text-xs text-gray h-10' placeholder='Monthly' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='annually'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className='bg-secondary text-xs text-gray h-10' placeholder='Annually' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                        <div className='py-8 w-full sm:w-[60%] md:w-full'>
                            <Button onClick={() => {
                                handleConfirmClose(true)
                            }} className='w-full h-10' type='submit'>
                                Save
                            </Button>
                        </div>
                    </div>

                </Form>
                {isConfirmClose &&
                    <ConfirmModal handleClose={handleConfirmClose} handleSuccessClose={handleSuccessClose} />
                }
                {isSuccessClose &&
                    <SuccessModal handleClose={handleSuccessClose} />
                }
            </div>
        </Container >


    );
}

export default Page;
