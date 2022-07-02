/**
 * App.js
 */

import React from "react";
import Tabela from "./Tabela";
import Formulario from './Formulario';

var aux;

/**
 * função que efetivamente pergunta à API pelos dados dos pratos
 * CORS: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
 * Corrigir o problema:
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/
 * não esquecer: depois da criação do Proxy é necessário REINICIAR o React 
 */
async function getPratos() {

  let dados = await fetch("api/PratosAPI/");
  if (!dados.ok) {
    console.error(dados)
    throw new Error("Não foi possível aceder à API e ler os dados dos Pratos. Código: ",
      dados.status)
  }
  // exportar os dados recebidos
  return await dados.json();
}


/**
 * Insere os dados do novo prato, através da API
 * @param {*} prato 
 */
async function InserePrato(prato) {
  // criar o contentor que levará os dados para a API
  let formData = new FormData();
  formData.append("nome", prato.Nome);
  formData.append("auxPreco", prato.Preco);
  formData.append("numStock", prato.NumStock);
  formData.append("descricao", prato.Descricao);
  formData.append("uploadFotoPrato", prato.Foto);
  // entregar os dados à API
  let resposta = await fetch("api/pratosAPI/",
    {
      method: "POST",
      body: formData
    });
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error("Ocorreu um erro na adição dos dados do Prato",
      resposta.status)
  }
}

async function AtualizaPrato(prato) {
  // criar o contentor que levará os dados para a API
  let formData = new FormData();
  formData.append("nome", prato.Nome);
  formData.append("auxPreco", prato.Preco);
  formData.append("numStock", prato.NumStock);
  formData.append("descricao", prato.Descricao);
  formData.append("uploadFotoPrato", prato.Foto);
  // entregar os dados à API para a atualização
  let resposta = await fetch("api/pratosAPI/" + aux + "",
    {
      method: "PUT",
      body: formData
    });
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error("Ocorreu um erro na edição dos dados do Prato",
      resposta.status)
  }
}

async function EditaPrato(idPrato){
  //ir à API buscar os dados do prato
  let resposta = await fetch("api/PratosAPI/" + idPrato,
    {
      method: "GET"
    });
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error("Ocorreu um erro a ir buscar o prato à API",
      resposta.status)
  }
  // exportar os dados recebidos
  return await resposta.json();
}



async function ApagaPrato(idPrato) {
  // criar o contentor que levará os dados para a API
  let formData = new FormData();
  formData.append("id", idPrato);
  // entregar os dados à API
  let resposta = await fetch("api/PratosAPI/" + idPrato,
    {
      method: "DELETE",
      body: formData
    });
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error("Ocorreu um erro na eliminação dos dados do Prato",
      resposta.status)
  }
}

class App extends React.Component {

  state = {
    // esta lista de pratos há-de receber dados da API
    pratos: [],
    prato: {}
  }
  

  /**
   * Esta função funciona como um 'startup'
   * Qd o componente é montado, o seu código é executado
   */
  componentDidMount() {
    this.LoadPratos();
  }

  async LoadPratos() {
    /**
     * Tarefas:
     * 1. ler os dados dos Pratos, da API
     * 2. transferir esses dados para o State
     */
    try {
      // 1.
      let dadosDosPratos = await getPratos();
      // 2.
      this.setState({ pratos: dadosDosPratos })
    } catch (erro) {
      console.error("Aconteceu um erro no acesso aos dados dos pratos. ", erro)
    }
  }


  /**
   * enviar os dados para a API
   * @param {*} prato 
   */
  handleNovoPrato = async (prato) => {
    try {
      // exporta os dados para a API
      await InserePrato(prato);
      // recarregar a Tabela com os dados dos pratos
      this.LoadPratos();
    } catch (error) {
      console.error("ocorreu um erro com a adição do prato (" + prato.Nome + ")")
    }
  }

  /**
   * enviar os dados para a API, atualizando o prato
   * @param {*} prato 
   */
  handleEditPrato = async (prato) => {
    try {
      // exporta os dados para a API
      await AtualizaPrato(prato);
      // recarregar a Tabela com os dados dos pratos
      this.LoadPratos();
    } catch (error) {
      console.error("ocorreu um erro com a edição do prato (" + prato.Nome + ")")
    }
  }

  /**
   * recebe o ID do prato a apagar e envia esses dados para a API
   * @param {*} idPrato 
   */
  handleApagaPrato = async (idPrato) => {
    try {
      // exporta os dados para a API
      await ApagaPrato(idPrato);
      // recarregar a Tabela com os dados dos pratos
      this.LoadPratos();
    } catch (error) {
      console.error("ocorreu um erro com a eliminação do prato.")
    }
  }

  handlePratoToForm= async (idPrato) => {
  // guardar o id do prato
  aux = idPrato;
  try{
  let dadosPrato = await EditaPrato(idPrato);
    // exporta os dados para o Formulário
    this.setState({prato: dadosPrato})
  } catch (erro) {
    console.error("Aconteceu um erro no acesso aos dados do prato. ", erro)
  }
}


  render() {
    // ler os dados do STATE
    const { pratos, prato } = this.state;

    return (
      <div className="container">
        <h1>Pratos</h1>
        <h4>Novo prato:</h4>
        <Formulario pratoIN={prato} editOUT={this.handleEditPrato} pratoOUT={this.handleNovoPrato} />
        {/*            <-------          -------------->             */}

        <br />
        <h4>Lista de pratos</h4>
        <Tabela dadosPratosIN={pratos} editaPratoOUT={this.handlePratoToForm} apagaPratoOUT={this.handleApagaPrato} />

        <br /><br />
      </div>
    )
  }
}

export default App;
