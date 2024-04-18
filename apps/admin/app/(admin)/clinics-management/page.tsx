"use client";
import { Container } from "components/Container";
import { Icons } from "components/Icons";
import { columns } from "components/user-management/columns";
import { DataTable } from "components/user-management/datat-table";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "ui";
import { Input } from "ui";

function Page() {
  const [clinics, setClinics] = useState<any[]>();
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required
      },
      body: JSON.stringify(data),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  // Example usage
  const apiUrl =
    "http://ec2-35-182-231-111.ca-central-1.compute.amazonaws.com:8771/clinic_organizations";
  const newData = {
    // Your data object to be sent in the POST request
  };

  postData(apiUrl, newData)
    .then((data) => {
      setClinics(data);
      // Handle successful response here
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error here
    });

  const router = useRouter();
  return (
    <Container title="Clinics Management">
      <>
        <div className="absolute top-0 right-0">
          <Button
            onClick={() => {
              router.push("/clinics-management/form");
            }}
            className="absolute top-20 px-8 right-10">
            + Add Clinic
          </Button>
        </div>
        <div className="flex flex-row items-center gap-3 md:relative justify-start w-full mt-8 md:mt-14 md:mb-12">
          <div className="md:w-[40%] w-[80%] absolute z-20">
            <Input
              label="Search by Clinic Name"
              placeholder="Search by Clinic Name"
              className=""
            />
          </div>
          <div className="cursor-pointer absolute z-30 left-[240px] md:left-[450px]">
            <Icons.search width={20} height={20} />
          </div>
        </div>
        <div>{clinics && <DataTable columns={columns} data={clinics} />}</div>
      </>
    </Container>
  );
}

export default Page;
