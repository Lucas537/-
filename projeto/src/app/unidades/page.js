"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function UnidadesPage() {
  const [unidades, setUnidades] = useState([]);

  // Carrega as disciplinas quando a tela é acessada
  useEffect(() => {
    // Busca as disciplinas do localStorage, se não existir, inicia uma lista vazia
    const unidadesLocalStorage = JSON.parse(localStorage.getItem("unidades")) || [];
    setUnidades(unidadesLocalStorage);
    console.log(unidadesLocalStorage);
  }, []);

  // Função para exclusão de uma disciplina
  function excluir(unidades) {
    if (window.confirm(`Deseja realmente excluir a unidades ${unidades.nome}?`)) {
      const novaLista = unidades.filter((item) => item.id !== unidades.id);
      localStorage.setItem("unidades", JSON.stringify(novaLista));
      setUnidades(novaLista);
      alert("unidades excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Unidades"}>
      <div className="text-end mb-2">
        <Button href="/unidades/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com as Disciplinas */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Curso</th>
            <th>Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {unidades.map((unidades) => (
            <tr key={unidades.id}>
              <td>{unidades.nome}</td>
              <td>{unidades.descricao}</td>
              <td>{unidades.status}</td>
              <td>{unidades.curso}</td>
              <td>{unidades.professor}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button className="me-2" href={`/unidades/form?id=${unidades.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(unidades)}>
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
