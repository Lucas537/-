"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import { useState, useEffect } from "react";

export default function AtividadesFormPage(props) {
  const router = useRouter();

  
  const [atividades, setAtividades] = useState(JSON.parse(localStorage.getItem("atividades")) || []);
  const id = props.searchParams.id;
  const atividadesEditada = atividades.find((item) => item.id === id);

  
  function salvar(dados) {
    console.log("Dados recebidos no submit:", dados); 
    let novaListaDeatividades;
    if (atividadesEditada) {
      novaListaDeatividades = atividades.map((item) =>
        item.id === atividadesEditada.id ? { ...item, ...dados } : item
      );
    } else {
      dados.id = v4(); 
      novaListaDeatividades = [...atividades, dados]; 
    }

    
    setAtividades(novaListaDeatividades);
    
    localStorage.setItem("atividades", JSON.stringify(novaListaDeatividades));

    // Exibir no console para confirmar
    console.log('Nova lista de atividades:', novaListaDeatividades);

    alert("Atividade cadastrada com sucesso!");
    router.push("/atividades"); // Redireciona para a lista de atividades
  }

  // Lista de Unidades
  const listaUnidades = [
    "Asa Norte",
    "Águas Claras",
    "Taguatinga",
    "Ceilândia",
  ];

  const listaatividades = [
    "Artes Marciais",
    "FitDance",
    "Treino Acadêmico",
    "Funcional",
  ];

  // Campos do formulário e valores iniciais (default)
  const initialValues = {
    nome: "",
    descricao: "",
    unidade: "",
    valor: "",
    status: "",
    atividades: "",
    opiniaoCliente: "", // Adicionando o campo de opinião
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    unidade: Yup.string().required("Campo obrigatório"),
    valor: Yup.number()
      .min(1, "Valor inválido")
      .max(250, "Valor inválido")
      .required("Campo obrigatório"),
    atividades: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de atividades"}>
      <Formik
        initialValues={atividadesEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,   // Aqui estamos pegando o estado de validação do Formik
          isSubmitting,  // Verifica se o envio está em andamento
        }) => (
          <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
            {/* Campos do formulário */}
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Unidade:</Form.Label>
                <Form.Select
                  name="unidade"
                  value={values.unidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.unidade && !errors.unidade}
                  isInvalid={touched.unidade && errors.unidade}
                >
                  <option value="">Selecione</option>
                  {listaUnidades.map((unidade) => (
                    <option key={unidade} value={unidade}>
                      {unidade}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.unidade}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group as={Col}>
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                name="nome"
                type="text"
                placeholder="Nome Completo"
                style={{ textTransform: "capitalize" }}
                value={values.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.nome && !errors.nome}
                isInvalid={touched.nome && errors.nome}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nome}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Restante dos campos */}
            <Form.Group as={Col}>
              <Form.Label>Status:</Form.Label>
              <Form.Select
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.status && !errors.status}
                isInvalid={touched.status && errors.status}
              >
                <option value="">Selecione</option>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Noturno">Noturno</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.status}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Atividades:</Form.Label>
              <Form.Select
                name="atividades"
                value={values.atividades}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.atividades && !errors.atividades}
                isInvalid={touched.atividades && errors.atividades}
              >
                <option value="">Selecione</option>
                {listaatividades.map((atividades) => (
                  <option key={atividades} value={atividades}>
                    {atividades}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.atividades}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Opiniões de Clientes:</Form.Label>
              <Form.Control
                name="opiniaoCliente"
                type="text"
                placeholder="Opiniões de Clientes"
                style={{ textTransform: "capitalize" }}
                value={values.opiniaoCliente}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.opiniaoCliente && !errors.opiniaoCliente}
                isInvalid={touched.opiniaoCliente && errors.opiniaoCliente}
              />
              <Form.Control.Feedback type="invalid">
                {errors.opiniaoCliente}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="text-end">
              <Button className="me-2" href="/atividades">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>
            </Form.Group>
          </Form>
            
        )}
      </Formik>
    </Pagina>
  );
}