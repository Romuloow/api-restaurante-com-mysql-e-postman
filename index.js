const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas")

conexao.connect(erro => {
    if (erro) {
        console.log("HOUVE UM ERRO AO TENTAR SE CONECTAR AO BANCO DE DADOS!")
        console.log(erro)
    } else {
        console.log("Conexão com o banco de dados feita com sucesso!")

        Tabelas.init(conexao)

        const app = customExpress()

        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000")
        });
    }
})


