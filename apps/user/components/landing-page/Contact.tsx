'use client'
import Image from 'next/image'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "ui"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "ui"
import { Input } from "ui"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "ui"
import { Textarea } from "ui"
import { ContactUs } from 'assets/images'



const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    role: z.string(),
    phoneNumber: z.string().min(10, {
        message: "Phone number must be at least 10 characters.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
})


function Contact() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "",
            phoneNumber: "",
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className='px-6 bg-primary text-secondary py-10 flex flex-col gap-14 md:flex-row md:w-full md:py-16 md:px-16 md:mt-20'>
            <div className='flex flex-col gap-10 md:w-1/2'>
                <div className='w-full text-center font-bold text-xl md:text-4xl md:text-start md:w-[50%]'>{"We'd love to hear from you!"}</div>
                <div>
                    <Image src={ContactUs} className='md:hidden' alt='' width={350} height={200} />
                </div>
                <div>
                    <Image src={ContactUs} className='hidden md:block' alt='' width={650} height={200} />
                </div>
            </div>
            <div className='md:w-[45%]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className='bg-primary text-white' placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="bg-primary w-full">
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Paitent</SelectItem>
                                                <SelectItem value="dark">Doctor</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className='bg-primary text-white' placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className='bg-primary text-white' placeholder="Phone Number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea className='bg-primary text-white' placeholder="Message" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="bg-secondary text-primary h-10 w-full" type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Contact