const express = require('express');
const app = express();                 /* npm i --s ejs */

app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const Fatura = require('./model/Fatura');
const Cliente = require('./model/Cliente');
const Servico = require('./model/Servico');

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "oito",
  password: "12345678",
  database: "tabajara"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Banco de dados conectado!");
});


app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});


/* Funções de Clientes */

app.get('/clientes', function(req, res){
	
	var c = new Cliente();  
    c.listar(con, function(result){
		res.render('cliente/lista.ejs', {clientes: result});
	});
	  
});

app.post('/filtrarCliente', function(req, res){
	var c = new Cliente();
	c.setNome(req.body.nome);
	
	if (c.getNome() == '') {
		c.setNome('%');
	}
	
	c.pesquisar(con, function(result){
		res.render('cliente/lista.ejs', {clientes: result});
	});
});

app.get('/formCliente', function(req, res){
	res.sendFile(__dirname + '/views/cliente/form.html');
});


app.post('/salvarCliente', function(req, res){
	try {
		var c = new Cliente();
		
		c.setCpf(req.body.cpf);
		c.setNome(req.body.nome);
		c.setTelefone(req.body.telefone);
		c.setEndereco(req.body.endereco);
		
		var retorno = c.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('cliente/resultado.ejs', {param: c, msg: 'Cliente registrado com sucesso!!!'});
});

app.post('/gerenciarCliente', function(req, res){
	var c = new Cliente();
	if (req.body.acao == 'Excluir') {
		c.setCpf(req.body.cpf);
		c.deletar(con);
		res.render('cliente/resultado.ejs', {param: c, msg: 'Cliente eliminado com sucesso!!!'});
	} else {
		c.setCpf(req.body.cpf);
		c.consultarChave(con, function(result){
			res.render('cliente/form.ejs', {cliente: result});
		});
	}	
});

app.post('/atualizarCliente', function(req, res){
	try {
		var c = new Cliente();
		
		c.setCpf(req.body.cpf);
		c.setNome(req.body.nome);
		c.setTelefone(req.body.telefone);
		c.setEndereco(req.body.endereco);
		
		var retorno = c.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('cliente/resultado.ejs', {param: c, msg: 'Cliente atualizado com sucesso!!!'});
});


/* Funções de Serviços */

app.get('/servicos', function(req, res){
	
	var s = new Servico();  
    s.listar(con, function(result){
		res.render('servico/lista.ejs', {servicos: result});
	});
	  
});

app.post('/filtrarServico', function(req, res){
	var s = new Servico();
	s.setDescricao(req.body.descricao);
	
	if (s.getDescricao() == '') {
		s.setDescricao('%');
	}
	
	s.pesquisar(con, function(result){
		res.render('servico/lista.ejs', {servicos: result});
	});
});

app.get('/formServico', function(req, res){
	res.sendFile(__dirname + '/views/servico/form.html');
});

app.post('/salvarServico', function(req, res){
	try {
		var s = new Servico();
		
		s.setDescricao(req.body.descricao_servico);
		s.setDataRealizacao(req.body.data_realizacao);
		s.setTipoServico(req.body.tipo);
		s.setTempoRealizacao(req.body.tempo);
		s.setValorHora(req.body.valor_unitario);
		
		var retorno = s.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('servico/resultado.ejs', {param: s, msg: 'Serviço registrado com sucesso!!!'});
});

app.post('/gerenciarServico', function(req, res){
	var s = new Servico();
	if (req.body.acao == 'Excluir') {
		s.setId(req.body.id);
		s.deletar(con);
		res.render('servico/resultado.ejs', {param: s, msg: 'Serviço eliminado com sucesso!!!'});
	} else {
		s.setId(req.body.id);
		s.consultarChave(con, function(result){
			res.render('servico/form.ejs', {servico: result});
		});
	}	
});

app.post('/atualizarServico', function(req, res){
	try {
		var s = new Servico();
		
		s.setId(req.body.id);
		s.setDescricao(req.body.descricao_servico);
		s.setDataRealizacao(req.body.data_realizacao);
		s.setTipoServico(req.body.tipo);
		s.setTempoRealizacao(req.body.tempo);
		s.setValorHora(req.body.valor_unitario);
		
		var retorno = s.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('servico/resultado.ejs', {param: s, msg: 'Serviço atualizado com sucesso!!!'});
});



/* Funções de Faturas */

app.get('/faturas', function(req, res){
	
	var f = new Fatura();  
    f.listar(con, function(result){
		res.render('fatura/lista.ejs', {faturas: result});
	});
	  
});

app.post('/filtrarFatura', function(req, res){
	var f = new Fatura();
	f.getCli().setNome(req.body.nome_cliente);
	
	if (f.getCli().getNome() == '') {
		f.getCli().setNome('%');
	}
	
	f.pesquisar(con, function(result){
		res.render('fatura/lista.ejs', {faturas: result});
	});
});

app.get('/formFatura', function(req, res){
	var c = new Cliente();  
    var s = new Servico(); 
    
	c.listar(con, function(result1){
		s.listar(con, function(result2){
			res.render('fatura/form.ejs', {clientes: result1, servicos: result2});
		});
	});
	
	
});

app.post('/salvarFatura', function(req, res){
	try {
		var f = new Fatura();
		
		f.setDataVencimento(req.body.data_vencimento);
		f.setDataEmissao(req.body.data_emissao);
		f.getCli().setCpf(req.body.cpf_cliente);
		f.getServ().setId(req.body.id_servico);
		
		var retorno = f.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('fatura/resultado.ejs', {param: f, msg: 'Fatura registrada com sucesso!!!'});
});

app.post('/gerenciarFatura', function(req, res){
	var f = new Fatura();
	if (req.body.acao == 'Excluir') {
		f.setId(req.body.id);
		f.deletar(con);
	res.render('fatura/resultado.ejs', {param: f, msg: 'Fatura eliminada com sucesso!!!'});
	} else {
		f.setId(req.body.id);
		f.consultarChave(con, function(result){
			var c = new Cliente();  
    		var s = new Servico(); 
    
			c.listar(con, function(result1){
			s.listar(con, function(result2){
				res.render('fatura/formupdate.ejs', {clientes: result1, servicos: result2, fatura: result});
				});
			});
		});
	}	
});

app.post('/atualizarFatura', function(req, res){
	try {
		var f = new Fatura();
		
		f.setId(req.body.id);
		f.setDataVencimento(req.body.data_vencimento);
		f.setDataEmissao(req.body.data_emissao);
		f.getCli().setCpf(req.body.cpf_cliente);
		f.getServ().setId(req.body.id_servico);
		
		var retorno = f.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('fatura/resultado.ejs', {param: f, msg: 'Fatura atualizado com sucesso!!!'});
});




/* Vamos deixar para mais tarde!!!! */

app.post('/imprimir', function(req, res){
	var fat = new Fatura();
	
	fat.getCli().setCpf(req.body.cpf);
	fat.getCli().setNome(req.body.nome);
	fat.getCli().setTelefone(req.body.telefone);
	fat.getCli().setEndereco(req.body.endereco);
	
	fat.getServ().setDescricao(req.body.descricao_servico);
	fat.getServ().setDataRealizacao(req.body.data_realizacao);
	fat.getServ().setTipoServico(req.body.tipo);
	fat.getServ().setTempoRealizacao(req.body.tempo);
	fat.getServ().setValorHora(req.body.valor_unitario);
	
	fat.setDataEmissao(req.body.data_emissao);
	fat.setDataVencimento(req.body.data_vencimento);
	
	fat.setValorTotal();
	
	fat.setValorIcms();
	
	res.render('resultado.ejs', {param: fat});
});
