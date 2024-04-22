"use client";
import { logo } from "assets/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, cn } from "ui";
import { ROUTES } from "utils/routes";
import { LanguageSwitcher } from "./language-switcher";
import { Space_Grotesk } from "next/font/google";
import useMediaQuery from "hooks/useMediaQuery";
import { useState, useEffect } from "react";
const space_Grotesk = Space_Grotesk({ subsets: ["latin"] });

function Header() {
  const { isSmall } = useMediaQuery();
  let currentRoute = usePathname();
  currentRoute = "/" + currentRoute.split("/").slice(2)[0];

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      style={{
        visibility: visible ? "visible" : "hidden",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
      className="max-w-[1600px] mx-auto w-full h-20 fixed top-0 flex items-center justify-between bg-primary z-40 drop-shadow-md transition-all duration-300">
      <div className="container bg-primary w-full flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={isSmall ? 24 : 42}
            height={isSmall ? 24 : 42}
          />
          <p
            className={cn(
              "text-xl md:text-2xl text-secondary font-bold",
              space_Grotesk.className
            )}>
            TrackMyCare
          </p>
        </div>
        <div className="hidden lg:flex">
          <div className="text-secondary gap-10 flex flex-row font-thin ">
            <Link
              className={cn(
                "text-base font-normal",
                currentRoute === "/" && "font-semibold"
              )}
              href="/">
              Home
            </Link>
            <Link
              className={cn(
                "text-base font-normal",
                currentRoute === "/clinics" && "font-semibold"
              )}
              href="/clinics">
              For Clinics
            </Link>
            <Link
              className={cn(
                "text-base font-normal",
                currentRoute === "/pricing" && "font-semibold"
              )}
              href="/pricing">
              Pricing
            </Link>
            <Link
              className={cn(
                "text-base font-normal",
                currentRoute === "/contact-us" && "font-semibold"
              )}
              href="/contact-us">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row">
            <LanguageSwitcher />
          </div>
          <Link href={ROUTES.login}>
            <Button variant={"secondary"} className="min-w-[100px]" size={"sm"}>
              Log in{" "}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
