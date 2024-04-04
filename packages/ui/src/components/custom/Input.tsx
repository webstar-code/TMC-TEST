import React, { useState } from "react";
import { Input as ShadInput, InputProps } from "../ui/input";
interface CustomInputProps extends InputProps {
  label: string;
}
const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, value, label, ...props }, ref) => {
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
          className={`pointer-events-none absolute left-3 transition-all bg-secondary z-10 duration-300 font-medium
           ${
             focused || value
               ? "top-[-8px] text-xs text-gray-500"
               : "top-3 text-sm text-gray-600"
           }`}>
          {label}
        </label>
        <ShadInput
          className={`${className} ${
            !focused
              ? "placeholder:text-white placeholder:opacity-0"
              : "placeholder:text-gray-400"
          } pt-2 border-b  focus:border-primary transition-all duration-300  hover:shadow-[0px_0px_0px_2px_rgb(232,237,235,1)]`}
          ref={ref}
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
