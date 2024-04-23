"use client";
import { Icons } from "components/Icons";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "ui";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "ui";
import { Form, FormControl, FormField, FormItem, FormMessage } from "ui";
import { Input } from "ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui";
import { Textarea } from "ui";
import { Subscription } from "public/assets/icons";
import { Calendar } from "ui";
import { Popover, PopoverContent, PopoverTrigger } from "ui";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  gender: z.string(),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  healthCardNumber: z.string(),
  postalCode: z.string(),
  subscriptionTime: z.string(),
  dob: z.date(),
});

function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      phoneNumber: "",
      healthCardNumber: "",
      postalCode: "",
      subscriptionTime: "",
      dob: new Date(),
    },
  });
  const [date, setDate] = useState<Date>();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
  }

  return (
    <div className="">
      <div className="hidden md:block">
        <div className="h-14 border-b flex items-center px-6 border-gray-200">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem></BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    router.push("/user-management/customer");
                  }}
                  className="text-primary cursor-pointer font-light hover:underline">
                  <div className="flex flex-row items-center gap-4">
                    <Icons.backArrow
                      fill="black"
                      height={12}
                      width={12}
                      stroke="black"
                    />
                    <h1>Active Customers</h1>
                  </div>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-light">
                  <div className="flex flex-row items-center gap-4">
                    <Icons.breadcrumbSeparator
                      fill="black"
                      height={12}
                      width={12}
                      stroke="black"
                    />
                    <h1>Add new user</h1>
                  </div>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="md:px-8 px-6">
        <div className="md:text-2xl text-xl font-bold mt-10">
          Add new customer
        </div>
        <div className="md:w-[45%] w-full py-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-row gap-2">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-full"
                            label="First Name*"
                            placeholder="Enter your first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2 ">
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-full"
                            label="Last Name*"
                            placeholder="Enter your last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Email ID*"
                        className=""
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Phone Number*"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full text-left justify-start font-normal ${
                              !date && "text-muted-foreground"
                            }`}>
                            {date ? (
                              format(new Date(date), "PPP")
                            ) : (
                              <span>Date of birth*</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(date) => {
                              if (date) {
                                setDate(date);
                                field.onChange(date); // Update the form field value
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="healthCardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Health Card Number*"
                        placeholder="Enter your health card number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Postal code*"
                        placeholder="Enter your postal code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subscriptionTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time limit for subscription" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 month">1 Month</SelectItem>
                          <SelectItem value="2 month">2 Month</SelectItem>
                          <SelectItem value="3 month">3 Month</SelectItem>
                          <SelectItem value="4 month">4 Month</SelectItem>
                          <SelectItem value="5 month">5 Month</SelectItem>
                          <SelectItem value="6 month">6 Month</SelectItem>
                          <SelectItem value="1 year">1 Year</SelectItem>
                          <SelectItem value="2 year">2 Year</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className=" h-10 w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

// Export the Page component
export default Page;
