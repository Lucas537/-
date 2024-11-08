"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function clientesPage() {
  const [clientes, setclientes] = useState([]);

  useEffect(() => {
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || [];
    setclientes(clientesLocalStorage);
  }, []);

  const excluir = (aluno) => {
    if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`)) {
      const novaLista = clientes.filter((item) => item.id !== cliente.id);
      localStorage.setItem("clientes", JSON.stringify(novaLista));
      setclientes(novaLista);
      alert("Cliente excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo={"Lista de clientes"}>
      <div className="text-end mb-2">
        <Button href="/clientes/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Matricula</th>
            <th>Nome</th>
            <th>Faculdade</th>
            <th>Curso</th>
            <th>Periodo</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((clientes) => (
            <tr key={clientes.id}>
              <td>{clientes.nome}</td>
              <td>{clientes.sobrenome}</td>
              <td>{clientes.email}</td>
              <td>{clientes.faculdade}</td>
              <td>{clientes.curso}</td>
              <td className="text-center">
                <Button className="me-2" href={`/clientes/form?id=${clientes.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(clientes)}>
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
