"use client";

import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
     
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/atividades">Atividades</Nav.Link>
            <Nav.Link href="/clientes">Clientes</Nav.Link>
            <Nav.Link href="/lucasgym">Lucas Gym</Nav.Link>
            <Nav.Link href="/personais">Personais</Nav.Link>
            <Nav.Link href="/unidades">Unidades</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


     
      <Container className="mt-2">{children}</Container>
    </>
  );
}
