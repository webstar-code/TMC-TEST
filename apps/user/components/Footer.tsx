import { logo } from 'assets/images'
import Image from 'next/image'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "ui"


function Footer() {

    return (
        <div className='px-6 bg-primary text-secondary md:px-16 md:mt-20 md:py-14'>
            <div className='flex flex-col gap-5 py-10 md:flex md:flex-row md:justify-between '>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-row gap-2'>
                            <Image src={logo} alt="logo" width={42} height={42} />
                            <p className='text-secondary font-bold text-xl'>Track My Care</p>
                        </div>
                        <div className='font-thin'>
                            <p>Your Body.</p>
                            <p>Your Life.</p>
                            <p>Your Health Information.</p>
                        </div>
                    </div>
                    <div>
                        <p>Follow Us</p>
                        <p>

                        </p>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <h1 className='font-bold text-base'>Company</h1>
                    <div className='font-thin flex flex-col gap-4 mt-4'>
                        <p>Contact Us</p>
                        <p>For Paitent</p>
                        <p>For Clinics</p>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <h1 className='font-bold text-base'>Resources</h1>
                    <div className='font-thin flex flex-col gap-4 mt-4'>
                        <p>FAQ</p>
                        <p>Pricing</p>
                        <p>Privacy Policy</p>
                        <p>Terms & Condiaitons</p>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <h1 className='font-bold text-base'>Contact Info</h1>
                    <div className='font-thin flex flex-col gap-4 mt-4'>
                        <h1 className='font-medium text-sm'>PHONE NO.</h1>
                        <p>Canada: XXX-XXX-XXX</p>
                        <p>USA: XXX-XXX-XXX</p>
                        <h1 className='font-medium text-sm'>EMAIL</h1>
                        <p>info@trackmycare.com</p>
                        <p>support@trackmycare.com</p>
                    </div>
                </div>

                <div className='md:hidden'>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Company</AccordionTrigger>
                            <AccordionContent>
                                <div className='font-thin flex flex-col gap-1'>
                                    <p>Contact Us</p>
                                    <p>For Paitent</p>
                                    <p>For Clinics</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='md:hidden'>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Resources</AccordionTrigger>
                            <AccordionContent>
                                <div className='font-thin flex flex-col gap-1'>
                                    <p>FAQ</p>
                                    <p>Pricing</p>
                                    <p>Privacy Policy</p>
                                    <p>Terms & Condiaitons</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>
                <div className='md:hidden'>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Contact Info</AccordionTrigger>
                            <AccordionContent>
                                <div className='font-thin flex flex-col gap-1'>
                                    <h1 className='font-medium'>PHONE NO.</h1>
                                    <p>Canada: XXX-XXX-XXX</p>
                                    <p>USA: XXX-XXX-XXX</p>
                                    <h1 className='font-medium'>EMAIL</h1>
                                    <p>info@trackmycare.com</p>
                                    <p>support@trackmycare.com</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='md:hidden mt-8'>
                    <p>© 2023 TrackMyCare. All Rights Reserved.</p>
                    <p>Designed and developed by Flexxited</p>
                </div>
            </div>
            <div className='h-[1px] bg-secondary mt-6 md:block hidden'></div>
            <div className='flex flex-row justify-between mt-6 font-thin'>
                <p className='md:block hidden'>© 2023 Sportqo. All Rights Reserved.</p>
                <p className='md:block hidden'>Designed and developed by flexxited</p>
            </div>
        </div>

    )
}

export default Footer