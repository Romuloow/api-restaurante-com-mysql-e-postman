class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarCardapio()
        this.criarPedido()
    };

    criarCardapio() {
        const sql = `CREATE TABLE IF NOT EXISTS Cardapio (id int NOT NULL AUTO_INCREMENT, 
        nome varchar(50) NOT NULL, detalhes varchar(100) NOT NULL, preco DECIMAL NOT NULL, 
        categoria varchar(25) NOT NULL, disponivel BOOLEAN NOT NULL, PRIMARY KEY(id))`

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log("HOUVE UM ERRO NA CRIAÇÃO DO CARDÁPIO")
                console.log(erro)
            } else {
                console.log("Tabela de cardapio criada com sucesso!")
            }
        })
    };

    criarPedido() {
        const sql = `CREATE TABLE IF NOT EXISTS Pedidos (id int NOT NULL AUTO_INCREMENT,
        nomeCliente varchar(50) NOT NULL, pedido varchar(50) NOT NULL, preco DECIMAL(10, 2) NOT NULL,
        entrega BOOLEAN NOT NULL, endereco text, PRIMARY KEY(id))`

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
                console.log("HOUVE UM ERRO NA CRIAÇÃO DO PEDIDO")
            } else {
                console.log("Tabela de pedido criada com sucesso!")
            }
        })
    }
};

module.exports = new Tabelas