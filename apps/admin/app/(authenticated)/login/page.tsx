'use client'
import Image from 'next/image'
import { Ellipse, Ellipse1 } from 'public/assets/images'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Button, FormControl, FormField, FormItem, FormMessage, Input } from 'ui';
import { auth, db } from 'utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAdminStore } from 'utils/store';
import { redirect } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { admin } = useAdminStore()

    console.log('[ADMIN]', admin)

    if (admin) {
        redirect('/dashboard')
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('[ADMIN]', admin)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

        console.log('we are in onSubmit')
        console.log(values);
    }

    return (
        <div className='md:bg-primary h-screen relative w-[100%]'>
            <div className='absolute right-0 hidden md:block'>
                <Image src={Ellipse} alt='' height={300} width={300} />
            </div>
            <div className='absolute bottom-0 md:block hidden'>
                <Image src={Ellipse1} alt='' height={300} width={300} />
            </div>
            <div className='absolute w-full h-full flex items-center justify-center'>
                <div className='w-[85%] bg-secondary md:w-[60%] lg:w-[50%] xl:w-[40%] md:h-[70%] rounded-lg flex items-center justify-center flex-col md:px-20'>
                    <h1 className='text-4xl md:text-3xl font-bold text-center'>Sign in</h1>
                    <p className='mt-4 text-center text-base md:hidden'>Sign in to start your journey!</p>
                    <Form {...form}>
                        <form className="space-y-6 w-full mt-10">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className='bg-secondary text-gray h-10' placeholder="Please enter E-mail" label="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Input className='bg-secondary text-gray h-10' placeholder="Enter your password" label="Password" type="password" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                        <div className='py-8 mt-8 w-full sm:w-[60%] md:w-full'>
                            <Button className='w-full h-12' type='button' onClick={form.handleSubmit(onSubmit)}>Continue</Button>
                        </div>
                    </Form>
                    <div className='text-center md:hidden'>
                        By continuing, you agree to the <span className='font-bold'>Terms of use</span> and <span className='font-bold'>Privacy Policy.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;
