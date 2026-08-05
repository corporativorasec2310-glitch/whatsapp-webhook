const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// Verificación del webhook
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
        console.log("✅ Webhook verificado");
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});

// Recepción de mensajes
app.post("/webhook", (req, res) => {
    console.log("Mensaje recibido:");
    console.log(JSON.stringify(req.body, null, 2));

    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});