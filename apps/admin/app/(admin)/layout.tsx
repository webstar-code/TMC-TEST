'use client'
import Header from "components/Header"
import SideNav from "components/SideNav"
import { onAuthStateChanged } from "firebase/auth"
import { redirect } from "next/navigation"

import { useEffect, useState } from 'react'
import { auth } from "utils/firebase"
import { useAdminStore } from "utils/store"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sideNavActive, setSideNavActive] = useState<boolean>(false)

    const { admin } = useAdminStore()

    if (!admin) {
        redirect('/login')
    }

    return (
        <html lang="en">
            <body>
                {/* Layout UI */}
                <main className="md:flex md:flex-row">
                    <div className="md:w-[48%] lg:w-[35%] xl:w-[20%]"><SideNav sideNavActive={sideNavActive} setSideNavActive={setSideNavActive} /></div>
                    <Header sideNavActive={sideNavActive} setSideNavActive={setSideNavActive} />
                    <div className="w-full">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    )
}