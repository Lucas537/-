"use client";
import '../../banner.css'
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row, InputGroup } from "react-bootstrap";
import { FaArrowLeft, FaCheck, FaMapMarkerAlt } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function ClienteFormPage(props) {
  const router = useRouter();

  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const id = props.searchParams.id;
  const clienteEditado = clientes.find((item) => item.id === id);

  function salvar(dados) {
    if (clienteEditado) {
      Object.assign(clienteEditado, dados);
      localStorage.setItem("clientes", JSON.stringify(clientes));
    } else {
      dados.id = v4();
      clientes.push(dados);
      localStorage.setItem("clientes", JSON.stringify(clientes));
    }
    alert("Cliente salvo com sucesso!");
    router.push("/clientes");
  }

  const initialValues = {
    nome: "",
    endereco: "",
    cpf: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string()
      .matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, "CPF inválido")
      .required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Cliente"}>
      <Formik
        initialValues={clienteEditado || initialValues}
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

              <Form.Group as={Col}>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  name="endereco"
                  type="text"
                  placeholder="Digite o endereço"
                  value={values.endereco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.endereco && !errors.endereco}
                  isInvalid={touched.endereco && errors.endereco}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.endereco}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

              <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>CPF:</Form.Label>
                <InputMask
                  mask="999.999.999-99"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${
                    touched.cpf && errors.cpf ? "is-invalid" : ""
                  }`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cpf}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Exemplo@email.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/clientes">
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
