import { logo } from "assets/images";
import { useUserStore } from "lib/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  cn,
} from "ui";
import { ROUTES } from "utils/routes";

export function SideNav() {
  const { logout } = useUserStore();
  let pathName = usePathname();
  pathName = "/" + pathName.split("/").slice(2)[0];
  return (
    <div
      className={cn(
        "min-h-screen bg-primary w-72 flex flex-col gap-4 items-center py-6"
      )}>
      <div className="w-full flex flex-row gap-2 px-4 justify-start">
        <Image src={logo} alt="logo" width={36} height={36} />
        <p className="text-secondary font-bold text-xl">Track My Care</p>
      </div>

      <div className=" h-full space-y-4 py-4 grow pb-12 text-primary-foreground">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-0 text-sm font-semibold tracking-tight">
            Main Menu
          </h2>
          <div className="space-y-1">
            <Link href={ROUTES.exams} className="w-full h-full inline-flex">
              <Button
                variant={pathName === ROUTES.exams ? "secondary" : "ghost"}
                className="w-full justify-start font-semibold pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  className="mr-2"
                  viewBox="0 0 22 22"
                  fill={pathName === ROUTES.exams ? "currentColor" : "none"}
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.1654 10.083V15.583C20.1654 19.2497 19.2487 20.1663 15.582 20.1663H6.41536C2.7487 20.1663 1.83203 19.2497 1.83203 15.583V6.41634C1.83203 2.74967 2.7487 1.83301 6.41536 1.83301H7.79036C9.16536 1.83301 9.46786 2.23634 9.99036 2.93301L11.3654 4.76634C11.7137 5.22467 11.9154 5.49967 12.832 5.49967H15.582C19.2487 5.49967 20.1654 6.41634 20.1654 10.083Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M7.33203 1.83301H15.582C17.4154 1.83301 18.332 2.74967 18.332 4.58301V5.84801"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Exam History
              </Button>
            </Link>
            <Link
              href={ROUTES.requestedRecords}
              className="w-full h-full inline-flex">
              <Button
                variant={
                  pathName === ROUTES.requestedRecords ? "secondary" : "ghost"
                }
                className="w-full justify-start font-semibold pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  className="mr-2"
                  viewBox="0 0 22 22"
                  fill={
                    pathName === ROUTES.requestedRecords
                      ? "currentColor"
                      : "none"
                  }
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.6654 11.6323V16.5731C14.6654 18.7181 13.2354 20.1389 11.0995 20.1389H5.39786C3.26203 20.1389 1.83203 18.7181 1.83203 16.5731V9.4506C1.83203 7.3056 3.26203 5.88477 5.39786 5.88477H8.9087C9.85286 5.88477 10.7604 6.2606 11.4295 6.92977L13.6204 9.11143C14.2895 9.7806 14.6654 10.6881 14.6654 11.6323Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.1654 7.56233V12.5032C20.1654 14.639 18.7354 16.069 16.5995 16.069H14.6654V11.6323C14.6654 10.6882 14.2895 9.78066 13.6204 9.1115L11.4295 6.92983C10.7604 6.26066 9.85286 5.88483 8.9087 5.88483H7.33203V5.3715C7.33203 3.23566 8.76203 1.80566 10.8979 1.80566H14.4087C15.3529 1.80566 16.2604 2.1815 16.9295 2.85066L19.1204 5.0415C19.7895 5.71066 20.1654 6.61816 20.1654 7.56233Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Requested Records
              </Button>
            </Link>
            <Link href={ROUTES.share} className="w-full h-full inline-flex">
              <Button
                variant={pathName === ROUTES.share ? "secondary" : "ghost"}
                className="w-full justify-start font-semibold pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  className="mr-2"
                  viewBox="0 0 22 22"
                  fill={pathName === ROUTES.share ? "currentColor" : "none"}
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.5469 5.65576C17.3802 6.92993 18.6452 8.95576 18.9019 11.2933"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.19922 11.3392C3.43755 9.01083 4.68422 6.98499 6.49922 5.70166"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.50781 19.1953C8.57115 19.7361 9.78115 20.0386 11.0553 20.0386C12.2836 20.0386 13.4386 19.7636 14.4745 19.2595"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.0542 7.05809C12.4616 7.05809 13.6025 5.91716 13.6025 4.50976C13.6025 3.10235 12.4616 1.96143 11.0542 1.96143C9.64679 1.96143 8.50586 3.10235 8.50586 4.50976C8.50586 5.91716 9.64679 7.05809 11.0542 7.05809Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.42724 18.2598C5.83465 18.2598 6.97557 17.1188 6.97557 15.7114C6.97557 14.304 5.83465 13.1631 4.42724 13.1631C3.01983 13.1631 1.87891 14.304 1.87891 15.7114C1.87891 17.1188 3.01983 18.2598 4.42724 18.2598Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.5718 18.2598C18.9792 18.2598 20.1201 17.1188 20.1201 15.7114C20.1201 14.304 18.9792 13.1631 17.5718 13.1631C16.1644 13.1631 15.0234 14.304 15.0234 15.7114C15.0234 17.1188 16.1644 18.2598 17.5718 18.2598Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Share History
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-0 text-sm font-semibold tracking-tight">
            Account
          </h2>
          <div className="w-full">
            <Link href={ROUTES.profile}>
              <Button
                variant={pathName === ROUTES.profile ? "secondary" : "ghost"}
                className="w-full justify-start font-semibold pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  className="mr-2"
                  viewBox="0 0 22 22"
                  fill={pathName === ROUTES.profile ? "currentColor" : "none"}
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.1464 9.96433C11.0547 9.95516 10.9447 9.95516 10.8439 9.96433C8.66219 9.891 6.92969 8.1035 6.92969 5.9035C6.92969 3.65766 8.74469 1.8335 10.9997 1.8335C13.2455 1.8335 15.0697 3.65766 15.0697 5.9035C15.0605 8.1035 13.328 9.891 11.1464 9.96433Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.56219 13.3465C4.34385 14.8315 4.34385 17.2515 6.56219 18.7273C9.08302 20.414 13.2172 20.414 15.738 18.7273C17.9564 17.2423 17.9564 14.8223 15.738 13.3465C13.2264 11.669 9.09219 11.669 6.56219 13.3465Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M272.665 11.6323V16.5731C272.665 18.7181 271.235 20.1389 269.1 20.1389H263.398C261.262 20.1389 259.832 18.7181 259.832 16.5731V9.4506C259.832 7.3056 261.262 5.88477 263.398 5.88477H266.909C267.853 5.88477 268.76 6.2606 269.43 6.92977L271.62 9.11143C272.29 9.7806 272.665 10.6881 272.665 11.6323Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M278.165 7.56233V12.5032C278.165 14.639 276.735 16.069 274.6 16.069H272.665V11.6323C272.665 10.6882 272.29 9.78066 271.62 9.1115L269.43 6.92983C268.76 6.26066 267.853 5.88483 266.909 5.88483H265.332V5.3715C265.332 3.23566 266.762 1.80566 268.898 1.80566H272.409C273.353 1.80566 274.26 2.1815 274.93 2.85066L277.12 5.0415C277.79 5.71066 278.165 6.61816 278.165 7.56233Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                My Profile
              </Button>
            </Link>
            <Link href={ROUTES.familyMembers}>
              <Button
                variant={
                  pathName === ROUTES.familyMembers ? "secondary" : "ghost"
                }
                className="w-full justify-start font-semibold pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  className="mr-2"
                  viewBox="0 0 22 22"
                  fill={
                    pathName === ROUTES.familyMembers ? "currentColor" : "none"
                  }
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.5002 6.5635C16.4452 6.55433 16.3811 6.55433 16.3261 6.5635C15.0611 6.51767 14.0527 5.48183 14.0527 4.1985C14.0527 2.88766 15.1069 1.8335 16.4177 1.8335C17.7286 1.8335 18.7827 2.89683 18.7827 4.1985C18.7736 5.48183 17.7652 6.51767 16.5002 6.5635Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.5568 13.2365C16.8126 13.4473 18.1968 13.2273 19.1685 12.5765C20.461 11.7148 20.461 10.3032 19.1685 9.44149C18.1876 8.79066 16.7851 8.57065 15.5293 8.79065"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.47195 6.5635C5.52695 6.55433 5.59112 6.55433 5.64612 6.5635C6.91112 6.51767 7.91945 5.48183 7.91945 4.1985C7.91945 2.88766 6.86529 1.8335 5.55445 1.8335C4.24362 1.8335 3.18945 2.89683 3.18945 4.1985C3.19862 5.48183 4.20695 6.51767 5.47195 6.5635Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.41698 13.237C5.16114 13.4478 3.77698 13.2278 2.80531 12.577C1.51281 11.7153 1.51281 10.3036 2.80531 9.44198C3.78615 8.79115 5.18864 8.57114 6.44448 8.79114"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.0002 13.4107C10.9452 13.4015 10.8811 13.4015 10.8261 13.4107C9.56107 13.3648 8.55273 12.329 8.55273 11.0457C8.55273 9.73483 9.6069 8.68066 10.9177 8.68066C12.2286 8.68066 13.2827 9.744 13.2827 11.0457C13.2736 12.329 12.2652 13.374 11.0002 13.4107Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.33266 16.2981C7.04016 17.1598 7.04016 18.5714 8.33266 19.4331C9.79932 20.4139 12.201 20.4139 13.6677 19.4331C14.9602 18.5714 14.9602 17.1598 13.6677 16.2981C12.2102 15.3264 9.79932 15.3264 8.33266 16.2981Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Family Members
              </Button>
            </Link>
            <Link href={ROUTES.subscription}>
              <Button
                variant={
                  pathName === ROUTES.subscription ? "secondary" : "ghost"
                }
                className="w-full justify-start font-semibold pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  className="mr-2"
                  viewBox="0 0 22 22"
                  fill={
                    pathName === ROUTES.subscription ? "currentColor" : "none"
                  }
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.66536 20.1663C3.1612 20.1663 2.7296 19.9868 2.37057 19.6278C2.01155 19.2688 1.83203 18.8372 1.83203 18.333V9.16634C1.83203 8.66217 2.01155 8.23058 2.37057 7.87155C2.7296 7.51252 3.1612 7.33301 3.66536 7.33301H18.332C18.8362 7.33301 19.2678 7.51252 19.6268 7.87155C19.9859 8.23058 20.1654 8.66217 20.1654 9.16634V18.333C20.1654 18.8372 19.9859 19.2688 19.6268 19.6278C19.2678 19.9868 18.8362 20.1663 18.332 20.1663H3.66536ZM3.66536 18.333H18.332V9.16634H3.66536V18.333ZM9.16536 17.4163L14.6654 13.7497L9.16536 10.083V17.4163ZM3.66536 6.41634V4.58301H18.332V6.41634H3.66536ZM6.41536 3.66634V1.83301H15.582V3.66634H6.41536Z"
                    fill="currentColor"
                  />
                </svg>
                Subscritpions
              </Button>
            </Link>
            <Link href={ROUTES.support}>
              <Button
                variant={pathName === ROUTES.support ? "secondary" : "ghost"}
                className="w-full justify-start font-semibold pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  className="mr-2"
                  viewBox="0 0 22 22"
                  fill={pathName === ROUTES.support ? "currentColor" : "none"}
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.582 16.8943H11.9154L7.83619 19.6076C7.23119 20.0109 6.41536 19.5801 6.41536 18.8468V16.8943C3.66536 16.8943 1.83203 15.0609 1.83203 12.3109V6.81087C1.83203 4.06087 3.66536 2.22754 6.41536 2.22754H15.582C18.332 2.22754 20.1654 4.06087 20.1654 6.81087V12.3109C20.1654 15.0609 18.332 16.8943 15.582 16.8943Z"
                    stroke={
                      pathName === ROUTES.support ? "white" : "currentColor"
                    }
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.0002 10.4131V10.2206C11.0002 9.59729 11.3852 9.26727 11.7702 9.00144C12.146 8.74477 12.5218 8.41478 12.5218 7.80978C12.5218 6.96645 11.8435 6.28809 11.0002 6.28809C10.1568 6.28809 9.47852 6.96645 9.47852 7.80978"
                    stroke={
                      pathName === ROUTES.support ? "white" : "currentColor"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.9972 12.6038H11.0054"
                    stroke={
                      pathName === ROUTES.support ? "white" : "currentColor"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Support
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full flex px-4 py-2 mt-auto">
          <Dialog>
            <DialogTrigger className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start font-semibold cursor-pointer">
                <svg
                  className="mr-2"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.1582 7.42997C8.44237 4.12997 10.1382 2.78247 13.8507 2.78247H13.9699C18.0674 2.78247 19.7082 4.4233 19.7082 8.5208V14.4975C19.7082 18.595 18.0674 20.2358 13.9699 20.2358H13.8507C10.1657 20.2358 8.46987 18.9066 8.16737 15.6616"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.75 11.5H3.31836"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.36185 8.4292L2.29102 11.5L5.36185 14.5709"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="sm:text-center">
                <h1 className="text-lg font-semibold">Ready To logout?</h1>
              </DialogHeader>
              <DialogDescription className="sm:text-center">
                Are you sure you want to logout of your account?
              </DialogDescription>
              <DialogFooter>
                <div className="w-full flex gap-4 justify-center">
                  <Button onClick={() => logout()} className="min-w-[128px]">
                    Logout
                  </Button>
                  <Button variant={"outline"} className="min-w-[128px]">
                    Cancel
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
