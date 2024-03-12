import Footer from 'components/Footer'
import Header from 'components/Header'
import Contact from 'components/landing-page/Contact'
import Support from 'components/landing-page/Support'
import React from 'react'

function page() {
    return (
        <div>
            <Header />
            <Support />
            <Contact />
            <Footer />
        </div>
    )
}

export default page