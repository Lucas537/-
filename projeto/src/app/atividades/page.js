"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function AtividadesPage() {  
  const [atividades, setAtividades] = useState([]);

  // Hook para buscar as atividades sempre que o componente for montado ou o localStorage mudar
  useEffect(() => {
    const atividadesLocalStorage = JSON.parse(localStorage.getItem("atividades")) || [];
    setAtividades(atividadesLocalStorage);
  }, []); // Aqui você só quer executar uma vez ao montar o componente

  // Função para excluir a atividade
  function excluir  (atividade) {
    if (window.confirm(`Deseja realmente excluir a atividade ${atividade.nome}?`)) {
      // Filtra a lista de atividades, removendo a atividade excluída
      const novaLista = atividades.filter((item) => item.id !== atividade.id);
      localStorage.setItem("atividades", JSON.stringify(novaLista));  // Atualiza o localStorage
      setAtividades(novaLista);  // Atualiza o estado com a nova lista
      alert("Atividade excluída com sucesso!");  // Mostra um alerta
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
            <th>Nome</th>
            <th>Unidade</th>
            <th>Status</th>           
            <th>Opinião do Cliente</th> 
           
          </tr>
        </thead>
        <tbody>
          {atividades.length > 0 ? (
            atividades.map((atividade) => (
              <tr key={atividade.id}>
                <td>{atividade.nome}</td>
                <td>{atividade.unidade}</td>
                <td>{atividade.status}</td>
                <td>{atividade.opiniaoCliente}</td>  {/* Verifique se o campo correto é opiniãoCliente */}
                <td>{atividade.atividades}</td>  {/* Verifique se o campo correto é atividades */}
                <td className="text-center">
                   
                    <Button className="me-2" href={`/atividades/form?id=${atividade.id}`}>
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(atividade)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Nenhuma atividade cadastrada.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Pagina>
  );
}
