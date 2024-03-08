import { White_Tick } from 'assets/icons'
import { StartNow1 } from 'assets/images'
import Image from 'next/image'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui"
import { Button } from 'ui'


function StartNow() {
    return (
        <div className='bg-primary text-secondary px-6 py-10 md:px-16 flex flex-col gap-2 md:flex-row md:py-20'>
            <div className='flex flex-col gap-2 md:w-[60%]'>
                <div className='w-full text-center md:text-xl md:text-start'>START NOW!</div>
                <div className='w-full text-center font-bold text-2xl md:text-4xl md:text-start'>Ready to get started?</div>
                <div className='mt-6'>
                    <Tabs defaultValue="account" className="w-full md:w-[60%]">
                        <TabsList className="w-full rounded-full">
                            <TabsTrigger className="w-1/2 rounded-full font-bold" value="account">{"Monthly $7"}</TabsTrigger>
                            <TabsTrigger className="w-1/2 rounded-full font-bold" value="password">{"Annually $45"}</TabsTrigger>
                        </TabsList>
                        {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent> */}
                    </Tabs>
                </div>
                <div className='mt-6 md:hidden'>
                    <Image src={StartNow1} alt='' className='mx-auto' width={200} height={200} />
                </div>
                <div className='text-2xl font-bold mt-6 md:mt-14'>TrackMyCare Features:</div>
                <div className='flex flex-col gap-8 mt-6'>
                    <div className='flex flex-row gap-4'>
                        <Image src={White_Tick} alt='' height={20} width={20} />
                        <h1>Storage and categorization of health records</h1>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Image src={White_Tick} alt='' height={20} width={20} />
                        <h1>Easily accessible on multiple devices</h1>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Image src={White_Tick} alt='' height={20} width={20} />
                        <h1>Unlimited report sharing and self record uploads</h1>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Image src={White_Tick} alt='' height={20} width={20} />
                        <h1>Lifetime storage - we keep it safe for you</h1>
                    </div>
                </div>
                <div className='flex justify-center md:justify-start mt-6'>
                    <Button className="bg-secondary text-primary h-10 w-[50%]">Start Tracking</Button>
                </div>
            </div>
            <div className='flex items-center justify-center w-[40%]'>
                <Image src={StartNow1} alt='' className='mx-auto hidden md:block' width={300} height={200} />
            </div>
        </div>
    )
}

export default StartNow