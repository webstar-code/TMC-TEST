import { Container } from "components/Container";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tab";
import { Button } from "ui";

function Page() {
  return (
    <Container title="Employee">
      <>
        <div className="relative">
          <Tabs defaultValue="resolved" className="w-full absolute ">
            <TabsList className="bg-secondary w-full md:w-1/2 mt-6">
              <TabsTrigger
                className="text-md font-bold w-full text-start py-2 md:py-2 border-b"
                value="review">
                Under Review
              </TabsTrigger>
              <TabsTrigger
                className="text-md font-bold w-full text-start py-2 md:py-2 border-b"
                value="resolved">
                Pending
              </TabsTrigger>
              <TabsTrigger
                className="text-md font-bold w-full text-start py-2 md:py-2 border-b"
                value="active">
                Active
              </TabsTrigger>
              <TabsTrigger
                className="text-md font-bold w-full text-start py-2 md:py-2 border-b"
                value="bolcked">
                Blocked
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button className="hidden absolute md:block right-10 px-8 h-12 top-20">
          {" "}
          + Add Employee
        </Button>
      </>
    </Container>
  );
}

export default Page;
