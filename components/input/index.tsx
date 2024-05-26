import { cn } from "lib/utils";
import { type InputHTMLAttributes } from "react";

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "border border-border rounded-[5px] bg-background text-xs font-semibold indent-2",
        className
      )}
      type="text"
      {...props}
    />
  );
};

export default Input;
