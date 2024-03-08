import { CheckList, CloudInfra } from 'assets/images'
import Image from 'next/image'
import React from 'react'

function DesignedForUtility() {
    return (
        <div className='px-6 flex flex-col gap-12 py-20 md:px-16'>
            <div className='px-2 flex flex-col gap-3 md:gap-10'>
                <div className='w-full text-center font-bold text-2xl md:text-4xl'>Designed for Utility</div>
                <div className='w-full text-center text-md font-light md:text-md md:w-[40%] md:mx-auto'>A perfect solution designed to give you easy and secure access to your health information with easy shareability.</div>
            </div>
            <div className='flex flex-col md:flex-row md:w-full md:justify-between md:items-center gap-10'>
                <div className='shadow rounded-xl py-10 px-8 flex flex-col gap-3 md:w-1/2'>
                    <div className='w-full text-center font-bold text-xl md:text-start md:text-2xl'>Secure Cloud Infrastructure</div>
                    <div className='w-full text-start text-md font-light md:text-start'>Your information is safely and privately secured in modern cloud infrastructure.</div>
                    <div className='w-full text-center underline text-gray-600 text-md font-light md:text-start'>Contact Track My Care</div>
                </div>
                <div className='md:w-1/2'>
                    <Image src={CloudInfra} alt='' className='mx-auto' width={380} height={100} />
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:w-full md:justify-between md:items-center md:gap-10 gap-10'>
                <div className='flex flex-col gap-3 px-8 shadow rounded-xl py-6 md:w-1/2 md:order-2 md:gap-8'>
                    <div className='w-full text-center md:text-start font-bold text-xl  md:text-2xl'>Trusted by Health Professionals</div>
                    <div className='w-full text-start'>Improves exchange of health information facilitating medical care.</div>
                    <ol className='w-full text-start text-md font-light'>
                        <li>1. Ease of use</li>
                        <li>2. Secure - HIPAA compliant</li>
                        <li>3. Affordable</li>
                    </ol>
                    <div className='w-full text-center underline text-gray-600 text-md font-light md:text-start'>Contact Track My Care</div>
                </div>
                <div className='md:order-1 md:w-1/2'>
                    <Image src={CheckList} alt='' className='mx-auto' width={320} height={100} />
                </div>
            </div>
        </div>
    )
}

export default DesignedForUtility