'use client'
import React from 'react'
import Image from "next/image";
import { Button } from 'ui';
import { ChevronDown, Languages } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



function Header() {
    const currentRoute = usePathname();
    return (
        <div className=''>
            <div className='bg-primary w-full z-50 flex flex-row justify-between items-center px-6 md:px-16 py-4 md:py-5'>
                <div className='flex flex-row gap-2'>
                    <Image src={"/logo.svg"} alt="logo" width={42} height={42} />
                    <p className='text-secondary font-bold text-md'>Track My Care</p>
                </div>
                <div className='hidden md:flex'>
                    <div className='text-secondary gap-10 flex flex-row font-thin text-md'>
                        <Link className={`${currentRoute === '/' ? 'font-bold' : ''}`} href="">Home</Link>
                        <Link className={``} href="">For Paitents</Link>
                        <Link className={``} href="">For Clinics</Link>
                        <Link className={``} href="">Pricing</Link>
                        <Link className={``} href="">Contact Us</Link>
                    </div>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <div className='flex flex-row'>
                        <Languages color='white' size={20} />
                        <ChevronDown color='white' size={20} />
                    </div>
                    <Button className="text-primary bg-white h-8 hover:bg-white" >Log in </Button>
                </div>
            </div>
        </div>

    )
}

export default Header