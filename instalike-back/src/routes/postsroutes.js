// Importa o módulo express para criar a aplicação web
import express from "express";

// Importa o módulo multer para lidar com uploads de arquivos
import multer from "multer";

// Importa as funções controladoras que gerenciam as requisições para posts
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsControllers.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200 
}

// Configura o armazenamento de arquivos usando diskStorage do multer
const storage = multer.diskStorage({
  // Define a pasta de destino para os uploads (no caso, 'uploads/')
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo usando o nome original enviado pelo cliente
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do multer usando o armazenamento configurado
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware express.json para interpretar requisições no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts (provavelmente chama a função listarPosts do controlador)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (provavelmente chama a função postarNovoPost do controlador)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagens (usa o middleware upload.single('imagem') para tratar o upload e chama a função uploadImagem do controlador)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para uso em outros arquivos
export default routes;