"use client";

import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
     
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/faculdades">Atividades</Nav.Link>
            <Nav.Link href="/cursos">Clientes</Nav.Link>
            <Nav.Link href="/disciplinas">Lucas Gym</Nav.Link>
            <Nav.Link href="/professores">Personais</Nav.Link>
            <Nav.Link href="/alunos">Unidades</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    
      <div className="bg-secondary text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

     
      <Container className="mt-2">{children}</Container>
    </>
  );
}
