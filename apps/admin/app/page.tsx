import Image from "next/image";
import { cn } from "ui";
import { spaceGrotesk } from "./layout";
import { Button } from "ui";
export default function Home() {
  return (
    <div className="w-full h-screen bg-primary flex items-center justify-center">
      <div className="flex gap-2">
        <Image src={"/logo.svg"} alt="logo" width={48} height={48} />
        <h1
          className={cn(
            "text-2xl text-primary-foreground font-semibold",
            spaceGrotesk.className
          )}>
          Trackmycare
        </h1>
        <Button>
          TrackMyCare
        </Button>
      </div>
    </div>
  );
}
