import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "ui"


function FAQs() {
    return (
        <div className='px-6 md:px-16 mt-10 md:mt-20'>
            <div className='w-full font-bold text-xl md:text-3xl'>Frequently Asked Questions:</div>
            <div className='md:mt-10 mt-6'>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why should I enroll in TrackMyCare?</AccordionTrigger>
                        <AccordionContent>
                            <div className='font-thin flex flex-col gap-1 text-base'>
                                Our medical cloud storage platform offers you the benefit of securely centralizing your complete medical history, from lab results to treatment plans, in a single accessible place. This centralized approach not only enhances convenience by placing vital health information at one's fingertips but also facilitates seamless sharing with healthcare providers. You can effortlessly share records for second opinions, specialist consultations, or emergency situations. It ensures continuity of care, reduces duplication of tests, and ultimately empowers you to take more proactive control of your health while streamlining your healthcare journey.
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the subscription cost?</AccordionTrigger>
                        <AccordionContent>
                            <div className='font-thin flex flex-col gap-1 text-base'>
                                Access to your records in our secure, easy to use, medical cloud  platform can only be obtained through a subscription. We offer a month to month subscription plan of $7/month or an annual subscription plan of $45/year. Both plans provide all the same features including record sharing, unlimited record uploads, and radiology viewer. Whether you are actively subscribed or not, all records will be permanently stored.
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why should I enroll in TrackMyCare?</AccordionTrigger>
                        <AccordionContent>
                            <div className='font-thin flex flex-col gap-1 text-base'>
                                Our medical cloud storage platform offers you the benefit of securely centralizing your complete medical history, from lab results to treatment plans, in a single accessible place. This centralized approach not only enhances convenience by placing vital health information at one's fingertips but also facilitates seamless sharing with healthcare providers. You can effortlessly share records for second opinions, specialist consultations, or emergency situations. It ensures continuity of care, reduces duplication of tests, and ultimately empowers you to take more proactive control of your health while streamlining your healthcare journey.
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Will my records be safe?</AccordionTrigger>
                        <AccordionContent>
                            <div className='font-thin flex flex-col gap-1 text-base'>
                                Rest assured, your health information and medical records are of utmost importance in a secure and private medical cloud platform. The TrackMyCare platform employs robust encryption, multi-layered security protocols, and stringent privacy measures to safeguard your data. Access is strictly controlled, with only authorized individuals having the ability to view and manage records. Regular security audits and compliance with healthcare data protection regulations ensure the highest standards of data integrity. Your privacy is a top priority, and you can trust that your medical information is in safe hands, allowing you to focus on your health with confidence.
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className='md:mb-10 mb-10'>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Can I share my health records?</AccordionTrigger>
                        <AccordionContent>
                            <div className='font-thin flex flex-col gap-1 text-base'>
                                With TrackMyCare's user-friendly medical cloud platform, sharing your health records and diagnostic exams with specialists and other healthcare providers is a breeze. By granting them access to specific records for a specified time frame, you maintain control. Providers receive a secure email link to access only the selected records, ensuring both ease of sharing and stringent data security. This streamlined process enhances collaboration, leading to more informed and efficient healthcare decisions.
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default FAQs