import { cn } from "lib/utils";
import { type InputHTMLAttributes } from "react";

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "border border-border rounded-[5px] bg-background text-xs indent-2 placeholder:font-normal placeholder-[#8E8E93] focus:outline-none focus:ring-0 focus:border-primary w-full h-[40px] px-2 py-0.5",
        className
      )}
      type="text"
      {...props}
    />
  );
};

export default Input;
