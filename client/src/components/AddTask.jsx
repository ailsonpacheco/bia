import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";
import Modal from "./Modal";

registerLocale("pt-BR", ptBR);

const AddTask = ({ onAdd }) => {
  const [titulo, setTitulo] = useState("");
  const [dia, setDia] = useState(null);
  const [importante, setImportante] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setShowModal(true);
      return;
    }

    // Formata a data usando os componentes locais (getDate/getMonth/getFullYear)
    // para evitar o desvio de 1 dia (off-by-one) causado por conversao UTC.
    const formatDateToString = (date) => {
      const d = date || new Date();
      const dia = String(d.getDate()).padStart(2, "0");
      const mes = String(d.getMonth() + 1).padStart(2, "0");
      const ano = d.getFullYear();
      return `${dia}/${mes}/${ano}`;
    };

    onAdd({ 
      titulo: titulo.trim(), 
      dia_atividade: formatDateToString(dia), 
      importante 
    });

    setTitulo("");
    setDia(null);
    setImportante(true);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Tarefa</label>
        <input
          type="text"
          placeholder="O que você precisa fazer?"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      
      <div className="form-control">
        <label>Data/Prazo</label>
        <DatePicker
          selected={dia}
          onChange={(date) => setDia(date)}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          placeholderText="Quando?"
          isClearable
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={15}
          className="datepicker-input"
          calendarClassName="datepicker-calendar"
        />
      </div>
      
      <div className="form-control-check">
        <input
          type="checkbox"
          id="importante"
          checked={importante}
          onChange={(e) => setImportante(e.target.checked)}
        />
        <label htmlFor="importante">Importante</label>
      </div>
      
      <button type="submit" className="btn btn-block success">
        Adicionar Task com  CICD V1
      </button>
      
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Campo obrigatório"
        message="Por favor, adicione uma descrição para a tarefa"
        type="warning"
      />
    </form>
  );
};

export default AddTask;
