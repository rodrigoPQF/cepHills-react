import React, { useState } from "react";
import Cep from "../api/api";
import Error from "../error/error";
import Loading from "../loading/loading";
import Data from "../data/data";

import InputMask from "react-input-mask";

import "./cep.css";
import Button from "../button/button";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

function CepView() {
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");
  const [log, setLog] = useState("");

  const [mess, setMess] = useState("");
  const [mess2, setMess2] = useState("");

  function handleChangeCep(evt) {
    console.log(evt.target.value);
    setCep(onlyNumbers(evt.target.value));
  }
  function handleChangeUf(evt) {
    setUf(evt.target.value);
  }
  function handleChangeCity(evt) {
    setCity(evt.target.value);
    if (!isNaN(evt.nativeEvent.data)) {
      setMess2("Opa!! Não pode inserir números na cidade");
    } else {
      setMess2("");
    }
  }
  function handleChangeLog(evt) {
    setLog(evt.target.value);
    if (!isNaN(evt.nativeEvent.data)) {
      setMess("Opa!! Não pode inserir números no logradouro");
    } else {
      setMess("");
    }
  }

  function sucessClick(cepData) {
    console.log(cepData);
  }

  return (
    <div>
      <Cep cep={cep} uf={uf} city={city} log={log} onSucess={sucessClick} lazy>
        {({ data, dataE, loading, error, fetch, fetched }) => {
          if (loading) {
            <Loading />;
          }

          if (data) {
            return (
              <>
                <Button />
                <Data
                  cep={data.cep}
                  logradouro={data.logradouro}
                  bairro={data.bairro}
                  localidade={data.localidade}
                  uf={data.uf}
                  ibge={data.ibge}
                  ddd={data.ddd}
                />
              </>
            );
          }
          if (dataE) {
            return dataE.map((cep) => (
              <div className="container">
                <Button />
                <ul key={cep.cep} className="w3-ul w3-card-4r">
                  <li className="w3-green">
                    <span>CEP: </span>
                    {cep.cep}
                  </li>
                  <li>
                    <span>Logradouro: </span>
                    {cep.logradouro}
                  </li>
                  <li>
                    <span>Bairro: </span>
                    {cep.bairro}
                  </li>
                  <li>
                    <span>Cidade: </span>
                    {cep.localidade}
                  </li>
                  <li>
                    <span>Estado: </span>
                    {cep.uf}
                  </li>
                  <li>
                    <span>Bairro: </span>
                    {cep.bairro}
                  </li>
                </ul>
              </div>
            ));
          }
          return (
            <>
              {error && <Error />}
              <div className="containerMain">
                <div className="w3-card-4">
                  <div className="w3-container w3-light-green">
                    <h2 className="w3-text-black">Buscar local </h2>
                  </div>
                  <div className="w3-container">
                    <p>
                      <label className="w3-text-light-green">
                        <b>Digite o CEP</b>
                      </label>
                      <InputMask
                        className="w3-input w3-border w3-sand"
                        mask="99.999-999"
                        placeholder="Digite o cep"
                        type="text"
                        name="first"
                        onChange={handleChangeCep}
                        value={cep}
                      ></InputMask>
                    </p>
                    <p>
                      <button className="w3-btn w3-light-green" onClick={fetch}>
                        Procurar
                      </button>
                    </p>
                  </div>
                </div>
                <div className="w3-card-4">
                  <div className="w3-container w3-light-green">
                    <h2 className="w3-text-black">Encontrar CEP</h2>
                  </div>

                  <div className="w3-container">
                    <p>
                      <label className="w3-text-light-green">
                        <b>Logradouro</b>
                      </label>
                      <input
                        className="w3-input w3-border w3-sand"
                        name="first"
                        type="text"
                        onChange={handleChangeLog}
                        value={log}
                        placeholder="Avenida Amazonas"
                      />
                      <span className="alerta">{mess}</span>
                    </p>
                    <p>
                      <label className="w3-text-light-green">
                        <b>Estado</b>
                      </label>

                      <select
                        className="w3-select l "
                        onChange={handleChangeUf}
                        name="option"
                      >
                        <option value="">Selecionar</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                      <br />
                      <label className="w3-text-light-green">
                        <b>Cidade</b>
                      </label>
                      <input
                        className="w3-input w3-border w3-sand"
                        name="last"
                        type="text"
                        onChange={handleChangeCity}
                        value={city}
                        placeholder="Digite o cidade:"
                      />
                    </p>
                    <span className="alerta">{mess2}</span>

                    <p>
                      <button
                        className="w3-btn w3-light-green"
                        onClick={fetched}
                      >
                        Pesquisar
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Cep>
    </div>
  );
}

export default CepView;
