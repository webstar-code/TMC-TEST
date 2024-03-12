'use client'
import Image from "next/image";
import { Button } from 'ui';
import { Ellipse, Ellipse1, ForClinics, HeroImage } from "assets/images";

function ClinicsHeroSection() {

    return (
        <div className='w-full h-full pb-10 md:h-[1260px] md:mt-[72px] mt-[64px]'>
            <div className='h-[calc(650px)] lg:min-h-[calc(100vh-72px)] bg-primary relative md:max-h-fit'>
                <div className='absolute right-0 z-10'><Image src={Ellipse} alt="logo" width={200} height={200} /></div>
                <div className='absolute bottom-0 z-10'><Image src={Ellipse1} alt="logo" width={210} height={210} /></div>
                <div className='relative w-full pt-32 z-20'>
                    <div className='px-6 flex flex-col  gap-8 justify-center mx-auto md:w-[60%]'>
                        <p className='text-secondary text-3xl md:text-[48px] text-center font-bold leading-[1.2] w-[80%] mx-auto'>How Track My Care helps and works for clinics !</p>
                        <h1 className='text-center text-secondary font-thin md:text-xl w-[100%]'>Healthcare clinics and providers can partner with TrackMyCare directly and provide patients with immediate access to clinic records such as treatment plans, referrals and prescriptions. Furthermore, patients can share their outside medical records with healthcare providers securely through an email link.</h1>
                        <div className='flex justify-center'>
                            <Button className='bg-secondary text-primary h-12 w-60'>Try Track My Care</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`relative w-full h-full px-5 origin-top scaling-image z-30 -mt-16 md:-mt-32`}>
                <Image src={ForClinics} alt="logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                />
            </div>
        </div>
    )
}

export default ClinicsHeroSection