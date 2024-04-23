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
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  address: z.string(),
});

function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
  });
  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const [clinicLogo, setClinicLogo] = useState<string | null>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
  }

  function handleLogoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClinicLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
                    <h1>Clinic Management</h1>
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
                    <h1>Add Clinic</h1>
                  </div>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="md:px-8 px-6">
        <div className="md:text-2xl text-xl font-bold mt-10">Add Clinic</div>
        <div className="md:w-[45%] w-full py-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        label="Name of the Clinic*"
                        placeholder="Enter clinic's name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Email ID*"
                        className=""
                        placeholder="Enter your e-mail"
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
              {/* <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl> */}
              <>
                <Input
                  type="file"
                  className=""
                  label="Clinic Logo*"
                  onChange={handleLogoChange}
                />
                {/* <div className="absolute right-0 top-0 bottom-0 flex items-center px-3">
                                                    <Upload size={20} />
                                                </div> */}
              </>
              {/* </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className=""
                        placeholder="Address*"
                        {...field}
                      />
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
