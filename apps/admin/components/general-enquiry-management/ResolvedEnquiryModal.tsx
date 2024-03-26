import { Modal } from 'components/Model'
import Image from 'next/image'
import { Black_cross, Green_tick } from 'public/assets/icons'
import React from 'react'
import { Button } from 'ui'

function ResolvedEnquiryModal() {
    return (
        <Modal>
            <div className='flex flex-col items-center px-4 py-4 md:py-0 gap-4 md:gap-6'>
                <div className='flex justify-end w-full '>
                    <Image className='cursor-pointer' src={Black_cross} alt='' height={14} width={14} />
                </div>
                <div>
                    <Image src={Green_tick} alt='' height={48} width={48} />
                </div>
                <div className='font-bold text-xl md:text-2xl text-center px-2 mt-6'>
                    Enquiry has been successfully resolved!
                </div>
                <div className='text-md font-thin text-center hidden md:block'>
                    You can now access the inquiry by navigating to the "Resolved Inquiries" section if you'd like to view it.
                </div>
                <div className='text-md text-center md:hidden font-thin'>
                    You can now access the inquiry by navigating to the "Resolved Inquiries" section if you'd like to view it.
                </div>
                <div className='flex w-full md:w-[60%] mb-4 md:mb-10 justify-center items-center'>
                    <Button onClick={() => {
                        // handleClose(false)
                    }} className='w-1/2 h-10'>Go Back</Button>
                </div>
            </div>
        </Modal>
    )
}

export default ResolvedEnquiryModal