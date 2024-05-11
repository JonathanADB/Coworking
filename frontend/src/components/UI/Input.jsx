import React from 'react';
import { cn } from '../../utils/cn';

const Input = ({ className, type, ...props }) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full border border-[#B29700] bg-[#F4F3EB] rounded-md outline-none outline-offset-0 px-1",
                className
              )}
            {...props}
        />
    );
}

export default Input;