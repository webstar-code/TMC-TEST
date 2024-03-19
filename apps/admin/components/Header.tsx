'use client'
import React from 'react'
import Image from "next/image";
import { Button } from 'ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GreenLogo, translate } from 'public/assets/images';
import { Down_chevron, Hamburger } from 'public/assets/icons';



function Header({ sideNavActive, setSideNavActive }: { sideNavActive: boolean, setSideNavActive: Function }) {
    const currentRoute = usePathname();
    return (
        <div className='z-10'>
            <div className='border-b md:hidden border-gray-300 top-0 bg-secondary w-full z-50 flex flex-row justify-between items-center px-6 md:px-16 py-4 md:py-5'>
                <div className='flex flex-row gap-2'>
                    <Image src={GreenLogo} alt="logo" width={200} height={200} />
                    {/* <p className='text-primary font-bold text-md'>Track My Care</p> */}
                </div>
                <div className='flex flex-row items-center gap-1'>
                    <Image src={translate} alt='' height={25} width={25} />
                    <Image src={Down_chevron} alt='' height={18} width={18} />
                    <Image onClick={() => setSideNavActive(!sideNavActive)} src={Hamburger} className='ml-6' alt='' height={25} width={25} />
                </div>
            </div>
        </div>

    )
}

export default Header