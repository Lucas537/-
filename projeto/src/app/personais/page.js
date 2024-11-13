"use client";
import '../banner.css'
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function personaisPage() {
  const [personais, setpersonais] = useState([]);
  useEffect(() => {
    const personaisLocalStorage = JSON.parse(localStorage.getItem("personais")) || [];
    setpersonais(personaisLocalStorage);
  }, []);

  const excluir = (aluno) => {
    if (window.confirm(`Deseja realmente excluir o  ${personais.nome}?`)) {
      const novaLista = personais.filter((item) => item.id !== personais.id);
      localStorage.setItem("personais", JSON.stringify(novaLista));
      setpersonais(novaLista);
      alert("Personais excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo={"Lista de personais"}>
      <div className="text-end mb-2">
        <Button href="/personais/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>
      
          <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Especialidade</th>
            <th>Endereço</th>
            <th>Periodo</th>
          </tr>
        </thead>
        <tbody>
          {personais.map((personais) => (
            <tr key={personais.id}>
              <td>{personais.foto}</td>
              <td>{personais.nome}</td>
              <td>{personais.especialidade}</td>
              <td>{personais.periodo}</td>
              <td className="text-center">
                <Button className="me-2" href={`/personais/form?id=${personais.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(personais)}>
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
