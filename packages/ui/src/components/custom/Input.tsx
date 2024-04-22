import React, { useState } from "react";
import { InputProps, Input as ShadInput } from "../ui/input";
import { cn } from "@/lib/utils";

interface CustomInputProps extends InputProps {
  label: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, labelClassName, value, type, label, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = () => {
      if (!value) {
        setFocused(false);
      }
    };

    return (
      <div className="w-full relative cursor-text flex items-center">
        <label
          className={cn(
            "absolute left-3 px-0.5 transition-all bg-background z-10 duration-300 font-medium pointer-events-none",
            focused || value
              ? "top-[-8px] text-xs text-gray-500"
              : "top-[10px] text-sm text-gray-600",
            labelClassName
          )}>
          {label}
        </label>
        <ShadInput
          value={value}
          type={type}
          className={cn(
            "pt-2 border-b items-start focus:border-primary transition-all duration-300",
            !focused ? "placeholder:text-white" : "placeholder:text-gray-400",
            className
          )}
          ref={ref}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
