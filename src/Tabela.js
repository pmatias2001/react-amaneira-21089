/**
 * Tabela.js
 */


import React from "react";

function Cabecalho() {
    return (
        <thead>
            <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Stock</th>
                <th>Descrição</th>
                <th>Fotografia</th>
                <th></th>
            </tr>
        </thead>
    )
}


const Corpo = (props) => {
    // 'map' funciona como um 'foreach()'
    const linhas = props.dadosTabelaIN.map((prato) => {
        return (
            <tr key={prato.id}>
                <td>{prato.nome}</td>
                <td>{prato.preco}</td>
                <td>{prato.numStock}</td>
                <td>{prato.descricao}</td>
                <td>
                    <img src={'imagens/' + prato.fotografia}
                        alt={'foto de ' + prato.nome}
                        title={prato.nome}
                        height="50" />
                </td>
                <td>
                    <button className="btn btn-outline-warning"
                        onClick={() => props.pratoAAtualizarOUT(prato.id)}
                    >Editar</button>
                </td>
                <td>
                    <button className="btn btn-outline-danger"
                        onClick={() => props.pratoARemoverOUT(prato.id)}
                    >Apagar</button>
                </td>
            </tr>
        )
    })

    // esta é a 'resposta' do componente
    return (<tbody>{linhas}</tbody>)
}



class Tabela extends React.Component {

    render() {

        const { dadosPratosIN, editaPratoOUT, apagaPratoOUT } = this.props;

        return (
            <table className="table table-striped">
                <Cabecalho />
                <Corpo dadosTabelaIN={dadosPratosIN} pratoAAtualizarOUT={editaPratoOUT} pratoARemoverOUT={apagaPratoOUT} />
            </table>
        )
    }
}


export default Tabela
