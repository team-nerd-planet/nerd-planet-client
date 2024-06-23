"use client";

import styled from "@emotion/styled";
import Image from "next/image";

const RushPage = () => {
  return (
    <Container>
      <Content>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Image
            src={
              "https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/c128208d-c3ff-488f-93d7-4ba3ce866c00/public"
            }
            alt="mail"
            width={64}
            height={64}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#f8f9fe",
              }}
            >
              러쉬는 준비중이에요!
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#f8f9fe",
              }}
            >
              너드플래닛의 숏폼 서비스인 러쉬를 기대해주세요!
            </div>
          </div>
        </div>
      </Content>
    </Container>
  );
};
export default RushPage;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 20px 20px;
  gap: 40px;
`;

const Content = styled.div`
  background-color: #1c1c20;
  padding: 36px 24px;
  width: 400px;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 100px;
  color: #f8f9fe;
  position: relative;
`;
