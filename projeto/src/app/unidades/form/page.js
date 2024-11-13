"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row, InputGroup } from "react-bootstrap";
import { FaArrowLeft, FaCheck, FaMapMarkerAlt } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import  InputMask  from "react-input-mask";

export default function unidadesFormPage(props) {
  const router = useRouter();

  const unidades = JSON.parse(localStorage.getItem("unidades")) || [];
  const id = props.searchParams.id;
  const unidadesEditado = unidades.find((item) => item.id === id);

  // função para salvar os dados do form
  function salvar(dados) {
    // Se unidadesEditado existe, mudar os dados e gravar no localStorage
    if (unidadesEditado) {
      Object.assign(unidadesEditado, dados);
      localStorage.setItem("unidades", JSON.stringify(unidades));
    } else {
      // se unidadesEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4();
      // Adiciona a nova unidades na lista de unidades
      unidades.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("unidades", JSON.stringify(unidades));
    }

    alert("Unidades salvo com sucesso!");
    router.push("/unidades");
  }



  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: "",
    endereco: "",
    cep: "",
    Telefone: "",
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
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Unidades"}>
      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de unidadesEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={unidadesEditado || initialValues}
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome da Unidade:</Form.Label>
                <Form.Control
                  name="unidade"
                  type="text"
                  placeholder="Digite a unidade"
                  style={{ textTransform: "capitalize" }}
                  value={values.unidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.unidade && !errors.unidade}
                  isInvalid={touched.unidade && errors.unidade}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.unidade}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  name="endereço"
                  type="text"
                  placeholder="Digite o endereço"
                  value={values.endereço}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.endereço && !errors.endereço}
                  isInvalid={touched.endereço && errors.endereço}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.endereço}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>CEP:</Form.Label>
                <InputGroup>
                  <InputMask
                    mask="99999-999"
                    name="cep"
                    placeholder="00000-000"
                    value={values.cep}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${
                      touched.cep && errors.cep ? "is-invalid" : ""
                    }`}
                  />
                  <InputGroup.Text>
                    <FaMapMarkerAlt />
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.cep}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              </Row>

              <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <InputGroup>
                  <InputMask
                    mask="9999-9999"
                    name="Telefone"
                    placeholder="(00) 0000-0000"
                    value={values.telefone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${
                      touched.telefone && errors.telefone ? "is-invalid" : ""
                    }`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.telefone}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              </Row>
            <Form.Group className="text-end">
              <Button className="me-2" href="/unidades">
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
