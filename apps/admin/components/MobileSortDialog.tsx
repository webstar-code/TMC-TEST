import React, { useState } from "react";
import { Button } from "ui";
import { Checkbox } from "ui";

function MobileSortDialog({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: Function;
}) {
  const [selectedOption, setSelectedOption] = useState<string>("default");
  const [selectedFiltre, setSelectedFiltre] = useState<string>("name");

  return (
    <div className="md:hidden">
      <div className="flex justify-center absolute items-center h-screen z-40">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
          <div className="bg-white rounded-t-lg shadow-md flex w-full gap-2 h-[45%] flex-col p-6 first-letter:">
            <div className="flex flex-row w-full justify-between">
              <h1 className="font-bold">Sort by</h1>
              <h1 className="text-primary font-bold">Clear all</h1>
            </div>
            <div className="border h-[70%] my-4 rounded-xl flex flex-row">
              <div className="h-full w-1/2 bg-gray-300 flex flex-col">
                <h1
                  onClick={() => {
                    setSelectedFiltre("name");
                  }}
                  className={`${
                    selectedFiltre === "name" ? "bg-secondary" : ""
                  } p-2 rounded-sm`}>
                  Name
                </h1>
                <h1
                  onClick={() => {
                    setSelectedFiltre("requestedDate");
                  }}
                  className={`${
                    selectedFiltre === "requestedDate" ? "bg-secondary" : ""
                  } p-2 rounded-sm`}>
                  Requested Date
                </h1>
              </div>
              {selectedFiltre === "name" && (
                <div className="h-full w-1/2 flex flex-col gap-2 p-3">
                  <div className="flex flex-row items-center gap-2">
                    <Checkbox
                      onClick={() => {
                        setSelectedOption("default");
                      }}
                      checked={selectedOption === "default"}
                    />
                    <h1 className="text-sm font-thin">Default</h1>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Checkbox
                      onClick={() => {
                        setSelectedOption("az");
                      }}
                      checked={selectedOption === "az"}
                    />
                    <h1 className="text-sm font-thin">A - Z</h1>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Checkbox
                      onClick={() => {
                        setSelectedOption("za");
                      }}
                      checked={selectedOption === "za"}
                    />
                    <h1 className="text-sm font-thin">Z - A</h1>
                  </div>
                </div>
              )}
              {selectedFiltre === "requestedDate" && (
                <div className="h-full w-1/2 flex flex-col gap-4 p-3">
                  <div className="flex flex-row items-center gap-2">
                    <Checkbox
                      onClick={() => {
                        setSelectedOption("default");
                      }}
                      checked={selectedOption === "default"}
                    />
                    <h1 className="w-full text-sm">Default</h1>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Checkbox
                      onClick={() => {
                        setSelectedOption("az");
                      }}
                      checked={selectedOption === "az"}
                    />
                    <h1 className="w-full text-sm">Newest to Oldest</h1>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Checkbox
                      onClick={() => {
                        setSelectedOption("za");
                      }}
                      checked={selectedOption === "za"}
                    />
                    <h1 className="w-full text-sm">Oldest to Newest</h1>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex flex-row gap-2">
              <Button className="w-1/2 bg-secondary text-primary border border-primary hover:bg-secondary h-10 ">
                Clear
              </Button>
              <Button
                onClick={() => {
                  setIsActive(false);
                }}
                className="w-1/2 h-10">
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSortDialog;
