"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function atividadesPage() {
  const [atividades, setatividades] = useState([]);

  useEffect(() => {
    const atividadesLocalStorage = JSON.parse(localStorage.getItem("atividades")) || [];
    setatividades(atividadesLocalStorage);
  }, []);

  const excluir = (aluno) => {
    if (window.confirm(`Deseja realmente excluir o atividades ${atividades.nome}?`)) {
      const novaLista = atividades.filter((item) => item.id !== atividades.id);
      localStorage.setItem("atividades", JSON.stringify(novaLista));
      setatividades(novaLista);
      alert("atividades excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo={"Lista de atividades"}>
      <div className="text-end mb-2">
        <Button href="/atividades/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Matricula</th>            <th>Nome</th>
              <th>Faculdade</th>
            <th>Curso</th>
            <th>Periodo</th>
          </tr>
        </thead>
        <tbody>
          {atividades.map((atividades) => (
            <tr key={atividades.id}>
              <td>{atividades.nome}</td>
              <td>{atividades.sobrenome}</td>
              <td>{atividades.email}</td>
              <td>{atividades.faculdade}</td>
              <td>{atividades.curso}</td>              <td className="text-center">
                <Button className="me-2" href={`/atividades/form?id=${atividades.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(atividades)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
