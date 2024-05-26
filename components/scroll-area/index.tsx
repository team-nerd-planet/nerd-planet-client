"use client";

import { cn } from "lib/utils";
import { useEffect, type ReactElement, type ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type ScrollAreaProps = {
  className?: string;
  children: ReactElement[];
  onScrollEnd?: VoidFunction;
  ScrollEndPlaceholder?: ReactNode;
};

const ScrollArea = ({
  children,
  className,
  onScrollEnd,
  ScrollEndPlaceholder,
}: ScrollAreaProps) => {
  const [ref, inView] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    onScrollEnd?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div>
      <ul className={cn("overflow-y-auto", className)}>{children}</ul>
      <div ref={ref}>{ScrollEndPlaceholder}</div>
    </div>
  );
};

export default ScrollArea;
