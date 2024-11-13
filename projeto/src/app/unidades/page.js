"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function UnidadesPage() {
  const [unidades, setUnidades] = useState([]);

  // Carrega as unidades quando a tela é acessada
  useEffect(() => {
    // Busca as unidades do localStorage, se não existir, inicia uma lista vazia
    const unidadesLocalStorage = JSON.parse(localStorage.getItem("unidades")) || [];
    setUnidades(unidadesLocalStorage);
    console.log(unidadesLocalStorage);
  }, []);

  // Função para exclusão de uma unidade
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

  
      
          {/* Tabela com as unidades */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>CEP</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {unidades.map((unidades) => (
            <tr key={unidades.id}>
              <td>{unidades.nome}</td>
              <td>{unidades.endereço}</td>
              <td>{unidades.cep}</td>
              <td>{unidades.telefone}</td>
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
