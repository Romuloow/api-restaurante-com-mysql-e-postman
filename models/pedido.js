const conexao = require("../infraestrutura/conexao")

class Pedido {
    adiciona(pedido, res) {

        const nomeClienteValido = pedido.nomeCliente.length >= 5
        const pedidoValido = pedido.pedido.length >= 5
        const precoValido = !isNaN(pedido.preco)
        const entregaValida = pedido.entrega == "true"
        const enderecoValido = !entregaValida || pedido.endereco.length >= 10

        const validacoes = [
            {
                nome: "nomeCliente",
                valido: nomeClienteValido,
                msgErro: "O nome do cliente deve ter pelo menos 5 caracteres"
            },
            {
                nome: "pedido",
                valido: pedidoValido,
                msgErro: "O nome do pedido de ter pelo menos 5 caracteres"
            },
            {
                nome: "preco",
                valido: precoValido,
                msgErro: "O preço deve ser um número"
            },
            {
                nome: "endereco",
                valido: enderecoValido,
                msgErro: "O endereço deve ter pelo menos 10 caracteres"
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido)

        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            pedido.preco = Number(pedido.preco)
            if (entregaValida) {
                pedido.preco += 5
            }
            const pedidoObj = {...pedido, entrega: entregaValida}
            const sql = "INSERT INTO Pedidos SET ?"
    
            conexao.query(sql, pedidoObj, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json(pedidoObj)
                }
            })
        }


    };

    lista(res) {
        const sql = "SELECT * FROM Pedidos"

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    };

    buscaId(id, res) {
        const sql = `SELECT * FROM Pedidos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados[0])
            }
        })
    };

    altera(id, valores, res) {
      const erros = []

      if (valores.nomeCliente) {
        const nomeClienteValido = valores.nomeCliente.length >= 5
        if (!nomeClienteValido) {
            const campo = {
                nome: "nomeCliente",
                valido: false,
                msgErro: "O nome deve ter pelo menos 5 caracteres"
            }
            erros.push(campo)
        }
      };

      if (valores.pedido) {
        const pedidoValido = valores.pedido.length >= 5
        if (!pedidoValido) {
            const campo = {
                nome: "pedido",
                valido: false,
                msgErro: "O pedido deve ter pelo menos 5 caracteres"
            }
            erros.push(campo)
        }
      };

      if (valores.preco && isNaN(valores.preco)) {
        const campo = {
            nome: "preco",
            valido: false,
            msgErro: "O preço deve ser um número"
        }
        erros.push(campo)
      };

      if (valores.entrega && !(valores.entrega == "true" || valores.entrega == "false")) {
        const campo = {
            nome: "entrega",
            valido: false,
            msgErro: "A entrega só pode ser um valor 'true' ou 'false'"
        }
        erros.push(campo)
      };

      if (valores.endereco && valores.entrega == 'true' && !(valores.endereco.length >= 10)) {
        const enderecoNaoValido = {
            nome: "endereco",
            valido: false,
            msgErro: "O endereço deve ter pelo menso 10 caracteres"
        }
        erros.push(enderecoNaoValido)
      };

      const existemErros = erros.length

      if (existemErros) {
        res.status(400).json(erros)
      } else {
        if (valores.entrega) {
            if (valores.entrega == "true") {
                valores.entrega = true
            } else {
                valores.entrega = false
            }
        }
        const sql = "UPDATE Pedidos SET ? WHERE id = ?"

        conexao.query(sql, [ valores, id ], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json([{ msg: `id ${id} alterado com sucesso!` }, valores])
            }
        })
      }
    };

    deleta(id, res) {
        const sql = `DELETE FROM Pedidos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Pedido