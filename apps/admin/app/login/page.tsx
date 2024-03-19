'use client'
import Image from 'next/image'
import { Ellipse, Ellipse1 } from 'public/assets/images'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Button, FormControl, FormField, FormItem, FormMessage, Input } from 'ui';

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

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-10">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className='bg-secondary text-gray h-10' placeholder="Email" {...field} />
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
                                                <Input className='bg-secondary text-gray h-10' placeholder="Password" type="password" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                        <div className='py-8 mt-8 w-full sm:w-[60%] md:w-full'>
                            <Button className='w-full' type='submit'>Continue</Button>
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

export default Page