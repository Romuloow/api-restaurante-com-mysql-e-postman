const conexao = require("../infraestrutura/conexao");

class Cardapio {
    adiciona(cardapio, res) {
        
        const disponivel = cardapio.disponivel === "true"
        
        const nomeValido = cardapio.nome.length >= 5;
        const detalheValido = cardapio.detalhes.length >= 5;
        const precoValido = !isNaN(cardapio.preco)
        
        const validacoes = [
            {
                nome: "nome",
                valido: nomeValido,
                msgErro: "O nome do prato deve ter pelo menos 5 caracteres"
            },
            {
                nome: "detalhes",
                valido: detalheValido,
                msgErro: "O detalhe do prato deve ter pelo menos 5 caracteres"
            },
            {
                nome: "preco",
                valido: precoValido,
                msgErro: "O preço deve ser um número"
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        
        const existemErros = erros.length
        
        if (existemErros) {
            res.status(400).json(erros)
        } else {

            const cardapioObj = { ...cardapio, disponivel }
            const sql = "INSERT INTO Cardapio SET ?"

            conexao.query(sql, cardapioObj, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json([{ msg: "Objeto criado com sucesso!" }, cardapioObj])
                }
            })
        }

    };

    lista(res) {
        const sql = "SELECT * FROM Cardapio"

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    };

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Cardapio WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            const cardapio = resultados[0]

            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(cardapio)
            }
        })
    };

    altera(id, valores, res) {
        const validacoes = []

        if (valores.nome) {
            const nomeValido = valores.nome.length >= 5
            if (!nomeValido) {
                const campo = {
                    nome: "nome",
                    valido: false,
                    msgErro: "O nome deve ter pelo menos 5 caracteres"
                }
                validacoes.push(campo)
            }
        }

        if (valores.detalhes) {
            const detalheValido = valores.detalhes.length >= 5
            if (!detalheValido) {
                const campo = {
                    nome: "detalhes",
                    valido: false,
                    msgErro: "Detalhes deve ter pelo menos 5 caracteres"                
                }
    
                validacoes.push(campo)
            }
        }

        if (valores.preco) {
            if (isNaN(valores.preco)) {
                const campo = {
                    nome: "preço",
                    valido: false,
                    msgErro: "O preço deve ser um número"                    
                }

                validacoes.push(campo)
            }
        }


        const erros = validacoes.filter(campo => !campo.valido)

        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const sql = "UPDATE Cardapio SET ? WHERE id = ?"
    
            conexao.query(sql, [valores, id], (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json([{ msg: `Alterações feitas no id ${id}`}, valores])
                }
            })
        }
    
    };

    deleta(id, res) {
        const sql = `DELETE FROM Cardapio WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json([{ id }])
            }
        })
    }
}

module.exports = new Cardapio