CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL ,
    senha VARCHAR(100) NOT NULL,
    papel ENUM('aluno', 'monitor') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE disciplinas (
    id_dsc INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao  VARCHAR(100) NOT NULL,
    monitor_id INT,
    FOREIGN KEY (monitor_id) REFERENCES usuarios(id),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE salas_de_aula (
    id_sala INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE horarios_disponiveis (
    id_hor INT AUTO_INCREMENT PRIMARY KEY,
    sala_de_aula_id INT NOT NULL,
    dia_da_semana ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sala_de_aula_id) REFERENCES salas_de_aula(id_sala)
);

CREATE TABLE presencas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aula_id INT NOT NULL,
    aluno_id INT NOT NULL,
    presente BOOLEAN NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (aula_id) REFERENCES salas_de_aula(id_sala),
    FOREIGN KEY (aluno_id) REFERENCES usuarios(id)
);

CREATE TABLE avaliacao_monitores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  monitor_id INT NOT NULL,
  feedback TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (monitor_id) REFERENCES usuarios(id)
);
