// Importa o módulo Express para criar o servidor web
import express from "express";
import routes from "./src/routes/postsroutes.js";

// Cria uma instância do servidor Express
const app = express();
app.use(express.static("uploads"));
routes(app);


// Inicia o servidor na porta 3000 e imprime uma mensagem de confirmação
app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000...");
});
