import { BBC, Express, IndiaToday, Outlook, TimesOfIndia, Traveler, Welle, WhatWeDo, WhoAreWe, mint } from 'assets/images'
import Image from 'next/image'
import React from 'react'

function AboutUs() {
    return (
        <div className='px-6 py-10 flex flex-col gap-6 md:px-16 md:mt-20'>
            <div className='w-full'>
                <div className='w-full text-center font-bold text-xl md:text-4xl'>About Us</div>
                <div className='text-center font-light mx-auto md:w-[42%] md:mt-10'>Our mission is to empower individuals to take control of their health information enabling them to be better involved in their healthcare journey.</div>
            </div>
            <div className='lg:flex-row lg:flex md:mt-10 md:flex-col gap-10'>
                <div className='shadow rounded-xl px-6 py-6 lg:w-1/3 flex flex-col gap-4'>
                    <div className='flex flex-row items-center gap-4'>
                        <div>
                            <Image src={WhoAreWe} alt='' width={50} height={50} />
                        </div>
                        <div className='font-bold text-md md:text-xl'>Who Are We</div>
                    </div>
                    <div className='font-light'>
                        TrackMyCare is a healthcare cloud platform that believes in the power of accessible medical records. We recognize the significance of comprehensive health information for the optimal healthcare journey. With our user-friendly and secure solution, we aim to organize the way you manage your medical records and better understand your health.
                    </div>
                </div>
                <div className='shadow rounded-xl px-6 py-6 lg:w-1/3 flex flex-col gap-4'>
                    <div className='flex flex-row items-center gap-4'>
                        <Image src={WhatWeDo} alt='' width={50} height={50} />
                        <div className='font-bold text-md md:text-xl'>What we do</div>
                    </div>
                    <div className='font-light'>
                        We store and provide easy access to your health records such as lab results, medical reports, diagnostic imaging, doctor visits, treatment plans, referrals, prescriptions and vaccination records. TrackMyCare keeps everything in one place with ease of access and shareability.
                    </div>
                </div>
                <div className='shadow rounded-xl px-6 py-6 lg:w-1/3 flex flex-col gap-4'>
                    <div className='flex flex-row items-center gap-4'>
                        <Image src={WhoAreWe} alt='' width={50} height={50} />
                        <div className='font-bold text-md md:text-xl'>Why we do it</div>
                    </div>
                    <div className='font-light'>
                        We do it because we believe that everyone deserves hassle-free access to their health information. Were committed to ensuring that your medical records are readily available when you need them the most. Simplifying the way people manage their health data will help them get a better understanding of their health and allow for more informed decision making
                    </div>
                </div>
            </div>

            <div className='mt-14 md:mt-20'>
                <div className='w-full text-center font-bold text-xl md:text-4xl'>Clinics partnered with TrackMy Care:</div>
                <div className='text-center md:w-[65%] mx-auto font-light md:mt-10'>
                    TrackMyCare is proud to be trusted by numerous leading healthcare institutions, clinics, and medical experts. Our platform is used by professionals who understand the value of streamlined health data management. Join the ranks of respected organizations and individuals who have chosen TrackMyCare for their healthcare needs.
                </div>
            </div>
            <div className='flex flex-row overflow-x-scroll md:overflow-auto gap-8 mt-10 md:mt-20'>
                <Image src={BBC} alt='' className='md:hidden' width={70} height={70} />
                <Image src={Traveler} alt='' className='md:hidden' width={70} height={70} />
                <Image src={IndiaToday} alt='' className='md:hidden' width={70} height={70} />
                <Image src={Outlook} alt='' className='md:hidden' width={70} height={70} />
                <Image src={Express} alt='' className='md:hidden' width={70} height={70} />
                <Image src={Welle} alt='' className='md:hidden' width={70} height={70} />
                <Image src={mint} alt='' className='md:hidden' width={70} height={70} />
                <Image src={TimesOfIndia} alt='' className='md:hidden' width={70} height={70} />
                <Image src={BBC} alt='' className='md:block hidden' width={150} height={100} />
                <Image src={Traveler} alt='' className='md:block hidden' width={150} height={100} />
                <Image src={IndiaToday} alt='' className='md:block hidden' width={150} height={100} />
                <Image src={Outlook} alt='' className='md:block hidden' width={150} height={100} />
                <Image src={Express} alt='' className='md:block hidden' width={150} height={100} />
                <Image src={Welle} alt='' className='md:block hidden' width={150} height={100} />
                <Image src={mint} alt='' className='md:block hidden' width={150} height={100} />
                <Image src={TimesOfIndia} alt='' className='md:block hidden' width={150} height={100} />
            </div>
        </div>
    )
}

export default AboutUs