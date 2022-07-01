/**
 * Formulario.js
 */

import React from "react";




class Formulario extends React.Component {

    // criar o objeto State para recolher os dados obtidos através do Formulário
    novoPrato = {
        Nome: "",
        Preco: "",
        NumStock: "",
        Descricao: "",
        Foto: null
    }

    state = this.novoPrato;

    /**
   * função para processar os dados recolhidos pelas textboxes
   * @param {*} evento : os dados recolhidos 
   */
    handleAdicao = (evento) => {
        // extrair os dados do 'evento'
        // name  -> nome da textbox
        // value -> o que o utilizador escreveu na textbox
        const { name, value } = evento.target;

        // adicionar os dados extraídos, ao state
        this.setState({
            [name]: value,
        })
    }

    /**
     * recolhe o ficheiro com a imagem definida pelo utilizador
     * e entrega-a ao state
     * @param {*} evento 
     */
    handleFotoPrato = (evento) => {
        this.setState({ Foto: evento.target.files[0] });
    }

    /**
     * ação a executar pelo React quando os dados do formulário forem submetidos
     * @param {*} evento 
     */
    handleFormSubmit = (evento) => {
    // vamos impedir o Formulário de fazer o que ele naturalmente
    // costuma fazer, para que ele depois faça o que nós queremos...
    evento.preventDefault();
    // preparar os dados para o envio
    let dadosForm={
        Nome:this.state.Nome,
        Preco:this.state.Preco,
        NumStock: this.state.NumStock,
        Descricao: this.state.Descricao,
        Foto: this.state.Foto,
    }
    // preparar os dados para exportação
    this.props.pratoOUT(dadosForm);
    }

    handleFormSubmitEdit = (evento) => {
        // vamos impedir o Formulário de fazer o que ele naturalmente
        // costuma fazer, para que ele depois faça o que nós queremos...
        evento.preventDefault();
        // preparar os dados para o envio
        let dadosEditForm={
            Nome:this.state.Nome,
            Preco:this.state.Preco,
            NumStock: this.state.NumStock,
            Descricao: this.state.Descricao,
            Foto: this.state.Foto,
        }
        // preparar os dados para exportação
        this.props.editOUT(dadosEditForm);
        }

    componentDidUpdate(prevProps){
        //só vou alterar o estado se 'props' foi atualizado
        if(prevProps !== this.props){
            //passar os dados de 'props' para o 'state'
            this.setState(
                {
                    Nome: this.props.pratoIN.nome,
                    Preco: this.props.pratoIN.preco,
                    NumStock: this.props.pratoIN.numStock,
                    Descricao: this.props.pratoIN.descricao
                    //perguntar ao stor se dá e como por a foto
                })
        }
    }    


    render() {
        // ler o conteúdo das variáveis State, dentro do Render
        const { Nome: Nome, Preco: Preco, NumStock: NumStock, Descricao: Descricao } = this.state;
        return (
            <form encType="multipart/form-data"
                method="Post">
                <input type="hidden" name="_method" value="put" />
                <div className="row">
                    <div className="col-md-4">
                        Nome: <input type="text"
                            required
                            className="form-control"
                            name="Nome"
                            value={Nome}
                            onChange={this.handleAdicao} /><br />
                        Preço: <input type="text"
                            required
                            className="form-control"
                            name="Preco"
                            value={Preco}
                            //pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                            onChange={this.handleAdicao} /><br />
                    </div>
                    <div className="col-md-4">
                        Stock: <input type="number"
                            required
                            className="form-control"
                            name="NumStock"
                            value={NumStock}
                            min="1" max="99"
                            onChange={this.handleAdicao} /><br />
                        Descrição: <input type="text"
                            required
                            className="form-control"
                            name="Descricao"
                            value={Descricao}
                            onChange={this.handleAdicao} />
                    </div>
                    <div className="col-md-4">
                        Fotografia: <input type="file"
                            required
                            name="Foto"
                            accept=".jpg,.png"
                            className="form-control"
                            onChange={this.handleFotoPrato} />
                        <br />
                        <br />
                    </div>
                </div>
                <input type="submit" value="Adicionar prato" className="btn btn-outline-primary" onClick={this.handleFormSubmit}/>
                <input type="submit" value="Editar prato" className="btn btn-outline-warning" onClick={this.handleFormSubmitEdit}/>
            </form>
        )
    }
}

export default Formulario;