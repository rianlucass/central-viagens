import express from 'express';
import { engine } from 'express-handlebars';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import pagesRoutes from './routes/pages.js'; // Se for usar arquivos de rotas

// Carrega variáveis do .env (ex: API_URL, PORT)
dotenv.config();

const app = express();

// Handlebars com suporte a objetos do Spring
app.engine(
  'handlebars',
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    layoutsDir: path.join(path.resolve(), 'views/layouts'),
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(path.resolve(), 'views'));

// Middleware para arquivos estáticos (JS, CSS, imagens...)
app.use(express.static(path.join(path.resolve(), 'public')));

// Middleware para ler dados de formulários e JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas de páginas
app.use('/', pagesRoutes); // ou defina diretamente as rotas aqui se preferir

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
