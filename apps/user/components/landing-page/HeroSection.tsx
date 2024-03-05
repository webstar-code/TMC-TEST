'use client'
import Image from "next/image";
import { Button } from 'ui';

function HeroSection() {

    return (
        <div className='h-[860px] md:h-[1170px] border-1 border-red-500'>
            <div className='h-[calc(700px-64px)] md:min-h-[calc(100vh)] bg-primary relative md:max-h-fit'>
                <div className='absolute right-0 z-10'><Image src={'/Ellipse.svg'} alt="logo" width={200} height={200} /></div>
                <div className='absolute top-32 z-30 w-full'>
                    <div className='px-6 flex flex-col  gap-8 justify-center mx-auto md:w-[60%]'>
                        <p className='text-secondary text-3xl md:text-[48px] text-center font-bold leading-[1.2]'>Access Your Health Records Anywhere, Anytime with Track My Care!</p>
                        <h1 className='text-center text-secondary font-thin md:text-xl'>A centralized platform to collect and store all your health records and images in a secure, convenient, private space and easily accessible at your fingertips.</h1>
                        <div className='flex justify-center'>
                            <Button className='bg-secondary text-primary h-12 w-60'>Try Track My Care</Button>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0'><Image src={'/Ellipse1.svg'} alt="logo" width={210} height={210} /></div>
                <div className={`absolute -bottom-[150px] md:-bottom-[400px] w-full h-fit`}>
                    <div className='flex w-full justify-center px-5'>
                        <Image src={'/HeroImage.png'} alt="logo" width={770} height={370} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection