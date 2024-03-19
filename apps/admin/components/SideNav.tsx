'use client'
import Image from 'next/image';
import { Cross, Dashboard, Dashboard_green, EarningsManagement, EnquiryManagement, Hospital, Logout, RequestedRecords, Subscription, UserManagement } from 'public/assets/icons';
import { Logo } from 'public/assets/images';
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "ui"

export function SideNavItem({ icon, title }: { icon: string, title: string }) {
    return (
        <div className='flex flex-row py-4 md:py-2 px-2 rounded-md'>
            <div className='flex flex-row gap-3'>
                <Image src={icon} className='z-30' alt='' height={20} width={20} />
                <h1 className='text-secondary'>{title}</h1>
            </div>
        </div >
    )
}

function SideNav({ sideNavActive, setSideNavActive }: { sideNavActive: boolean, setSideNavActive: Function }) {

    return (
        <>
            {
                sideNavActive &&
                <div className={`side-nav fixed top-0 left-0 w-screen h-screen md:hidden transition-transform transform ${sideNavActive ? 'translate-x-0' : '-translate-x-full'}`} >
                    <div className='absolute top-0 left-0 w-[80%] h-full bg-primary opacity-100 text-white px-6 '>
                        <div className='flex flex-row justify-between items-center w-full py-8'>
                            <div className='flex flex-row items-center justify-center gap-2'>
                                <Image className='' src={Logo} alt='' height={50} width={50} />
                                <p className='text-secondary font-bold text-lg'>Track My Care</p>
                            </div>
                            <div>
                                <Image onClick={() => setSideNavActive(!sideNavActive)} src={Cross} alt='' height={18} width={18} />
                            </div>
                        </div>

                        <div className='mt-10'>
                            <div>Main Menu</div>
                            <div className='w-full mt-4'>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <div className='flex flex-row gap-3'>
                                                <Image src={UserManagement} alt='' height={20} width={20} />
                                                <h1>User Managment</h1>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='text-base flex flex-col gap-2'>
                                                <h1 className='ml-8 rounded-sm py-1'>Customers</h1>
                                                <h1 className='ml-8 rounded-sm py-1'>Employees</h1>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            <SideNavItem icon={RequestedRecords} title='Requested Records' />
                            <SideNavItem icon={EarningsManagement} title='Earnings Management' />
                            <SideNavItem icon={Subscription} title='Subscription' />
                            <div className='w-full'>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <div className='flex flex-row gap-3'>
                                                <Image src={EnquiryManagement} alt='' height={20} width={20} />
                                                <h1>Enquiry Managment</h1>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='text-base flex flex-col gap-2'>
                                                <h1 className='ml-8 rounded-sm py-1'>General</h1>
                                                <h1 className='ml-8 rounded-sm py-1'>Support</h1>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            <SideNavItem icon={Hospital} title='Clinic Management' />
                            <div className='flex flex-row py-4 mt-10'>
                                <div className='flex flex-row gap-3'>
                                    <Image src={Logout} alt='' height={20} width={20} />
                                    <h1>Logout</h1>
                                </div>
                            </div >
                        </div>
                    </div>
                    <div className='absolute top-0 left-[80%] w-[20%] h-full bg-black opacity-50'></div>
                </div >
            }
            <div className='hidden md:block'>
                <div className='bg-primary h-screen text-sm flex flex-col'>
                    <div className='flex px-6 flex-row justify-between items-center w-full py-6'>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <Image className='' src={Logo} alt='' height={30} width={30} />
                            <p className='text-secondary font-bold text-lg'>Track My Care</p>
                        </div>
                    </div>
                    <div className='text-secondary px-6 mb-6 mt-8'>
                        Main Menu
                    </div>
                    <div className='overflow-y-scroll px-6 gap-3 scrollbar-hide flex flex-col'>
                        <SideNavItem icon={Dashboard} title='Dashboard' />
                        <div className='w-full text-secondary px-2'>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <div className='flex flex-row gap-3'>
                                            <Image src={UserManagement} alt='' height={20} width={20} />
                                            <h1 className='text-secondary'>User Managment</h1>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className=' flex flex-col gap-1'>
                                            <h1 className='ml-8 rounded-sm py-1 text-secondary'>Customers</h1>
                                            <h1 className='ml-8 rounded-sm py-1 text-secondary'>Employees</h1>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <SideNavItem icon={RequestedRecords} title='Requested Records' />
                        <SideNavItem icon={EnquiryManagement} title='Earnings Management' />
                        <SideNavItem icon={Subscription} title='Subscription' />
                        <div className='w-full text-secondary px-2'>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <div className='flex flex-row gap-3'>
                                            <Image src={UserManagement} alt='' height={20} width={20} />
                                            <h1 className='text-secondary'>Enquiry Managment</h1>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='ml-8 rounded-sm py-1 text-secondary'>General</h1>
                                            <h1 className='ml-8 rounded-sm py-1 text-secondary'>Support</h1>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <SideNavItem icon={Hospital} title='Clinic Management' />
                        <div className='mt-6'>
                            <SideNavItem icon={Logout} title='Logout' />
                        </div>

                    </div>
                </div>
            </div>


        </>


    );
}

export default SideNav;
