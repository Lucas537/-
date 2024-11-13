"use client"; 
import './banner.css';  // Certifique-se de que o caminho está correto
import Pagina from "@/components/Pagina";
import { Button, Card, Col, Row, Carousel } from "react-bootstrap";

export default function HomePage() {
  let atividades = [];
  let clientes = [];
  let lucasgym = [];
  let personais = [];
  let unidades = [];

  try {
    atividades = JSON.parse(localStorage.getItem("Atividades")) || [];
    clientes = JSON.parse(localStorage.getItem("Clientes")) || [];
    lucasgym = JSON.parse(localStorage.getItem("Lucas Gym")) || [];
    personais = JSON.parse(localStorage.getItem("Personais")) || [];
    unidades = JSON.parse(localStorage.getItem("Unidades")) || [];
  } catch (error) {
    console.error("Erro ao acessar localStorage:", error);
  }

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
      quantidade: clientes.length,
      link: "/clientes",
    },
    {
      nome: "Lucas Gym",
      imagem:
        "https://blog.sistemapacto.com.br/wp-content/uploads/2022/04/Blog-650x350-segunda-1280x720-1-1160x680.webp",
      quantidade: lucasgym.length,
      link: "/lucasgym",
    },
    {
      nome: "Personais",
      imagem:
        "https://www.academiaatlantis.com.br/aula-de-natacao/imagens/musculacao-com-personal.jpg",
      quantidade: personais.length,
      link: "/personais",
    },
    {
      nome: "Unidades",
      imagem:
        "https://natalemfoco.com.br/wp-content/uploads/2023/07/selfit-academia-sao-goncalo.jpg",
      quantidade: unidades.length,
      link: "/unidades",
    },
  ];

  return (
    <Pagina titulo={""}>
      {/* Carrossel de Imagens */}
      <Carousel className="mb-4 custom-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100 custom-carousel-image"
            src="https://blog.nextfit.com.br/wp-content/uploads/2023/07/academia-para-mulheres-1.png"
            alt="Primeira Imagem"
          />
          <Carousel.Caption>
            <h3>Bem-vindo à Lucas Gym</h3>
            <p>Transforme seu corpo, mude sua vida.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 custom-carousel-image"
            src="https://saude.sesisc.org.br/wp-content/uploads/sites/13/2023/09/Beneficios-de-fazer-academia-Para-sua-saude-e-seu-corpo-2048x1365.jpg"
            alt="Segunda Imagem"
          />
          <Carousel.Caption>
            <h3>Treine com os melhores</h3>
            <p>Alcance seus objetivos com a ajuda de profissionais qualificados.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 custom-carousel-image"
            src="https://www.lagoadapampulha.com.br/wp-content/uploads/2022/07/Top-60-Melhores-Academias-em-Belo-Horizonte-1024x683.webp"
            alt="Terceira Imagem"
          />
          <Carousel.Caption>
            <h3>Atividades Diversificadas</h3>
            <p>Oferecemos uma ampla gama de atividades físicas para todos os níveis.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Row md={4}>
        {lista.map((item) => (
          <Col className="py-2" key={item.nome}>
            <Card style={{ height: "100%" }}>
              <Card.Img
                src={item.imagem}
                style={{ height: "100%" }}
                alt={item.nome}
              />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className="text-end">
                <Button className="btn-custom" href={item.link}>Verificar</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
