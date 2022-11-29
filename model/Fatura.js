const Cliente = require('./Cliente');
const Servico = require('./Servico');

module.exports = class Fatura { 
  constructor() {
	this.id = 0;
	this.dataVencimento = "";
    this.dataEmissao = "";
	this.valorTotal = 0.0;
	this.valorIcms = 0.0;
	this.cli = new Cliente();
	this.serv = new Servico();
  }

  setId(i) {
	this.id = i;
  }
  
  getId() {
	return this.id;  
  }
  
  setDataVencimento(dv) {
	this.dataVencimento = dv;
  }
  
  getDataVencimento() {
	return this.dataVencimento;  
  }
  
  setDataEmissao(de) {
	this.dataEmissao = de;
  }
  
  getDataEmissao() {
	return this.dataEmissao;  
  }
  
  setValorTotal() {
	this.valorTotal = this.serv.getValorHora() * 
	                  this.serv.getTempoRealizacao();
  }
  
  getValorTotal() {
	return this.valorTotal;  
  }
  
  setValorIcms() {
	if (this.serv.getTipoServico() == 1) {
		this.valorIcms = (this.valorTotal * 15)/100;
	} else {
		if (this.serv.getTipoServico() == 2) {
			this.valorIcms = this.valorTotal * 0.12;
		} else {
			if (this.serv.getTipoServico() == 3) {
				this.valorIcms = (this.valorTotal * 23)/100;
			} else {
				this.valorIcms = this.valorTotal * 0.17;
			}
		}
	}
  }
  
  getValorIcms() {
	return this.valorIcms;  
  }
  
  getPercentualIcms() {
	if (this.serv.tipoServico == 1) {
		return 15;  
	} else {
		if (this.serv.tipoServico == 2) {
			return 12;  
		} else {
			if (this.serv.tipoServico == 3) {
				return 23;  
			} else {
				return 17;  
			}
		}
	}
  }
  
  setCli(c) {
	this.cli = c;
  }
  
  getCli() {
	return this.cli;  
  }
  
  setServ(s) {
	this.serv = s;
  }
  
  getServ() {
	return this.serv;  
  }
  
  listar(connection, callback) {
    var sql = "SELECT a.id, a.cpf_cliente, a.id_servico, "+
	                 "date_format(a.data_emissao, '%d/%m/%Y') as data_emissao, "+
					 "date_format(a.data_vencimento, '%d/%m/%Y') as data_vencimento, "+
					 "b.nome as nome_cliente, c.descricao as desc_servico "+
	            "FROM faturas as a, clientes as b, servicos as c "+
			   "WHERE a.cpf_cliente = b.cpf AND a.id_servico = c.id";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  inserir(connection) {
	try {
		var sql = "INSERT INTO faturas (cpf_cliente,id_servico,data_vencimento,data_emissao) VALUES(?, ?, ?, ?)";

		connection.query(sql, [this.cli.getCpf(), this.serv.getId(), this.dataVencimento, this.dataEmissao], function (err, result) {
		  //if (err) throw "teste";
		  if (err) throw 'err from callback: ' + err.stack;
		  });
	} catch (e) {
		console.error('err from callback: ' + e.stack);
		throw e;
	}
  }
  
  pesquisar(connection, callback) {
    var sql = "SELECT a.cpf_cliente, a.id_servico, "+
	                 "date_format(a.data_emissao, '%d/%m/%Y') as data_emissao, "+
					 "date_format(a.data_vencimento, '%d/%m/%Y') as data_vencimento, "+
					 "b.nome as nome_cliente, c.descricao as desc_servico "+
	            "FROM faturas as a, clientes as b, servicos as c "+
			   "WHERE a.cpf_cliente = b.cpf "+
			     "AND a.id_servico = c.id "+
				 "AND b.nome like ?";
			   
    connection.query(sql, [this.cli.getNome()], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  consultarChave(connection, callback) {
    var sql = "SELECT * FROM faturas WHERE id = ?";

    connection.query(sql, [this.id], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  deletar(connection) {
	var sql = "DELETE FROM faturas WHERE id =  ?";

	connection.query(sql, [this.id], function (err, result) {
	  if (err) throw "teste";
	  //if (err) console.error('err from callback: ' + err.stack);
    });
  }

  atualizar(connection) {
    try {
      var sql = "UPDATE faturas SET cpf_cliente = ?, id_servico = ?, data_vencimento = ?, data_emissao = ? WHERE id = ?";
  
      connection.query(sql, [this.cligetCpf(), this.servgetId(), this.dataVencimento, this.dataEmissao, this.id], function (err, result) {
        if (err) throw "teste";
        //if (err) console.error('err from callback: ' + err.stack);
        });
    } catch (e) {
      console.error('err from callback: ' + e.stack);
      throw e;
    }
    }
  
}