import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f2f5;
  color: #333;
`;

export const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 2px solid #ddd;
  flex-wrap: wrap;
  width: 80%;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 0;
  text-align: right;
  @media (max-width: 600px) {
    text-align: left;
    margin-top: 10px;
  }
`;
