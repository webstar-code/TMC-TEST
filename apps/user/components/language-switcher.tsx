"use client";

import { LANGUAGES } from "app/i18n/settings";
import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui";

export function LanguageSwitcher() {
  const pathName = usePathname();
  function changeLang(value: string) {
    let lang = pathName.split("/")[1];
    window.location.replace(pathName.replace(`/${lang}/`, `/${value}/`));
  }

  return (
    <div className="flex items-center gap-1">
      <Languages color="white" size={20} />
      <Select onValueChange={(value) => changeLang(value)}>
        <SelectTrigger className="w-max bg-primary border-none text-primary-foreground">
          <SelectValue
            className="bg-none"
            placeholder={
              LANGUAGES.find((i) => i.code == pathName.split("/")[1])?.name ||
              ""
            }
          />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
