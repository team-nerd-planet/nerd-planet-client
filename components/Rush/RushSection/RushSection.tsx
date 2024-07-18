import styled from "@emotion/styled";
import { forwardRef } from "react";

type RushActionsProps = {
  children: React.ReactNode;
  onRushAction: (rush: { name: string; description: string }) => void;
};

const RushSection = forwardRef<HTMLDivElement, RushActionsProps>(
  ({ children, onRushAction }, ref) => {
    return (
      <Section
        ref={ref}
        onClick={() =>
          onRushAction({
            name: "후기 서비스 AWS Opensearch 도입기",
            description: "위기에서 기회를 만들어 낸 후기 서비스 이야기",
          })
        }
      >
        {children}
      </Section>
    );
  }
);

RushSection.displayName = "RushActions";

export default RushSection;

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  scroll-snap-align: center;
  height: calc(100vh - 64px);
`;
