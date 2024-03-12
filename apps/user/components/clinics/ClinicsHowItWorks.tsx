import Image from 'next/image'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui"
import { HowItWorks1 } from 'assets/images'


function ClinicsHowItWorks() {
    return (
        <>
            <div className=' bg-primary px-6 md:px-16 py-12 md:hidden'>
                <div className='w-full text-center text-secondary'>WHY USE TRACK MY CARE</div>
                <div className='w-full text-center text-secondary text-2xl mt-2'>Easy, Simple, Affordable</div>
                <div className='w-full py-8'>
                    <Tabs defaultValue="account" className="w-full md:w-[60%]">
                        <TabsList className="w-full rounded-full">
                            <TabsTrigger className="w-1/2 rounded-full font-bold" value="account">For Patients</TabsTrigger>
                            <TabsTrigger className="w-1/2 rounded-full font-bold" value="password">For Clinics</TabsTrigger>
                        </TabsList>
                        {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent> */}
                    </Tabs>

                </div>
                <div className='w-full mx-auto'>
                    <Image src={HowItWorks1} alt='' height={200} width={400} />
                </div>
                <div className="h-full mt-10 flex flex-row">
                    <div className='relative h-[225px]'>
                        <div className='w-[1px] bg-secondary h-[130px] absolute left-4 top-1'></div>
                        <div className='absolute flex flex-col gap-8'>
                            <div className='bg-secondary rounded-full w-8 h-8 flex items-center justify-center font-bold'>1</div>
                            <div className='bg-secondary rounded-full w-8 h-8 flex items-center justify-center font-bold'>2</div>
                            <div className='bg-secondary rounded-full w-8 h-8 flex items-center justify-center font-bold'>3</div>
                        </div>
                    </div>
                    <div className='text-secondary gap-10 mt-1 flex flex-col ml-12'>
                        <div className='font-thin'>View Track My Care.</div>
                        <div className='font-thin'>Submit your details via tha contact form.</div>
                        <div className='font-thin'>Done, wait for us to reach out to you.</div>
                    </div>
                </div>
                <div className='underline font-light text-secondary px-12'>
                    Try Track My Care
                </div>
            </div>
            <div className='hidden md:block'>
                <div className='bg-primary px-16 py-16 flex lg:flex-row xl:flex-row md:flex-col md:gap-10 justify-start gap-40'>
                    <div className='h-full flex items-center justify-between mt-14'>
                        <Image src={HowItWorks1} className='mx-auto' alt='' width={500} height={700} />
                    </div>
                    <div className='flex flex-col gap-2 mt-14'>
                        <div className='text-secondary text-lg'>HOW IT WORKS</div>
                        <div className='text-secondary text-[40px] font-bold'>Few Easy Steps and Done</div>
                        <div>
                            <Tabs defaultValue="clinics" className="w-full mt-4">
                                <TabsList className="w-full rounded-full">
                                    <TabsTrigger className="w-1/2 rounded-full font-bold" value="patients">For Patients</TabsTrigger>
                                    <TabsTrigger className="w-1/2 rounded-full font-bold" value="clinics">For Clinics</TabsTrigger>
                                </TabsList>
                                {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent> */}
                            </Tabs>
                        </div>
                        <div className='py-6 mt-16 px-8 rounded-xl'>
                            <div className='relative'>
                                <div className='w-[1px] bg-secondary h-[160px] absolute left-5 top-1'></div>
                                <div className='absolute flex flex-col gap-8'>
                                    <div className='bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold'>1</div>
                                    <div className='bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold'>2</div>
                                    <div className='bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold'>3</div>
                                </div>
                            </div>
                            <div className='text-secondary gap-11 flex flex-col ml-16 mt-2'>
                                <div className='font-thin text-xl'>Register your Track My Care account.</div>
                                <div className='font-thin text-xl'>Request your previous records</div>
                                <div className='font-thin text-xl'>Done, view your records at your convenience</div>
                            </div>
                        </div>
                        <div className='underline font-light text-secondary px-24 mt-8'>
                            Contact Track My Care
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClinicsHowItWorks