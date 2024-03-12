import { CheckList, CloudInfra } from 'assets/images'
import Image from 'next/image'
import React from 'react'

function BoostPatientsSatisfaction() {
    return (
        <div className='px-6 flex flex-col gap-12 py-20 md:px-16'>
            <div className='px-2 flex flex-col gap-3 md:gap-10'>
                <div className='w-full text-center font-bold text-2xl md:text-4xl'>Boost Patient Satisfaction</div>
                <div className='w-full text-center text-md font-light md:text-md md:w-[90%] md:mx-auto'>With TrackMyCare, increase your level of service by being a part of a seamless and secure healthcare data management solution for patients. Keep patients coming back knowing that they have easy access to their health records anywhere and anytime. </div>
            </div>
            <div className='flex flex-col md:flex-row md:w-full md:justify-between md:items-center gap-10'>
                <div className='shadow rounded-xl py-10 px-8 flex flex-col gap-3 md:w-1/2'>
                    <div className='w-full text-center font-bold text-xl md:text-start md:text-2xl'>Trusted in Healthcare</div>
                    <div className='w-full text-start text-md font-light md:text-start'>TrackMyCare, a  patient-centered medical cloud health platform, enjoys the trust of healthcare professionals for its user-friendly approach to record management. With seamless patient satisfaction and rave reviews, it has proven to be a valuable tool in enhancing the overall healthcare experience.</div>
                    <div className='w-full text-center underline text-gray-600 text-md font-light md:text-start'>Contact Track My Care</div>
                </div>
                <div className='md:w-1/2'>
                    <Image src={CloudInfra} alt='' className='mx-auto' width={380} height={100} />
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:w-full md:justify-between md:items-center md:gap-10 gap-10'>
                <div className='flex flex-col gap-3 px-8 shadow rounded-xl py-6 md:w-1/2 md:order-2 md:gap-8'>
                    <div className='w-full text-center md:text-start font-bold text-xl  md:text-2xl'>Build Trust with Your Patients</div>
                    <div className='w-full text-start'>TrackMyCare helps you build a strong bond of trust with your patients. By prioritizing efficient and secure health record sharing, you convey a commitment to patient autonomy fostering long-lasting patient relationships.</div>
                    <ol className='w-full text-start text-md font-light'>
                        <li>1. Free and Quick Integration</li>
                        <li>2. Improved Patient Experience</li>
                        <li>3. Always Secure and Private</li>
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

export default BoostPatientsSatisfaction