'use client'
import { Modal } from 'components/Model'
import Image from 'next/image'
import { Black_cross } from 'public/assets/icons'

import React from 'react'
import { Button } from 'ui'

function ConfirmModal({ handleClose, handleSuccessClose }: { handleClose: Function, handleSuccessClose: Function }) {

    return (
        <Modal>
            <div className='flex flex-col items-center px-4 py-4 md:py-0 gap-4 md:gap-6'>
                <div className='flex justify-end w-full '>
                    <Image onClick={() => handleClose(false)} className='cursor-pointer' src={Black_cross} alt='' height={14} width={14} />
                </div>
                <div className='font-bold text-xl w-[80%] md:text-2xl text-center px-2 mt-6'>
                    Are you sure you want to edit the subscription price?
                </div>
                <div className='text-md font-thin text-center hidden md:block'>
                    The new price will only affect new users, not existing ones who have already purchased a plan on Track My Care.
                </div>
                <div className='text-md text-center md:hidden font-thin'>
                    All the records and exam history will be deleted for this family member’s profile
                </div>
                <div className='flex flex-row w-full gap-2 md:w-[60%] mb-4 md:mb-10'>
                    <Button onClick={() => {
                        handleClose(false)
                        handleSuccessClose(true)
                    }} className='w-1/2 text-sm h-10 '>Confirm</Button>
                    <Button onClick={() => {
                        handleClose(false)
                    }} className='w-1/2 text-sm h-10 bg-secondary text-primary hover:bg-secondary border-primary border-[1px]'>Cancel</Button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmModal