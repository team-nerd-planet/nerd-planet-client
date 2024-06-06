import { type ElementType, type PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";

type InvisibleProps = PropsWithChildren<{
  className?: string;
  as?: ElementType;
}>;

const Invisible = ({ children, className, as }: InvisibleProps) => {
  const [ref, inView] = useInView();
  const Comp = as ?? "div";

  return (
    <Comp ref={ref} className={className}>
      {inView ? children : null}
    </Comp>
  );
};

export default Invisible;
