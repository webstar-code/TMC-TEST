'use client'

import { Ellipse, Ellipse1 } from "assets/images";
import { Icons } from "components/Icons";
import Image from "next/image";
import { Button, Checkbox, CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger, Label } from "ui";

export default function AcceptLegal() {
  return (
    <div className="relative w-full min-h-screen bg-primary flex items-center justify-center">
      <div className='fixed top-0 right-0 z-10'><Image src={Ellipse} alt="ellipse" width={200} height={200} /></div>
      <div className='fixed left-0 bottom-0 z-10'><Image src={Ellipse1} alt="ellipse" width={210} height={210} /></div>
      <div className="container flex items-center justify-center z-20">
        <div className="relative w-full max-w-xl flex flex-col gap-6 px-6 py-6 bg-background rounded-lg">
          <Icons.arrowLeft className="cursor-pointer" />

          <CustomTabs defaultValue="termsOfService" className="w-full">
            <CustomTabsList className='bg-secondary w-full'>
              <CustomTabsTrigger className="w-full text-base" value="termsOfService">Terms Of Service</CustomTabsTrigger>
              <CustomTabsTrigger className="w-full text-base" value="privacyPolicy">Privacy Policy</CustomTabsTrigger>
            </CustomTabsList>
            <CustomTabsContent value="termsOfService" className="text-sm min-h-[350px] max-h-[400px] overflow-y-scroll">In this Terms of Service, “you” or “your” means an individual who interacts with TRACKMYCARE with respect to TRACKMYCARE’s services (the “Services”). For clarity, where applicable and where permitted by law, the term “you” or “your” also refers to you on behalf of (a) your minor children and (b) those individuals for whom you are the substitute decision maker.
              TRACKMYCARE INC. (“TRACKMYCARE” or “we” or “our” or “us”) respects your privacy and is committed to maintaining the privacy and security of your personal information in accordance with applicable privacy legislation, including the Personal Information Protection and Electronic Documents Act amended by the Digital Privacy Act and the Personal Health Information Protection Act.
              This Privacy Policy applies to Information we collect about you, including, without limitation, information about your health, your healthcare providers, and your health number (the “Personal Health Information”) and information about your usage of our website (collectively, the “Information”). We collect such information when you use our website or otherwise communicate with TRACKMYCARE.</CustomTabsContent>
            <CustomTabsContent value="privacyPolicy" className="text-sm min-h-[350px] max-h-[400px] overflow-y-scroll">In this Privacy Policy, “you” or “your” means an individual who interacts with TRACKMYCARE with respect to TRACKMYCARE’s services (the “Services”). For clarity, where applicable and where permitted by law, the term “you” or “your” also refers to you on behalf of (a) your minor children and (b) those individuals for whom you are the substitute decision maker.
              TRACKMYCARE INC. (“TRACKMYCARE” or “we” or “our” or “us”) respects your privacy and is committed to maintaining the privacy and security of your personal information in accordance with applicable privacy legislation, including the Personal Information Protection and Electronic Documents Act amended by the Digital Privacy Act and the Personal Health Information Protection Act.
              This Privacy Policy applies to Information we collect about you, including, without limitation, information about your health, your healthcare providers, and your health number (the “Personal Health Information”) and information about your usage of our website (collectively, the “Information”). We collect such information when you use our website or otherwise communicate with TRACKMYCARE.</CustomTabsContent>
          </CustomTabs>

          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center gap-4">
              <Checkbox id="terms" className="w-6 h-6 rounded-sm" />
              <Label htmlFor="terms">By checking this box you  accept to our terms of service.</Label>
            </div>
            <div className="w-full flex items-center gap-4">
              <Checkbox id="pp" className="w-6 h-6 rounded-sm" />
              <Label htmlFor="pp">By checking this box you  accept to our privacy policy.</Label>
            </div>
          </div>
          <Button className="w-full">Accept</Button>
        </div>
      </div>
    </div>
  )
}