"use client";
import "./banner.css";
import Pagina from "@/components/Pagina";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function HomePage() {
  const atividades = JSON.parse(localStorage.getItem("Atividades")) || [];
  const cursos = JSON.parse(localStorage.getItem("Clientes")) || [];
  const professores = JSON.parse(localStorage.getItem("Lucas Gym")) || [];
  const disciplinas = JSON.parse(localStorage.getItem("Personais")) || [];
  const alunos = JSON.parse(localStorage.getItem("Unidades")) || [];

  const lista = [
    {
      nome: "Atividades",
      imagem:
        "https://pratiquefitness.com.br/wp-content/uploads/2017/12/quais-sao-as-atividades-de-academia-mais-procuradas-e-por-que.jpg",
      quantidade: atividades.length,
      link: "/atividades",
    },
    {
      nome: "Clientes",
      imagem:
        "https://blog.wehelpsoftware.com/wp-content/uploads/2021/03/como-oferecer-qualidade-no-atendimento-em-academias-blog-wehelp-770x515.jpg",
      quantidade: cursos.length,
      link: "/clientes",
    },
    {
      nome: "Lucas Gym",
      imagem:
        "https://blog.sistemapacto.com.br/wp-content/uploads/2022/04/Blog-650x350-segunda-1280x720-1-1160x680.webp",
      quantidade: professores.length,
      link: "/lucasgym",
    },
    {
      nome: "Personais",
      imagem:
        "https://www.academiaatlantis.com.br/aula-de-natacao/imagens/musculacao-com-personal.jpg",
      quantidade: disciplinas.length,
      link: "/personais",
    },
    {
      nome: "Unidades",
      imagem:
        "https://natalemfoco.com.br/wp-content/uploads/2023/07/selfit-academia-sao-goncalo.jpg",
      quantidade: alunos.length,
      link: "/unidades",
    },
  ];

  return (
    <Pagina titulo={""}>
      <header className="banner">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYeebKAAh_h2gRH7F6kbH0_4Njx0s6HaO78w&s" alt="O banner Principal da página"/>
            </header>
      <Row md={4}>
        {lista.map((item) => (
          <Col className="py-2">
            <Card style={{ height: "100%" }}>
              <Card.Img src={item.imagem} style={{ height: "100%" }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className="text-end">
                <Button href={item.link}>Verificar</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
