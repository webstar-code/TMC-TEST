import Image from 'next/image'
import React from 'react'

function Services() {
    return (
        <div className=' flex flex-col md:flex-row md:items-center md:py-18 px-8 md:px-16 gap-6 md:gap-2 w-full md:justify-around'>
            <div className='flex flex-row gap-4 font-semibold md:px-6 md:py-6 md:shadow md:rounded-md md:w-1/4'> <Image src={'/tick.svg'} alt='' width={20} height={20} /> <h1>Easy Access to records anywhere</h1></div>
            <div className='flex flex-row gap-4 font-semibold md:px-6 md:py-6 md:shadow md:rounded-md md:w-1/4'> <Image src={'/tick.svg'} alt='' width={20} height={20} /> <h1>Share with your doctors</h1></div>
            <div className='flex flex-row gap-4 font-semibold md:px-6 md:py-6 md:shadow md:rounded-md md:w-1/4'> <Image src={'/tick.svg'} alt='' width={20} height={20} /> <h1>Add Family Members</h1></div>
            <div className='flex flex-row gap-4 font-semibold md:px-6 md:py-6 md:shadow md:rounded-md md:w-1/4 mb-16 md:mb-0'> <Image src={'/tick.svg'} alt='' width={20} height={20} /> <h1>Download records whenever</h1></div>
        </div>
    )
}

export default Services