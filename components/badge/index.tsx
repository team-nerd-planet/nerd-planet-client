import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, type PropsWithChildren } from "react";

type BadgeProps = PropsWithChildren<{
  active?: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Badge = ({ children, active, className, ...props }: BadgeProps) => {
  return (
    <button
      className={cn(
        "flex center rounded-[30px] border border-border w-fit text-xs px-5 py-[10px] font-semibold",
        active
          ? "bg-[#93EBFF] text-background"
          : "bg-background text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Badge;
