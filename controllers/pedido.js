const Pedido = require("../models/pedido")

module.exports = app => {
    app.get("/pedidos", (req, res) => {
        Pedido.lista(res)
    });

    app.get("/pedidos/:id", (req, res) => {
        const id = req.params.id

        Pedido.buscaId(id, res)
    })

    app.post("/pedidos", (req, res) => {
        const pedido = req.body

        Pedido.adiciona(pedido, res)
    });

    app.patch("/pedidos/:id", (req, res) => {
        const id = req.params.id
        const valores = req.body

        Pedido.altera(id, valores, res)
    });

    app.delete("/pedidos/:id", (req, res) => {
        const id = req.params.id

        Pedido.deleta(id, res)
    })
}