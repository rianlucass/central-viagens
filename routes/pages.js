import express from 'express';
const router = express.Router();


router.get('/cadastro-motorista', (req, res) => {

  const erro = req.query.erro;
  const sucesso = req.query.sucesso;

  res.render('cadastro-motorista', {
    title: 'Cadastro',
    mensagemErro: erro,
    mensagemSucesso: sucesso })
})

router.get('/cadastro-passageiro', (req, res) => {

  const erro = req.query.erro;
  const sucesso = req.query.sucesso;

  res.render('cadastro-passageiro', {
    title: 'Cadastro',
    mensagemErro: erro,
    mensagemSucesso: sucesso })
})

router.get('/login', (req, res) => {
  const erro = req.query.erro;
  const sucesso = req.query.sucesso;

  res.render('login', {
    title: 'Login',
    mensagemErro: erro,
    mensagemSucesso: sucesso
  })
})

router.get('/dashboard', (req, res)=> {
  res.render('motorista/dashboard', {title: 'Visão Geral'})
})

router.get('/cadastro-viagem', (req, res)=> {
  res.render('motorista/cadastro-viagem', {title: 'Cadastrar Viagem'})
})

router.get('/cadastro-veiculo', (req, res) => {
  res.render('motorista/cadastro-veiculo', {title: 'Cadastrar Veículo'});
})

router.get('/minhas-viagens', (req, res) => {
  res.render('motorista/minhas-viagens', {title: 'Minhas Viagens'});
})

router.get('/meus-veiculos', (req, res) => {
  res.render('motorista/meus-veiculos', {title: 'Meus Veículos'});
})

router.get('/home', (req, res) => {
  res.render('passageiro/home', {title: 'Inicio'})
})


export default router;