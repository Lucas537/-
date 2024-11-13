"use client";
import '../banner.css'
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function lucasgymPage() {
  const [lucasgym, setlucasgyms] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const lucasgymsLocalStorage =
      JSON.parse(localStorage.getItem("lucasgym")) || [];
    // guarda a lista no estado 
    setlucasgyms(lucasgymsLocalStorage);
    console.log(lucasgymsLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(lucasgym) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(`Deseja realmente excluir a gym ${lucasgym.lucasgym}?`)
    ) {
      // filtra a lista antiga removando a faculdade recebida
      const novaLista = lucasgym.filter((item) => item.id !== lucasgym.id);
      // grava no localStorage a nova lista
      localStorage.setItem("lucasgym", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setlucasgyms(novaLista);
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
          {lucasgym.map((lucasgym) => {
            return (
              <tr key={lucasgym.id}>
                <td>{lucasgym.nome}</td>
                <td>{lucasgym.endereco}</td>
                <td>{lucasgym.pais}</td>
                <td>{lucasgym.estado}</td>
                <td>{lucasgym.cidade}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/lucasgym/form?id=${lucasgym.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(lucasgym)}>
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
