import Image from 'next/image'
import React from 'react'

function Contact() {
    return (
        <div className='px-6 bg-primary'>
            <div className=''>
                <div className='w-full text-center font-bold text-2xl md:text-4xl md:text-start text-secondary'>{'Wed love to hear from you!'}</div>
                <div>
                    <Image src='/ContactUs.svg' alt='' width={350} height={200} />
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Contact