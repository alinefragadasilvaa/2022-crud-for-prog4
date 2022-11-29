drop database tabajara;
create database tabajara;
use tabajara;
create table clientes (
   cpf varchar(11),
   nome varchar(100),
   telefone varchar(13),
   endereco text,
   primary key(cpf)
);
create table servicos (
    id int auto_increment,
    descricao varchar(200),
    tipo_servico varchar(500),
	tempo_realizacao int,
	data_realizacao date,
	valor_hora float,
    primary key (id)
);
create table faturas (
    id int auto_increment,
    cpf_cliente varchar(11),
    id_servico int,
    data_vencimento date,
    data_emissao date,
    primary key (id),
   foreign key (id_servico)
   references servicos(id),
   foreign key (cpf_cliente)
   references clientes(cpf)
);
CREATE USER 'oito'@'localhost' IDENTIFIED BY '12345678';

GRANT ALL PRIVILEGES ON *.* TO
'oito'@'localhost';

FLUSH PRIVILEGES;

