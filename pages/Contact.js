import Navigation from "../components/Navigation";
import styled from "styled-components";

const Title = styled.h1`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Contact({ categories }) {
  return (
    <div>
      <Navigation categories={categories} />
      <Title>Get In Touch Page</Title>
    </div>
  );
}
