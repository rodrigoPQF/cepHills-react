import "./data.css";

function Data(props) {
  return (
    <div>
      <div className="container">
        <ul className="w3-ul w3-card-4r">
          <li className="w3-green">
            <h2>Informação:</h2>
          </li>
          <li>
            <span>CEP: </span>
            {props.cep}
          </li>
          <li>
            <span>Logadouro: </span>
            {props.logradouro}
          </li>
          <li>
            <span>Estado: </span>
            {props.uf}
          </li>
          <li>
            <span>DDD: </span>
            {props.ddd}
          </li>
          <li>
            <span>Cidade: </span>
            {props.localidade}
          </li>

          <li>
            <span>Número do IBGE: </span>
            {props.ibge}
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Data;
