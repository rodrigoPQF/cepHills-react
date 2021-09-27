import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Cep(props) {
  const [data, setData] = useState(null);
  const [dataE, setDataE] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.lazy) return;
    getCep();
  }, [props.lazy]);

  function cont(i) {
    setInterval(function run() {
      if (i === 20) {
        setError(false);
        clearTimeout(run);
      }
      i++;
    }, 100);
  }
  function getEnd() {
    if (props.uf === "" || props.city === "" || props.log === "") {
      return alert("Insira os dados corretamente");
    }
    fetch(
      `https://viacep.com.br/ws/${props.uf}/${props.city}/${props.log}/json/`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.erro === true || data[0] === undefined) {
          setError(true);
          let i = 1;
          cont(i);
        } else {
          for (let j = 0; j < data.length; j++) {
            if (data[j].bairro === "") {
              let i = 1;
              cont(i);
              return setError(true);
            }
          }
          setDataE(data);
          setError(false);
          let i = 1;
          setInterval(function run() {
            if (i === 20) {
              setError(false);
              clearTimeout(run);
            }
            i++;
          }, 100);
        }

        props.onSucess(data);
      })
      .catch((err) => {
        setError(true);
        let i = 1;
        setInterval(function run() {
          if (i === 20) {
            setError(false);
            clearTimeout(run);
          }
          i++;
        }, 100);

        console.log(err);
      })
      .finally(() => setLoading(false));
  }
  function getCep() {
    if (props.cep === "" || null) {
      return alert("Insira um cep");
    }
    fetch(`https://viacep.com.br/ws/${props.cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro === true) {
          setError(true);
          let i = 1;
          setInterval(function run() {
            if (i === 20) {
              setError(false);
              clearTimeout(run);
            }
            i++;
          }, 100);
        } else {
          setData(data);
          setError(false);
        }
        props.onSucess(data);
      })
      .catch((err) => {
        setError(true);
        let i = 1;
        setInterval(function run() {
          if (i === 20) {
            setError(false);
            clearTimeout(run);
          }
          i++;
        }, 100);
      })
      .finally(() => setLoading(false));
  }
  return props.children({
    loading,
    data,
    dataE,
    error,
    fetch: getCep,
    fetched: getEnd,
  });
}

Cep.propTypes = {
  cep: PropTypes.string.isRequired,
  onSucess: PropTypes.func,
  lazy: PropTypes.bool,
  uf: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  log: PropTypes.string.isRequired,
};

export default Cep;
