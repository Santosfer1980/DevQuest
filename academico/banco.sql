-- ==========================================================
-- DevQuest Acadêmico - Banco de Dados Relacional (MySQL / MariaDB)
-- Disciplina: Análise e Desenvolvimento de Sistemas (ADS)
-- Autor: Fernando Santos
-- ==========================================================

CREATE DATABASE IF NOT EXISTS devquest_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE devquest_db;

-- 1. Tabela de Usuários / Alunos
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    nivel INT DEFAULT 1,
    xp_total INT DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabela de Desafios Práticos
CREATE TABLE IF NOT EXISTS desafios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    linguagem ENUM('html_css', 'javascript', 'php', 'python', 'sql') NOT NULL,
    dificuldade ENUM('iniciante', 'intermediario', 'avancado') DEFAULT 'iniciante',
    instrucao TEXT NOT NULL,
    codigo_inicial TEXT NOT NULL,
    gabarito_esperado TEXT NOT NULL,
    xp_recompensa INT DEFAULT 50,
    ativo TINYINT(1) DEFAULT 1
) ENGINE=InnoDB;

-- 3. Tabela de Histórico de Tentativas dos Alunos
CREATE TABLE IF NOT EXISTS tentativas_desafios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    desafio_id INT NOT NULL,
    codigo_submetido TEXT NOT NULL,
    acertou TINYINT(1) NOT NULL,
    data_tentativa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (desafio_id) REFERENCES desafios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Tabela de Sessões Pomodoro e Produtividade
CREATE TABLE IF NOT EXISTS sessoes_pomodoro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    duracao_minutos INT DEFAULT 25,
    concluida TINYINT(1) DEFAULT 1,
    data_sessao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ==========================================================
-- Carga Inicial de Dados (Seeders)
-- ==========================================================

-- Usuário padrão para testes acadêmicos
INSERT INTO usuarios (nome, email, senha_hash, nivel, xp_total) 
VALUES ('Fernando Santos', 'fernando@uni9.edu.br', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeCgH.XQ8R5m1wJ8fE9sV2G0q6uK2', 1, 150)
ON DUPLICATE KEY UPDATE id=id;

-- Desafios nas 5 linguagens exigidas
INSERT INTO desafios (titulo, linguagem, dificuldade, instrucao, codigo_inicial, gabarito_esperado, xp_recompensa) VALUES
('Estrutura de Cabeçalho Semântico', 'html_css', 'iniciante', 'Crie uma tag semântica de cabeçalho principal com o título "DevQuest"', '<!-- Escreva seu código aqui -->', '<h1>DevQuest</h1>', 50),
('Função de Soma em JavaScript', 'javascript', 'iniciante', 'Complete a função somar(a, b) retornando a soma dos dois números.', 'function somar(a, b) {\n  // seu código aqui\n}', 'return a + b;', 60),
('Exibição com PHP', 'php', 'iniciante', 'Utilize o comando echo para exibir a mensagem "Olá, DevQuest!" finalizando com ponto e vírgula.', '<?php\n// seu código aqui\n?>', 'echo "Olá, DevQuest!";', 60),
('Lista e Loop em Python', 'python', 'iniciante', 'Crie um loop for para iterar sobre a lista linguagens = ["PHP", "Python", "SQL"] e imprimir cada item.', 'linguagens = ["PHP", "Python", "SQL"]\n# seu loop for aqui', 'for l in linguagens:\n    print(l)', 70),
('Consulta de Alunos em SQL', 'sql', 'iniciante', 'Escreva uma consulta SELECT para retornar todos os campos da tabela usuarios ordenados pelo nome.', '-- escreva a consulta SQL\n', 'SELECT * FROM usuarios ORDER BY nome ASC;', 65);
