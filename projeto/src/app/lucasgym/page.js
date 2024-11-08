"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function gymPage() {
  const [gym, setgym] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const gymLocalStorage =
      JSON.parse(localStorage.getItem("Gym")) || [];
    // guarda a lista no estado faculdades
    setgym(gymLocalStorage);
    console.log(gymLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(gym) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(`Deseja realmente excluir a gym ${gym.nome}?`)
    ) {
      // filtra a lista antiga removando a faculdade recebida
      const novaLista = gym.filter((item) => item.id !== gym.id);
      // grava no localStorage a nova lista
      localStorage.setItem("gym", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setgym(novaLista);
      alert("Gym excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de GYM"}>
      <div className="text-end mb-2">
        <Button href="/lucasgym/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com as gym */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>País</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {gym.map((gym) => {
            return (
              <tr>
                <td>{gym.nome}</td>
                <td>{gym.endereco}</td>
                <td>{gym.pais}</td>
                <td>{gym.estado}</td>
                <td>{gym.cidade}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/lucasgym/form?id=${gym.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(gym)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
