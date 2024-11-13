"use client";
import '../../banner.css'
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import ReactInputMask from "react-input-mask";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function personaiseFormPage(props) {
  // router -> hook para navegação de telas
  const router = useRouter();

  // Busca a lista de personaises para usar no select
  const personais = JSON.parse(localStorage.getItem("personaises")) || [];

  // Buscar a lista de personais no localStorage, se não existir, inicializa uma lista vazia
  const personaises = JSON.parse(localStorage.getItem("personaises")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  // Buscar na lista a personais com o ID recebido no parametro
  const personaisEditado = personais.find((item) => item.id == id);
  console.log(personaisEditado);

  // função para salvar os dados do form
  function salvar(dados) {
    // Se personaisEditado existe, mudar os dados e gravar no localStorage
    if (personaisEditado) {
      Object.assign(personaisEditado, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("personaises", JSON.stringify(personaises));
    } else {
      // se Editado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4();
      // Adiciona o novo personal na lista 
      personaises.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("personaises", JSON.stringify(personaises));
    }

    alert("Personais criado com sucesso!");
    router.push("/personais");
  }

  

  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: "",
    idade: "",
    area: "",
    email: "",
    telefone: "",
    endereço: "",
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
    personais: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de personais"}>
      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de personaisEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={personaisEditado || initialValues}
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
                    <Form.Label>Nome Completo:</Form.Label>
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
                    <Form.Label>Especalidade</Form.Label>
                    <Form.Control
                      name="Especialidade"
                      type="text"
                      value={values.especialidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.especialidade && !errors.especialidade}
                      isInvalid={touched.especialidade && errors.especialidade}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.especialidade}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

              
            
                <Row className="mb-2"> <Form.Group as={Col}>
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
           

                <Row className="mb-2"> <Form.Group as={Col}>
                    <Form.Label>Turno:</Form.Label>
                    <Form.Select
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.status && !errors.status}
                      isInvalid={touched.status && errors.status}
                    >
                      <option value="">Turno</option>
                      <option value="Matutino">Matutino</option>
                      <option value="Vespertino">Vespertino</option>
                      <option value="Noturno">Noturno</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row className="mb-2">

              

              </Row>
                  
                </Row>

                {/* botões */}
                <Form.Group className="text-end">
                  <Button className="me-2" href="/personais">
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