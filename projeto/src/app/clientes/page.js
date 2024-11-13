"use client";
import '../banner.css'
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);

  // Carrega os dados dos clientes do localStorage quando a tela é carregada
  useEffect(() => {
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || [];
    setClientes(clientesLocalStorage);
  }, []);

  // Função para exclusão de um cliente
  function excluir(cliente) {
    if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`)) {
      const novaLista = clientes.filter((item) => item.id !== cliente.id);
      localStorage.setItem("clientes", JSON.stringify(novaLista));
      setClientes(novaLista);
      alert("Cliente excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo="Lista de Clientes">
      <div className="text-end mb-2">
        <Button href="/clientes/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os Clientes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>CPF</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.email}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button className="me-2" href={`/clientes/form?id=${cliente.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(cliente)}>
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
