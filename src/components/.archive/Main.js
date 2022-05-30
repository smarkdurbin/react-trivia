import { Container } from "@chakra-ui/react";

const Main = ({ children }) => {
  return (
    <main className="Main">
      <Container maxWidth={"container.sm"} py={8}>
        {children}
      </Container>
    </main>
  );
};

export default Main;
