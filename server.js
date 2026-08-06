const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// Verificación del webhook
app.get("/webhook", (req, res) => {

    console.log("===== VERIFICACIÓN WEBHOOK =====");
    console.log(req.query);

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log("Token recibido:", token);
    console.log("Token esperado:", process.env.VERIFY_TOKEN);

    if (
        mode === "subscribe" &&
        token === process.env.VERIFY_TOKEN
    ) {
        console.log("✅ WEBHOOK VERIFICADO");
        return res.status(200).send(challenge);
    }

    console.log("❌ TOKEN INCORRECTO");
    return res.status(403).send("Forbidden");
});

// Recepción de mensajes
app.post("/webhook", (req, res) => {
    console.log("Mensaje recibido:");
    console.log(JSON.stringify(req.body, null, 2));

    res.sendStatus(200);
});

// Ruta principal
app.get("/", (req, res) => {
    res.send("Webhook de WhatsApp funcionando");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});