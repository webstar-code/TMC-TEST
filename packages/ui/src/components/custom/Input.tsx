import React, { useState } from "react";
import { Input as ShadInput, InputProps } from "../ui/input";

interface CustomInputProps extends InputProps {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, value, type, label, ...props }, ref) => {
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
      <div className="relative z-20">
        <label
          className={`absolute left-4 transition-all z-20 duration-300 bg-none ${
            focused || value
              ? "top-[-8px] text-xs text-gray-500"
              : "top-2 text-sm text-gray-400"
          }`}>
          {label}
        </label>

        <ShadInput
          value={value}
          type={type}
          className={`${className} ${
            !focused ? "placeholder:text-white" : "placeholder:text-gray-400"
          } pt-2 border-b text-black items-start focus:border-primary transition-all duration-300`}
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
