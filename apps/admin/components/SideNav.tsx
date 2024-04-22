"use client";
import Image from "next/image";
import { Cross, Logout } from "public/assets/icons";
import { Logo } from "public/assets/images";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "ui";
import { Icons } from "./Icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authApi } from "api/authApi1";

type IconProps = React.SVGProps<SVGSVGElement>;

export function SideNavItem({
  IconComponent,
  title,
  pathname,
}: {
  IconComponent: React.FC<IconProps>;
  title: string;
  pathname: string;
}) {
  const currPathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div
      className={` ${
        currPathname === pathname
          ? "bg-secondary flex flex-row  rounded-md"
          : "bg-primary flex flex-row rounded-md"
      } 'flex flex-row py-2 my-6 md:my-0 md:py-3 px-2 rounded-md'`}>
      <div className="flex flex-row gap-3">
        {currPathname === pathname && (
          <IconComponent
            stroke="primary"
            fill="#004C4C"
            width={20}
            height={20}
          />
        )}
        {currPathname !== pathname && <IconComponent width={20} height={20} />}
        <h1
          className={` ${
            currPathname === pathname ? "text-primary" : "text-secondary"
          } font-medium`}>
          {title}
        </h1>
      </div>
    </div>
  );
}

function SideNav({
  sideNavActive,
  setSideNavActive,
}: {
  sideNavActive: boolean;
  setSideNavActive: Function;
}) {
  const currPathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleLogout = async () => {
    await authApi.logout();
  };

  return (
    <div className="z-50">
      {sideNavActive && (
        <div
          className={`side-nav z-50 fixed top-0 left-0 w-screen h-full md:hidden transition-transform transform ${
            sideNavActive ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div className="absolute top-0 left-0 w-[80%] h-full bg-primary opacity-100 text-white px-6 ">
            <div className="flex flex-row justify-between items-center w-full py-8">
              <div className="flex flex-row items-center justify-center gap-2">
                <Image className="" src={Logo} alt="" height={50} width={50} />
                <p className="text-secondary font-bold text-lg">
                  Track My Care
                </p>
              </div>
              <div>
                <Image
                  onClick={() => setSideNavActive(!sideNavActive)}
                  src={Cross}
                  alt=""
                  height={18}
                  width={18}
                />
              </div>
            </div>

            <div className="mt-10">
              <div>Main Menu</div>
              <div className="w-full mt-4 px-2">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex flex-row gap-3 items-center justify-center">
                        <Icons.userManagement
                          stroke="white"
                          width={22}
                          height={22}
                        />
                        <h1>User Managment</h1>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-base flex flex-col gap-2">
                        <h1 className="ml-8 rounded-sm py-1">Customers</h1>
                        <h1 className="ml-8 rounded-sm py-1">Employees</h1>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <Link href="/requested-records">
                <SideNavItem
                  IconComponent={Icons.requestedRecords}
                  pathname="/requested-records"
                  title="Requested Records"
                />
              </Link>
              <Link href="/earnings-management">
                <SideNavItem
                  IconComponent={Icons.earningsManagement}
                  pathname="/earnings-manangement"
                  title="Earnings Management"
                />
              </Link>
              <Link href="/subscription">
                <SideNavItem
                  IconComponent={Icons.subscription}
                  pathname="/subscription"
                  title="Subscription"
                />
              </Link>
              <div className="w-full">
                <Accordion className="" type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex flex-row gap-3 items-center px-2">
                        <Icons.enquiryManagement
                          stroke="primary"
                          width={22}
                          height={22}
                        />
                        <h1>Enquiry Managment</h1>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-base flex flex-col">
                        <Link href="/enquires/general">
                          <h1
                            className={`${
                              currPathname === "/enquires/general"
                                ? "bg-secondary text-[#004C4C]"
                                : ""
                            } ml-8 rounded-sm px-2 py-1`}>
                            General
                          </h1>
                        </Link>
                        <Link href="/enquires/support">
                          <h1
                            className={`${
                              currPathname === "/enquires/support"
                                ? "bg-secondary text-[#004C4C]"
                                : ""
                            } ml-8 rounded-sm px-2 py-1`}>
                            Support
                          </h1>
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <Link href="/clinics-management">
                <SideNavItem
                  IconComponent={Icons.hospital}
                  pathname="/clinics-management"
                  title="Clinic Management"
                />
              </Link>
              <div className="flex flex-row py-4 mt-10">
                <div className="flex flex-row gap-3">
                  <Image src={Logout} alt="" height={20} width={20} />
                  <h1>Logout</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-[80%] w-[20%] h-full bg-black opacity-50"></div>
        </div>
      )}
      <div className="hidden md:block">
        <div className="bg-primary h-screen text-sm flex flex-col">
          <div className="flex px-6 flex-row justify-between items-center w-full py-6">
            <div className="flex flex-row items-center justify-center gap-2">
              <Image className="" src={Logo} alt="" height={30} width={30} />
              <p className="text-secondary font-bold text-lg">Track My Care</p>
            </div>
          </div>
          <div className="text-secondary px-6 mb-6 mt-8">Main Menu</div>
          <div className="overflow-y-scroll px-6 gap-3 scrollbar-hide flex flex-col">
            <Link href="/dashboard">
              <SideNavItem
                IconComponent={Icons.dashboard}
                pathname="/dashboard"
                title="Dashboard"
              />
            </Link>
            <div className="w-full text-secondary px-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-3">
                      <Icons.userManagement
                        stroke="#fff2"
                        height={22}
                        width={22}
                      />
                      <h1 className="text-secondary">User Managment</h1>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <Link href="/user-management/customer">
                        <h1
                          className={`${
                            currPathname === "/user-management/customer"
                              ? "bg-secondary text-[#004C4C]"
                              : ""
                          } ml-8 rounded-sm px-2 py-1 `}>
                          Customers
                        </h1>
                      </Link>
                      <Link href="/user-management/employee">
                        <h1
                          className={`${
                            currPathname === "/user-management/employee"
                              ? "bg-secondary text-[#004C4C]"
                              : ""
                          } ml-8 rounded-sm px-2 py-1 `}>
                          Employees
                        </h1>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Link href="/requested-records">
              <SideNavItem
                IconComponent={Icons.requestedRecords}
                pathname="/requested-records"
                title="Requested Records"
              />
            </Link>
            <Link href="/earnings-management">
              <SideNavItem
                IconComponent={Icons.earningsManagement}
                pathname="/earnings-management"
                title="Earnings Management"
              />
            </Link>
            <Link href="/subscription">
              <SideNavItem
                IconComponent={Icons.subscription}
                pathname="/subscription"
                title="Subscription"
              />
            </Link>
            <div className="w-full text-secondary px-2">
              <Accordion className="" type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-3">
                      <Icons.enquiryManagement
                        stroke="primary"
                        width={22}
                        height={22}
                      />
                      <h1 className="text-secondary">Enquiry Managment</h1>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <Link href="/enquires/general">
                        <h1
                          className={`${
                            currPathname === "/enquires/general"
                              ? "bg-secondary text-[#004C4C]"
                              : ""
                          } ml-8 rounded-sm px-2 py-1 `}>
                          General
                        </h1>
                      </Link>
                      <Link href="/enquires/support">
                        <h1
                          className={`${
                            currPathname === "/enquires/support"
                              ? "bg-secondary text-[#004C4C]"
                              : ""
                          } ml-8 rounded-sm px-2 py-1 `}>
                          Support
                        </h1>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Link href="/clinics-management">
              <SideNavItem
                IconComponent={Icons.hospital}
                pathname="/clinics-management"
                title="Clinic Management"
              />
            </Link>
            <div className="mt-6">
              <div className="cursor-pointer" onClick={handleLogout}>
                <SideNavItem
                  IconComponent={Icons.logout}
                  pathname="/"
                  title="Logout"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
