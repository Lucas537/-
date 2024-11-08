"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function trabalhoFormPage(props) {
  // router -> hook para navegação de telas
  const router = useRouter();

  // Busca a lista de trabalhos para usar no select
  const unidades= JSON.parse(localStorage.getItem("unidades")) || [];

  // Buscar a lista de trabalhos no localStorage, se não existir, inicializa uma lista vazia
  const unidadess = JSON.parse(localStorage.getItem("unidades")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  // Buscar na lista a trabalho com o ID recebido no parametro
  const unidadesEditado = unidades.find((item) => item.id == id);
  console.log(unidadesEditado);

  // função para salvar os dados do form
  function salvar(dados) {
    // Se trabalhoEditado existe, mudar os dados e gravar no localStorage
    if (unidadesEditado) {
      Object.assign(trabalhoEditado, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("unidades", JSON.stringify(unidades));
    } else {
      // se trabalhoEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4();
      // Adiciona a nova trabalho na lista de unidades
      unidades.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("unidades", JSON.stringify(unidades));
    }

    alert("trabalho criado com sucesso!");
    router.push("/unidades");
  }

  

  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: "",
    carro: "",
    area: "",
    nota: "",
    status: "",
    trabalho: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    carro: Yup.string().required("Campo obrigatório"),
    area: Yup.string().required("Campo obrigatório"),
    nota: Yup.number()
      .min(1, "Nota inválida")
      .max(5, "Nota inválida")
      .required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    unidades: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de unidades"}>
      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de trabalhoEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={unidadesEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            // ações do formulário
            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})

            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Mecanico:</Form.Label>
                    <Form.Control
                      name="nome"
                      type="text"
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

                  <Form.Group as={Col}>
                    <Form.Label>carro:</Form.Label>
                    <Form.Control
                      name="carro"
                      type="text"
                      value={values.carro}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.carro && !errors.carro}
                      isInvalid={touched.carro && errors.carro}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.carro}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
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
                      <option value="mecanica">Mecanica</option>
                      <option value="Lanternagen">Lanternagen</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>

                  
                </Row>

                {/* botões */}
                <Form.Group className="text-end">
                  <Button className="me-2" href="/trabalhos">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button type="submit" variant="success">
                    <FaCheck /> Enviar
                  </Button>
                </Form.Group>
              </Form>
            );
          }
        }
      </Formik>
    </Pagina>
  );
}