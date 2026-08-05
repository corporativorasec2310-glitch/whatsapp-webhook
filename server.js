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