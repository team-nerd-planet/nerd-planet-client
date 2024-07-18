"use client";

import styled from "@emotion/styled";
import { companyList } from "@/constants/company";

const CollectionPage = () => {
  return (
    <Container>
      <Grid>
        {companyList.map((post, index) => {
          return (
            <Item key={index}>
              <Title>{post.companyName}</Title>
            </Item>
          );
        })}
      </Grid>
    </Container>
  );
};
export default CollectionPage;

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 790px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    height: 100%;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    height: 100%;
  }
`;

// Item을 클릭하면 뱅그그그 도는거 추가하기
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: #26272b;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease-in-out all 0s;
  gap: 10px;

  animation: fadeIn 0.5s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;
`;
