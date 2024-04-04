"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui";

export default function VerifyPatient() {
  const [step, setStep] = useState(2);

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center">
      <div className="container flex items-center justify-center">
        <div className="relative w-full max-w-xl flex flex-col gap-6 px-10 py-10 items-center justify-center bg-background rounded-lg">
          {step == 1 && <Step1 />}
          {step == 2 && <Step2 />}
        </div>
      </div>
    </div>
  );
}

function Step1() {
  return (
    <>
      <div className="absolute right-6 top-6 z-50 cursor-pointer">
        <p className="text-sm">Step 1/2</p>
      </div>
      <h1 className="text-2xl font-bold">Verify Patient Details</h1>
      <div className="w-full flex gap-4">
        <Input
          className="w-full"
          placeholder="Enter your first name"
          label="First Name"
        />
        <Input
          className="w-full"
          placeholder="Enter your last name"
          label="Last Name"
        />
      </div>
      <Input
        className="w-full"
        placeholder="Enter your last name"
        label="Email Id"
        disabled
        value="xyz@gmail.com"
      />
      <Input
        className="w-full"
        placeholder="Enter your phone number"
        label="Phone Number"
      />
      <Input
        className="w-full"
        placeholder="Enter your date of birth"
        label="Date of birth"
      />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>
      <Input
        className="w-full"
        placeholder="Enter your health card number"
        label="Health card number"
      />
      <Input
        className="w-full"
        placeholder="Enter your postal code"
        label="Postal Code*"
      />

      <Button className="w-full">Continue</Button>
    </>
  );
}

function Step2() {
  return (
    <>
      <div className="absolute right-6 top-6 z-50 cursor-pointer">
        <p className="text-sm">Step 2/2</p>
      </div>
      <h1 className="text-2xl font-bold">Verify Patient Details</h1>

      <div className="flex flex-col gap-6 items-center">
        <p className="text-sm font-medium">Upload your Health Card Images:</p>
        <div className="flex gap-6">
          <div className="max-w-[158px] h-[228px] p-6 bg-gray-200 flex items-center justify-center rounded-md border border-dotted border-spacing-3">
            <p className="text-xs text-center">Add health card front</p>
          </div>
          <div className="max-w-[158px] h-[228px] p-6 bg-gray-200 flex items-center justify-center rounded-md border border-dotted border-spacing-3">
            <p className="text-xs text-center">Add health card back</p>
          </div>
        </div>
      </div>
      <Button className="w-full">Continue</Button>
      <Button variant={"ghost"} className="w-full">
        Skip
      </Button>
    </>
  );
}
