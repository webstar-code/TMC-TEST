"use client";
import Image from "next/image";
import { Button } from "ui";
import { Ellipse, Ellipse1, HeroImage } from "assets/images";
import { useTranslation } from "app/i18n/client";
import { namepsaces } from "app/i18n/settings";

function HeroSection() {
  const { t } = useTranslation(namepsaces.landingPage);

  return (
    <div className="w-full h-full pb-10 md:h-[1260px] md:mt-[64px] mt-[64px]">
      <div className="h-[calc(650px)] lg:min-h-[calc(100vh-72px)] bg-primary relative md:max-h-fit">
        <div className="absolute right-0 z-10">
          <Image src={Ellipse} alt="logo" width={200} height={200} />
        </div>
        <div className="absolute bottom-0 z-10">
          <Image src={Ellipse1} alt="logo" width={210} height={210} />
        </div>
        <div className="relative w-full pt-32 z-20">
          <div className="px-6 flex flex-col  gap-8 justify-center mx-auto md:w-[60%]">
            <p className="text-secondary text-3xl md:text-[48px] text-center font-bold leading-[1.2]">
              {t("heroSectionTitle")}
            </p>
            <h1 className="text-center text-secondary font-thin md:text-xl">
              {t("heroSectionDescription")}
            </h1>
            <div className="flex justify-center">
              <Button variant={"secondary"} className="w-full max-w-[420px]">
                Try Track My Care
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`relative w-full h-full px-5 origin-top scaling-image z-30 -mt-16 md:-mt-32`}>
        <Image
          src={HeroImage}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }} // optional
        />
      </div>
    </div>
  );
}

export default HeroSection;
