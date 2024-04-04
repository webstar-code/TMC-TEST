import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "utils/routes";

export function BottomNav() {
  const pathName = usePathname();

  return (
    <div className="w-full h-20 fixed bottom-0 p-4 rounded-t-2xl bg-primary text-primary-foreground">
      <div className="w-full flex items-center justify-evenly">
        <Link
          href={ROUTES.exams}
          className="w-full h-full inline-flex justify-center">
          <div
            className={`flex flex-col items-center gap-2 ${
              pathName === ROUTES.exams
                ? "text-primary"
                : "text-primary-foreground"
            }`}>
            <svg
              width="22"
              height="22"
              className="mr-2"
              viewBox="0 0 22 22"
              fill={pathName === ROUTES.exams ? "white" : "none"}
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.1654 10.083V15.583C20.1654 19.2497 19.2487 20.1663 15.582 20.1663H6.41536C2.7487 20.1663 1.83203 19.2497 1.83203 15.583V6.41634C1.83203 2.74967 2.7487 1.83301 6.41536 1.83301H7.79036C9.16536 1.83301 9.46786 2.23634 9.99036 2.93301L11.3654 4.76634C11.7137 5.22467 11.9154 5.49967 12.832 5.49967H15.582C19.2487 5.49967 20.1654 6.41634 20.1654 10.083Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
              <path
                d="M7.33203 1.83301H15.582C17.4154 1.83301 18.332 2.74967 18.332 4.58301V5.84801"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm font-medium text-primary-foreground">
              Exam History
            </p>
          </div>
        </Link>
        <Link
          href={ROUTES.requestedRecords}
          className="w-full h-full inline-flex justify-center">
          <div
            className={`flex flex-col items-center gap-2 ${
              pathName === ROUTES.requestedRecords
                ? "text-primary"
                : "text-primary-foreground"
            }`}>
            <svg
              width="22"
              height="22"
              className="mr-2"
              viewBox="0 0 22 22"
              fill={pathName === ROUTES.requestedRecords ? "white" : "none"}
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.6654 11.6323V16.5731C14.6654 18.7181 13.2354 20.1389 11.0995 20.1389H5.39786C3.26203 20.1389 1.83203 18.7181 1.83203 16.5731V9.4506C1.83203 7.3056 3.26203 5.88477 5.39786 5.88477H8.9087C9.85286 5.88477 10.7604 6.2606 11.4295 6.92977L13.6204 9.11143C14.2895 9.7806 14.6654 10.6881 14.6654 11.6323Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.1654 7.56233V12.5032C20.1654 14.639 18.7354 16.069 16.5995 16.069H14.6654V11.6323C14.6654 10.6882 14.2895 9.78066 13.6204 9.1115L11.4295 6.92983C10.7604 6.26066 9.85286 5.88483 8.9087 5.88483H7.33203V5.3715C7.33203 3.23566 8.76203 1.80566 10.8979 1.80566H14.4087C15.3529 1.80566 16.2604 2.1815 16.9295 2.85066L19.1204 5.0415C19.7895 5.71066 20.1654 6.61816 20.1654 7.56233Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm font-medium text-primary-foreground">
              Requests
            </p>
          </div>
        </Link>
        <Link
          href={ROUTES.share}
          className="w-full h-full inline-flex justify-center">
          <div className="flex flex-col items-center gap-2">
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
            <p className="text-sm font-medium">Share</p>
          </div>
        </Link>
        <Link
          href={ROUTES.profile}
          className="w-full h-full inline-flex justify-center">
          <div className="flex flex-col items-center gap-2">
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
            <p className="text-sm font-medium">Account</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
