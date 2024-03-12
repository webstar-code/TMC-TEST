'use-client'
import { FamilyMedicalVault, FingerTipAccess, LifetimeRepository, QuickShare, SecureStorage, YourHealthCould } from 'assets/images'
import Image from 'next/image'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "ui"


function ClinicsWhyUse() {
    const cardContent = [
        {
            title: "Free Integration",
            description: 'TrackMyCare can be integrated with your health information system/electronic medical record and can retrieve selected patient health information for patient use.',
            imageUrl: YourHealthCould
        },
        {
            title: "Shareability",
            description: 'Our easy to use platform allows patients to securely share their medical records with other healthcare providers.',
            imageUrl: SecureStorage
        },
        {
            title: "Data Security",
            description: 'All of our patient records are secured and HIPAA compliant. Our privacy policies ensure the security and privacy of patient medical records.',
            imageUrl: FingerTipAccess
        },
    ]

    return (
        <div className='w-full px-6 py-10 md:py-24'>
            <div className='w-full'>
                <div className='w-full justify-center items-center flex flex-col gap-2 md:gap-6 md:px-16'>
                    <div className='font-bold md:text-xl'>WHY PARTNER WITH TRACK MY CARE?</div>
                    <div className='font-bold text-2xl md:text-4xl'>Improved Patient Experience</div>
                    <div className='font-light text-center text:sm md:text-lg md:w-[40%] mt-2'>In partnering with TrackMyCare your patients will have convenient secure access to their medical records providing for a more complete patient experience.</div>
                </div>
                <div className='md:hidden px-8 mt-10'>
                    <Carousel>
                        <CarouselContent>
                            {cardContent.map((c) => (
                                <CarouselItem key={c.title}>
                                    <div className='flex flex-col gap-3 shadow py-6 px-4 rounded-md'>
                                        <Image src={c.imageUrl} alt={c.title} className='mx-auto' width={200} height={200} />
                                        <div className="font-bold text-xl text-center">{c.title}</div>
                                        <div className="font-light text-sm text-center">{c.description}</div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <div className='hidden md:block'>
                    <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-12 md:px-8 md:py-12 justify-around mx-auto">
                        {cardContent.map((item, index) => (
                            <div key={index} className="shadow px-4 rounded-xl flex flex-col gap-4 py-10 w-[90%] mx-auto">
                                <Image src={item.imageUrl} alt={item.title} className="mx-auto h-[200px]" width={200} height={200} />
                                <h2 className="text-xl font-bold w-full text-center">{item.title}</h2>
                                <p className="mt-2 w-full text-center">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClinicsWhyUse