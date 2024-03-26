import React, { useState } from 'react';
import { Input as ShadInput, InputProps } from '../ui/input';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, value, ...props }, ref) => {
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
            <div className='relative z-20'>
                {focused &&
                    <label
                        className={`absolute left-4 transition-all bg-secondary z-20 duration-300 ${focused || value ? 'top-[-8px] text-xs text-gray-500' : 'top-2 text-sm text-gray-400'}`}
                    >
                        {props.label}
                    </label>
                }
                <ShadInput
                    type={type}
                    className={`${className} pt-2 border-b focus:border-primary transition-all duration-300`}
                    ref={ref}
                    {...props}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
