DELETE FROM audit_logs;
DELETE FROM distribuicoes;
DELETE FROM doacoes;
DELETE FROM tipo_itens;
DELETE FROM usuarios;

INSERT INTO tipo_itens (nome, descricao) VALUES ('ARROZ', 'Arroz Agulhinha 5kg');
INSERT INTO tipo_itens (nome, descricao) VALUES ('FEIJAO', 'Feijão Carioca 1kg');
INSERT INTO tipo_itens (nome, descricao) VALUES ('MACARRAO', 'Macarrão Espaguete 500g');
INSERT INTO tipo_itens (nome, descricao) VALUES ('OLEO', 'Óleo de Soja 900ml');
INSERT INTO tipo_itens (nome, descricao) VALUES ('ACUCAR', 'Açúcar Refinado 1kg');
INSERT INTO tipo_itens (nome, descricao) VALUES ('SAL', 'Sal Refinado 1kg');
INSERT INTO tipo_itens (nome, descricao) VALUES ('CAFE', 'Café Torrado e Moído 500g');
INSERT INTO tipo_itens (nome, descricao) VALUES ('LEITE', 'Leite Integral 1L');
INSERT INTO tipo_itens (nome, descricao) VALUES ('FARINHA', 'Farinha de Trigo 1kg');
INSERT INTO tipo_itens (nome, descricao) VALUES ('BISCOITO', 'Biscoito Cream Cracker 400g');
