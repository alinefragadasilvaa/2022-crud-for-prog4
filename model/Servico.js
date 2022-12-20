module.exports = class Servico { 
  constructor() {
	this.id = 0;
	this.descricao = "";
    this.tipoServico = 0;
	this.tempoRealizacao = 0;
	this.dataRealizacao = "";
	this.valorHora = 0.0;
  }
  
  setId(i) {
	this.id = i;
  }
  
  getId() {
	return this.id;  
  }
  
  setDescricao(d) {
	this.descricao = d;
  }
  
  getDescricao() {
	return this.descricao;  
  }
  
  setTipoServico(ts) {
	this.tipoServico = ts;
  }
  
  getTipoServico() {
	if (this.tipoServico == 1) {
		return 'Instalação de Telefone/Internet';  
	} else {
		if (this.tipoServico == 2) {
			return 'Manutenção de Linha Telefônica/Internet';  
		} else {
			if (this.tipoServico == 3) {
				return 'Troca de Equipamentos (modem)';  
			} else {
				return 'Suporte Técnico';  
			}
		}
	}
  }
  
  setTempoRealizacao(tr) {
	this.tempoRealizacao = tr;
  }
  
  getTempoRealizacao() {
	return this.tempoRealizacao;  
  }
  
  setDataRealizacao(dr) {
	this.dataRealizacao = dr;
  }
  
  getDataRealizacao() {
	return this.dataRealizacao;  
  }
  
  setValorHora(vr) {
	this.valorHora = vr;
  }
  
  getValorHora() {
	return this.valorHora;  
  }
  
  
  inserir(connection) {
	try {
		var sql = "INSERT INTO servicos (descricao,tipo_servico,tempo_realizacao,data_realizacao,valor_hora) VALUES(?, ?, ?, ?, ?)";

		connection.query(sql, [this.descricao, this.tipoServico, this.tempoRealizacao, this.dataRealizacao, this.valorHora], function (err, result) {
		  if (err) throw "teste";
		  //if (err) console.error('err from callback: ' + err.stack);
		  });
	} catch (e) {
		console.error('err from callback: ' + e.stack);
		throw e;
	}
  }
  
  listar(connection, callback) {
    var sql = "SELECT * FROM servicos";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  pesquisar(connection, callback) {
    var sql = "SELECT * FROM servicos WHERE descricao like ?";

    connection.query(sql, [this.descricao], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  consultarChave(connection, callback) {
    var sql = "SELECT * FROM servicos WHERE id = ?";

    connection.query(sql, [this.id], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  deletar(connection) {
	var sql = "DELETE FROM servicos WHERE id =  ?";

	connection.query(sql, [this.id], function (err, result) {
	  if (err) throw "teste";
	  //if (err) console.error('err from callback: ' + err.stack);
    });
  }
  
  atualizar(connection) {
    try {
      var sql = "UPDATE servicos SET descricao = ?, tipo_servico = ?, tempo_realizacao = ?, data_realizacao = ?, valor_hora = ? WHERE id = ?";
  
      connection.query(sql, [this.descricao, this.tipoServico, this.tempoRealizacao, this.dataRealizacao, this.valorHora, this.id], function (err, result) {
        if (err) throw "teste";
        //if (err) console.error('err from callback: ' + err.stack);
        });
    } catch (e) {
      console.error('err from callback: ' + e.stack);
      throw e;
    }
    }

}

