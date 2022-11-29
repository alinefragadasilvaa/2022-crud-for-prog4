module.exports = class Cliente { 
  constructor() {
	this.cpf = "";
    this.nome = "";
	this.endereco = "";
	this.telefone = "";
  }
  
  setCpf(c) {
	this.cpf = c;
  }
  
  getCpf() {
	return this.cpf;  
  }
  
  setNome(n) {
	this.nome = n;
  }
  
  getNome() {
	return this.nome;  
  }
  
  setEndereco(e) {
	this.endereco = e;
  }
  
  getEndereco() {
	return this.endereco;  
  }
  
  setTelefone(t) {
	this.telefone = t;
  }
  
  getTelefone() {
	return this.telefone;  
  }
  
  inserir(connection) {
	try {
		var sql = "INSERT INTO clientes (cpf,nome,telefone,endereco) VALUES(?, ?, ?, ?)";

		connection.query(sql, [this.cpf, this.nome, this.telefone, this.endereco], function (err, result) {
		  if (err) throw "teste";
		  //if (err) console.error('err from callback: ' + err.stack);
		  });
	} catch (e) {
		console.error('err from callback: ' + e.stack);
		throw e;
	}
  }
  
  listar(connection, callback) {
    var sql = "SELECT * FROM clientes";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  pesquisar(connection, callback) {
    var sql = "SELECT * FROM clientes WHERE nome like ?";

    connection.query(sql, [this.nome], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  consultarChave(connection, callback) {
    var sql = "SELECT * FROM clientes WHERE cpf = ?";

    connection.query(sql, [this.cpf], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  deletar(connection) {
	var sql = "DELETE FROM clientes WHERE cpf =  ?";

	connection.query(sql, [this.cpf], function (err, result) {
	  if (err) throw "teste";
	  //if (err) console.error('err from callback: ' + err.stack);
    });
  }
  
  atualizar(connection) {
    try {
      var sql = "UPDATE clientes SET nome = ?, telefone = ?, endereco = ? WHERE cpf = ?";
  
      connection.query(sql, [this.nome, this.telefone, this.endereco, this.cpf], function (err, result) {
        if (err) throw "teste";
        //if (err) console.error('err from callback: ' + err.stack);
        });
    } catch (e) {
      console.error('err from callback: ' + e.stack);
      throw e;
    }
    }
    
}