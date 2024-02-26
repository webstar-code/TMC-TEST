import React from 'react'
import Image from "next/image";
import { Button } from 'ui';
import { ChevronDown, Languages } from 'lucide-react';
import Link from 'next/link';

function Header() {
    return (
        <div className='bg-primary flex flex-row justify-between items-center px-4 md:px-12 py-4 md:py-5'>
            <div className='flex flex-row gap-2'>
                <Image src={"/logo.svg"} alt="logo" width={42} height={42} />
                <p className='text-secondary font-bold text-md'>Track My Care</p>
            </div>
            {/* <div className='text-secondary gap-10 flex flex-row font-thin text-md'>
                <Link href="">Home</Link>
                <Link href="">For Paitents</Link>
                <Link href="">For Clinics</Link>
                <Link href="">Pricing</Link>
                <Link href="">Contact Us</Link>
            </div> */}
            <div className='flex flex-row items-center gap-2'>
                <div className='flex flex-row'>
                    <Languages color='white' size={20} />
                    <ChevronDown color='white' size={20} />
                </div>
                <Button className="text-primary bg-white h-8 hover:bg-white" >Log in </Button>
            </div>
        </div>
    )
}

export default Header