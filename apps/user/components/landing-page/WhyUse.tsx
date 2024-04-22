import {
  FamilyMedicalVault,
  FingerTipAccess,
  LifetimeRepository,
  QuickShare,
  SecureStorage,
  YourHealthCould,
} from "assets/images";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "ui";

function WhyUse() {
  const cardContent = [
    {
      title: "Your Health Cloud",
      description:
        "Finally a convenient place to store all your health information in an organized and secure medical cloud.",
      imageUrl: YourHealthCould,
    },
    {
      title: "Family Medical Vault",
      description:
        "Storage of all your familys health information on a user friendly and easy to use platform.",
      imageUrl: FamilyMedicalVault,
    },
    {
      title: "Secure Storage",
      description:
        "Your medical records are protected in a secure cloud infrastructure and with adherence to HIPAA and robust privacy policies.",
      imageUrl: SecureStorage,
    },
    {
      title: "Lifetime Repository",
      description:
        "No need to fumble upon files and folders. Now you can organize your medical reports in one place with long term storage.",
      imageUrl: LifetimeRepository,
    },
    {
      title: "Fingertip Access",
      description:
        "Whether you are traveling, at home or at a doctors visit, you can easily access your medical cloud.",
      imageUrl: FingerTipAccess,
    },
    {
      title: "Quick Share",
      description:
        "Easily grant trusted health professionals access to your medical records enabling them to better understand your health and provide guidance.",
      imageUrl: QuickShare,
    },
  ];

  return (
    <div className="w-full px-6 py-10 md:py-24">
      <div className="w-full">
        <div className="w-full justify-center items-center flex flex-col gap-2 md:gap-6 md:px-16">
          <div className="font-semibold md:text-xl">WHY USE TRACK MY CARE</div>
          <div className="font-bold text-2xl md:text-4xl">
            Easy, Simple, Affordable
          </div>
          <div className="font-normal text-center text:sm md:text-base md:w-[40%] mt-2">
            A solution designed to give you easy access to all of your
            healthcare data and documents.
          </div>
        </div>
        <div className="md:hidden px-8 mt-10">
          <Carousel>
            <CarouselContent>
              {cardContent.map((c) => (
                <CarouselItem key={c.title}>
                  <div className="flex flex-col gap-3 shadow py-6 px-4 rounded-md">
                    <Image
                      src={c.imageUrl}
                      alt={c.title}
                      className="mx-auto"
                      width={200}
                      height={200}
                    />
                    <div className="font-bold text-xl text-center">
                      {c.title}
                    </div>
                    <div className="font-light text-sm text-center">
                      {c.description}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="hidden md:block">
          <div className="container grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-10 md:px-8 md:py-12 justify-around mx-auto">
            {cardContent.map((item, index) => (
              <div
                key={index}
                className="shadow px-6 rounded-xl flex flex-col gap-4 py-10 mx-auto">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  className="mx-auto h-[200px]"
                  width={164}
                  height={164}
                />
                <h2 className="text-xl font-bold w-full text-center">
                  {item.title}
                </h2>
                <p className="mt-2 w-full text-center text-[#868686]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUse;
