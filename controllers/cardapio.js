const Cardapio = require("../models/cardapio")

module.exports = app => {
    app.get("/cardapio", (req, res) => {
        
        Cardapio.lista(res)

    });

    app.get("/cardapio/:id", (req, res) => {
        const id = req.params.id

        Cardapio.buscaPorId(id, res)
    })

    app.post("/cardapio", (req, res) => {
        
        const cardapio = req.body
        
        Cardapio.adiciona(cardapio, res)
        
    });

    app.patch("/cardapio/:id", (req, res) => {
        const id = req.params.id

        const valores = req.body

        Cardapio.altera(id, valores, res)
    })

    app.delete("/cardapio/:id", (req, res) => {
        const id = req.params.id

        Cardapio.deleta(id, res)
    })
};