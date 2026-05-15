DELETE FROM distribuicoes;
DELETE FROM doacoes;
DELETE FROM tipo_itens;
DELETE FROM usuarios;

-- Senha do Admin: 'admin123' -> Hash BCrypt salt 10
INSERT INTO usuarios (criado_em, email, nome, senha, is_admin, is_beneficiario)
VALUES (CURRENT_DATE, 'admin@doarmais.com', 'Administrador',
        '$2a$10$7Z8v8K.j6E6uBv7lR7G0F5e.G3.u8J8m9i0yY1f8K.j6E6uBv7lR7G.', true, false);

-- Senha do Doador: '123456' -> Hash BCrypt salt 10
INSERT INTO usuarios (criado_em, email, nome, senha, is_admin, is_beneficiario)
VALUES (CURRENT_DATE, 'doador@gmail.com', 'Maria Doadora',
        '$2a$10$7Y.H9W.yH.m8.W9.m8.W9.m8.W9.m8.W9.m8.W9.m8.W9.m8.W9.', false, false);

-- Itens Padrão
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
