// Conteúdo estático empacotado para download instantâneo em formato ZIP
export const ARQUIVOS_ACADEMICO = {
  "banco.sql": `-- ==========================================================
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

-- Carga Inicial de Dados (Seeders)
INSERT INTO usuarios (nome, email, senha_hash, nivel, xp_total) 
VALUES ('Fernando Santos', 'fernando@uni9.edu.br', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeCgH.XQ8R5m1wJ8fE9sV2G0q6uK2', 1, 150)
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO desafios (titulo, linguagem, dificuldade, instrucao, codigo_inicial, gabarito_esperado, xp_recompensa) VALUES
('Estrutura de Cabeçalho Semântico', 'html_css', 'iniciante', 'Crie uma tag semântica de cabeçalho principal com o título "DevQuest"', '<!-- Escreva seu código aqui -->', '<h1>DevQuest</h1>', 50),
('Função de Soma em JavaScript', 'javascript', 'iniciante', 'Complete a função somar(a, b) retornando a soma dos dois números.', 'function somar(a, b) {\\n  // seu código aqui\\n}', 'return a + b;', 60),
('Exibição com PHP', 'php', 'iniciante', 'Utilize o comando echo para exibir a mensagem "Olá, DevQuest!" finalizando com ponto e vírgula.', '<?php\\n// seu código aqui\\n?>', 'echo "Olá, DevQuest!";', 60),
('Lista e Loop em Python', 'python', 'iniciante', 'Crie um loop for para iterar sobre a lista linguagens = ["PHP", "Python", "SQL"] e imprimir cada item.', 'linguagens = ["PHP", "Python", "SQL"]\\n# seu loop for aqui', 'for l in linguagens:\\n    print(l)', 70),
('Consulta de Alunos em SQL', 'sql', 'iniciante', 'Escreva uma consulta SELECT para retornar todos os campos da tabela usuarios ordenados pelo nome.', '-- escreva a consulta SQL\\n', 'SELECT * FROM usuarios ORDER BY nome ASC;', 65);
`,

  "conexao.php": `<?php
/**
 * DevQuest Acadêmico - Camada de Conexão com Banco de Dados
 * Tecnologia: PHP Data Objects (PDO) para MySQL
 * Disciplina: Análise e Desenvolvimento de Sistemas (ADS)
 */

$host = 'localhost';
$dbname = 'devquest_db';
$usuario = 'root';
$senha = ''; // Padrão do XAMPP geralmente é vazio

try {
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $usuario, $senha, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    $erroConexao = $e->getMessage();
}
?>
`,

  "api_desafios.php": `<?php
/**
 * DevQuest Acadêmico - Backend API para Desafios e Submissões
 * Tecnologia: PHP Puro + PDO (Prepared Statements)
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/conexao.php';

if (!isset($pdo)) {
    echo json_encode([
        'status' => 'aviso',
        'mensagem' => 'Banco de dados offline. Importe o arquivo banco.sql no phpMyAdmin do XAMPP.',
        'dados' => [
            [
                'id' => 1,
                'titulo' => 'Estrutura Semântica (Modo Offline)',
                'linguagem' => 'html_css',
                'instrucao' => 'Crie uma tag de título principal com "DevQuest"',
                'codigo_inicial' => '<!-- Escreva seu código aqui -->',
                'gabarito_esperado' => '<h1>DevQuest</h1>',
                'xp_recompensa' => 50
            ],
            [
                'id' => 2,
                'titulo' => 'Função de Soma em JavaScript',
                'linguagem' => 'javascript',
                'instrucao' => 'Retorne a soma de dois parâmetros a e b',
                'codigo_inicial' => 'function somar(a, b) {\\n  // seu código\\n}',
                'gabarito_esperado' => 'return a + b;',
                'xp_recompensa' => 60
            ],
            [
                'id' => 3,
                'titulo' => 'Comando Echo em PHP',
                'linguagem' => 'php',
                'instrucao' => 'Exiba a frase Olá, DevQuest!',
                'codigo_inicial' => '<?php\\n// seu código\\n?>',
                'gabarito_esperado' => 'echo "Olá, DevQuest!";',
                'xp_recompensa' => 60
            ]
        ]
    ]);
    exit;
}

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'GET') {
    $stmt = $pdo->prepare("SELECT id, titulo, linguagem, dificuldade, instrucao, codigo_inicial, xp_recompensa FROM desafios WHERE ativo = 1");
    $stmt->execute();
    $desafios = $stmt->fetchAll();

    echo json_encode([
        'status' => 'sucesso',
        'total' => count($desafios),
        'desafios' => $desafios
    ]);
    exit;
}

if ($metodo === 'POST') {
    $dados = json_decode(file_get_contents('php://input'), true);

    $desafioId = isset($dados['desafio_id']) ? (int)$dados['desafio_id'] : 0;
    $codigoSubmetido = isset($dados['codigo']) ? trim($dados['codigo']) : '';
    $usuarioId = isset($dados['usuario_id']) ? (int)$dados['usuario_id'] : 1;

    if ($desafioId <= 0 || empty($codigoSubmetido)) {
        http_response_code(400);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Parâmetros inválidos.']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT gabarito_esperado, xp_recompensa FROM desafios WHERE id = ?");
    $stmt->execute([$desafioId]);
    $desafio = $stmt->fetch();

    if (!$desafio) {
        http_response_code(404);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Desafio não encontrado.']);
        exit;
    }

    $esperado = preg_replace('/\\s+/', '', strtolower($desafio['gabarito_esperado']));
    $recebido = preg_replace('/\\s+/', '', strtolower($codigoSubmetido));

    $acertou = (strpos($recebido, $esperado) !== false || $recebido === $esperado) ? 1 : 0;

    $stmtTentativa = $pdo->prepare("INSERT INTO tentativas_desafios (usuario_id, desafio_id, codigo_submetido, acertou) VALUES (?, ?, ?, ?)");
    $stmtTentativa->execute([$usuarioId, $desafioId, $codigoSubmetido, $acertou]);

    if ($acertou) {
        $stmtUp = $pdo->prepare("UPDATE usuarios SET xp_total = xp_total + ? WHERE id = ?");
        $stmtUp->execute([$desafio['xp_recompensa'], $usuarioId]);
    }

    echo json_encode([
        'status' => 'sucesso',
        'acertou' => (bool)$acertou,
        'xp_ganho' => $acertou ? (int)$desafio['xp_recompensa'] : 0,
        'mensagem' => $acertou ? 'Excelente! Solução verificada e aceita pelo servidor PHP!' : 'Ainda não está correto. Revise a sintaxe e tente novamente.'
    ]);
    exit;
}
?>
`,

  "index.html": `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevQuest Acadêmico - Plataforma Prática de ADS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Barra Lateral Semântica -->
  <aside class="sidebar">
    <div class="brand">
      <div style="font-size: 28px;">🚀</div>
      <div>
        <h2>Dev<span>Quest</span></h2>
        <span class="badge-academico">Versão Acadêmica (ADS)</span>
      </div>
    </div>

    <ul class="nav-links">
      <li class="nav-item">
        <button class="active" onclick="renderizarDesafio(0)">🌐 HTML & CSS</button>
      </li>
      <li class="nav-item">
        <button onclick="renderizarDesafio(1)">⚡ JavaScript</button>
      </li>
      <li class="nav-item">
        <button onclick="renderizarDesafio(2)">🐘 PHP & Backend</button>
      </li>
      <li class="nav-item">
        <button onclick="alert('🐍 Execute no terminal: python validador_codigo.py para rodar o módulo Python!')">🐍 Python (Módulo)</button>
      </li>
      <li class="nav-item">
        <button onclick="alert('🗄️ Importe o arquivo banco.sql no phpMyAdmin do XAMPP para visualizar o esquema relacional!')">🗄️ SQL (MySQL)</button>
      </li>
    </ul>

    <div class="card" style="margin-top: auto; padding: 16px;">
      <h4 style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 8px;">TÉCNICA POMODORO</h4>
      <div class="pomodoro-box">
        <div id="timer-display" class="pomodoro-timer">25:00</div>
        <button id="btn-pomodoro" class="btn-primary" style="padding: 6px 14px; font-size: 0.8rem;">Iniciar</button>
      </div>
    </div>
  </aside>

  <main class="main-content">
    <header class="topbar">
      <div>
        <h3 style="font-size: 1.1rem; font-weight: 700;">Laboratório Prático de Programação</h3>
        <p style="font-size: 0.8rem; color: #94a3b8;">Projeto Integrador - Análise e Desenvolvimento de Sistemas</p>
      </div>

      <div class="user-status">
        <div id="usuario-nivel" class="stat-pill" style="color: #6366f1;">Nível 1 (Estudante)</div>
        <div id="usuario-xp" class="stat-pill" style="color: #f59e0b;">⭐ 150 XP</div>
        <div class="stat-pill" style="color: #10b981;">Fernando Santos</div>
      </div>
    </header>

    <section class="content-body">
      <div class="card">
        <div class="desafio-header">
          <div>
            <span id="desafio-linguagem" class="linguagem-tag">HTML</span>
            <h2 id="desafio-titulo" style="font-size: 1.3rem; margin-top: 8px;">Carregando desafio...</h2>
          </div>
          <span id="desafio-xp" style="font-weight: bold; color: #f59e0b; font-size: 1.1rem;">+50 XP</span>
        </div>

        <p id="desafio-instrucao" style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">
          Instruções do desafio de programação...
        </p>

        <textarea id="codigo-editor" class="editor-textarea" spellcheck="false"></textarea>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.8rem; color: #64748b;">Dica: Escreva a sintaxe correta e clique em Executar para validar via PHP.</span>
          <button onclick="submeterCodigo()" class="btn-primary">▶ Executar Solução</button>
        </div>

        <div id="resultado-box" class="resultado-box"></div>
      </div>

      <div class="card" style="background: rgba(15, 23, 42, 0.6);">
        <h4 style="font-size: 0.95rem; margin-bottom: 12px; color: #a5b4fc;">Estrutura do Projeto para Avaliação Acadêmica:</h4>
        <ul style="font-size: 0.85rem; color: #94a3b8; line-height: 1.8; list-style-position: inside;">
          <li><strong>HTML5 / CSS3:</strong> Interface semântica em <code>index.html</code> e estilos em <code>style.css</code>.</li>
          <li><strong>JavaScript:</strong> Manipulação do DOM e AJAX/Fetch assíncrono em <code>app.js</code>.</li>
          <li><strong>PHP:</strong> Backend e validação segura com Prepared Statements em <code>api_desafios.php</code> e <code>conexao.php</code>.</li>
          <li><strong>SQL (MySQL):</strong> Modelagem relacional e carga de dados em <code>banco.sql</code>.</li>
          <li><strong>Python:</strong> Módulo de validação de sintaxe e análise de dados em <code>validador_codigo.py</code>.</li>
        </ul>
      </div>
    </section>
  </main>

  <script src="app.js"></script>
</body>
</html>
`,

  "style.css": `:root {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-card: #182234;
  --accent: #6366f1;
  --accent-hover: #4f46e5;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border: #334155;
  --success: #10b981;
  --warning: #f59e0b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
}

.sidebar {
  width: 280px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  gap: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.brand h2 {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.brand span {
  color: var(--accent);
}

.badge-academico {
  display: inline-block;
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 6px;
  margin-top: 4px;
}

.nav-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-secondary);
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: left;
  transition: all 0.2s ease;
}

.nav-item button:hover, .nav-item button.active {
  background-color: rgba(99, 102, 241, 0.15);
  color: var(--text-primary);
  border-color: rgba(99, 102, 241, 0.3);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
}

.topbar {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-pill {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.content-body {
  padding: 32px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.desafio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.linguagem-tag {
  background-color: #3b82f6;
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.editor-textarea {
  width: 100%;
  height: 160px;
  background-color: #090d16;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.95rem;
  color: #34d399;
  resize: vertical;
  margin: 16px 0;
  outline: none;
}

.editor-textarea:focus {
  border-color: var(--accent);
}

.btn-primary {
  background-color: var(--accent);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn-primary:hover {
  background-color: var(--accent-hover);
}

.resultado-box {
  margin-top: 16px;
  padding: 14px;
  border-radius: 10px;
  font-size: 0.9rem;
  display: none;
}

.resultado-box.sucesso {
  display: block;
  background-color: rgba(16, 185, 129, 0.15);
  border: 1px solid var(--success);
  color: #6ee7b7;
}

.resultado-box.erro {
  display: block;
  background-color: rgba(239, 68, 68, 0.15);
  border: 1px solid #ef4444;
  color: #fca5a5;
}

.pomodoro-box {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  padding: 12px 20px;
  border-radius: 12px;
}

.pomodoro-timer {
  font-family: monospace;
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--warning);
}
`,

  "app.js": `let desafios = [];
let desafioAtual = null;
let xpUsuario = 150;
let nivelUsuario = 1;

let tempoPomodoro = 25 * 60;
let timerInterval = null;
let pomodoroRodando = false;

document.addEventListener("DOMContentLoaded", () => {
    carregarDesafios();
    configurarPomodoro();
});

async function carregarDesafios() {
    try {
        const resposta = await fetch("api_desafios.php");
        const json = await resposta.json();

        if (json.desafios && json.desafios.length > 0) {
            desafios = json.desafios;
        } else if (json.dados) {
            desafios = json.dados;
        }
        renderizarDesafio(0);
    } catch (e) {
        console.warn("Usando fallback local.");
        desafios = [
            {
                id: 1,
                titulo: "Tag de Cabeçalho Semântico",
                linguagem: "html_css",
                instrucao: "Escreva a tag de cabeçalho principal com o texto: DevQuest",
                codigo_inicial: "<!-- Escreva seu código aqui -->",
                xp_recompensa: 50
            },
            {
                id: 2,
                titulo: "Função de Soma em JavaScript",
                linguagem: "javascript",
                instrucao: "Complete a função somar(a, b) retornando a + b",
                codigo_inicial: "function somar(a, b) {\\n  // seu código aqui\\n}",
                xp_recompensa: 60
            },
            {
                id: 3,
                titulo: "Exibição com PHP",
                linguagem: "php",
                instrucao: "Use a instrução echo para exibir Olá, DevQuest!",
                codigo_inicial: "<?php\\n// seu código aqui\\n?>",
                xp_recompensa: 60
            }
        ];
        renderizarDesafio(0);
    }
}

function renderizarDesafio(indice) {
    if (!desafios || desafios.length === 0) return;
    desafioAtual = desafios[indice];

    document.getElementById("desafio-titulo").innerText = desafioAtual.titulo;
    document.getElementById("desafio-linguagem").innerText = desafioAtual.linguagem.toUpperCase();
    document.getElementById("desafio-instrucao").innerText = desafioAtual.instrucao;
    document.getElementById("desafio-xp").innerText = \`+\${desafioAtual.xp_recompensa} XP\`;
    document.getElementById("codigo-editor").value = desafioAtual.codigo_inicial;

    const boxResultado = document.getElementById("resultado-box");
    boxResultado.className = "resultado-box";
    boxResultado.style.display = "none";
}

async function submeterCodigo() {
    const codigo = document.getElementById("codigo-editor").value;
    const boxResultado = document.getElementById("resultado-box");

    try {
        const resposta = await fetch("api_desafios.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                desafio_id: desafioAtual.id,
                codigo: codigo,
                usuario_id: 1
            })
        });

        const res = await resposta.json();

        if (res.acertou) {
            boxResultado.className = "resultado-box sucesso";
            boxResultado.innerText = \`✅ \${res.mensagem} (+\${res.xp_ganho} XP adicionados!)\`;
            xpUsuario += res.xp_ganho;
            atualizarPlacar();
        } else {
            boxResultado.className = "resultado-box erro";
            boxResultado.innerText = \`❌ \${res.mensagem}\`;
        }
    } catch (e) {
        boxResultado.className = "resultado-box sucesso";
        boxResultado.innerText = "✅ Código aceito no modo simulado local!";
        xpUsuario += desafioAtual.xp_recompensa || 50;
        atualizarPlacar();
    }
}

function atualizarPlacar() {
    document.getElementById("usuario-xp").innerText = \`⭐ \${xpUsuario} XP\`;
    if (xpUsuario >= 300 && nivelUsuario === 1) {
        nivelUsuario = 2;
        document.getElementById("usuario-nivel").innerText = \`Nível \${nivelUsuario} (Júnior)\`;
        alert("🎉 Parabéns! Você subiu para o Nível 2!");
    }
}

function configurarPomodoro() {
    const btnToggle = document.getElementById("btn-pomodoro");
    const displayTimer = document.getElementById("timer-display");

    btnToggle.addEventListener("click", () => {
        if (!pomodoroRodando) {
            pomodoroRodando = true;
            btnToggle.innerText = "Pausar";
            timerInterval = setInterval(() => {
                tempoPomodoro--;
                const min = Math.floor(tempoPomodoro / 60).toString().padStart(2, "0");
                const seg = (tempoPomodoro % 60).toString().padStart(2, "0");
                displayTimer.innerText = \`\${min}:\${seg}\`;

                if (tempoPomodoro <= 0) {
                    clearInterval(timerInterval);
                    alert("⏰ Pomodoro concluído! Hora de descansar 5 minutos e se hidratar.");
                    tempoPomodoro = 25 * 60;
                    pomodoroRodando = false;
                    btnToggle.innerText = "Iniciar";
                }
            }, 1000);
        } else {
            clearInterval(timerInterval);
            pomodoroRodando = false;
            btnToggle.innerText = "Retomar";
        }
    });
}
`,

  "validador_codigo.py": `import sys
import json
import ast

def validar_sintaxe_python(codigo_str):
    try:
        ast.parse(codigo_str)
        return {"valido": True, "erro": None}
    except SyntaxError as e:
        return {"valido": False, "erro": f"Erro de Sintaxe na linha {e.lineno}: {e.msg}"}

def gerar_relatorio_desempenho(tentativas):
    total = len(tentativas)
    if total == 0:
        return {"total": 0, "aproveitamento": 0.0, "por_linguagem": {}}

    acertos = sum(1 for t in tentativas if t.get("acertou", False))
    por_linguagem = {}

    for t in tentativas:
        lang = t.get("linguagem", "outra")
        if lang not in por_linguagem:
            por_linguagem[lang] = {"total": 0, "acertos": 0}
        por_linguagem[lang]["total"] += 1
        if t.get("acertou", False):
            por_linguagem[lang]["acertos"] += 1

    return {
        "total_tentativas": total,
        "total_acertos": acertos,
        "taxa_aproveitamento_percentual": round((acertos / total) * 100, 2),
        "estatisticas_linguagens": por_linguagem
    }

if __name__ == "__main__":
    print("==================================================")
    print("🚀 DevQuest Acadêmico - Módulo Python em Execução")
    print("==================================================")
    codigo_teste = "def soma(a, b):\\n    return a + b"
    print("Validando código:", validar_sintaxe_python(codigo_teste))
`,

  "setup_instalador.py": `import os
import sys
import shutil
import subprocess

def imprimir_banner():
    print("=" * 60)
    print("🚀 DevQuest Acadêmico - Instalador Automático do Projeto")
    print("🎓 Análise e Desenvolvimento de Sistemas (ADS)")
    print("=" * 60)

def verificar_ambiente():
    versao = sys.version_info
    print(f"✔ Python detectado: {versao.major}.{versao.minor}.{versao.micro}")
    return versao.major >= 3

def instalar_dependencias():
    pacotes = ["mysql-connector-python"]
    for pacote in pacotes:
        try:
            print(f"➜ Instalando {pacote}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", pacote, "--quiet"])
            print(f"✔ {pacote} instalado com sucesso!")
        except Exception:
            pass

def verificar_xampp():
    caminhos = [r"C:\\xampp\\htdocs", r"D:\\xampp\\htdocs"]
    encontrado = next((c for c in caminhos if os.path.exists(c)), None)
    if encontrado:
        destino = os.path.join(encontrado, "devquest_academico")
        resp = input(f"Deseja copiar automaticamente para '{destino}'? (s/n): ").strip().lower()
        if resp in ["s", "sim", "y"]:
            os.makedirs(destino, exist_ok=True)
            diretorio_atual = os.path.dirname(os.path.abspath(__file__))
            for item in os.listdir(diretorio_atual):
                o = os.path.join(diretorio_atual, item)
                d = os.path.join(destino, item)
                if os.path.isfile(o):
                    shutil.copy2(o, d)
            print(f"🎉 Arquivos copiados com sucesso para {destino}!")
            print(f"🌐 Abra no navegador: http://localhost/devquest_academico/index.html")

if __name__ == "__main__":
    imprimir_banner()
    if verificar_ambiente():
        instalar_dependencias()
        verificar_xampp()
    print("Instalação concluída com sucesso!")
`,

  "instalar.bat": `@echo off
chcp 65001 > nul
title Instalador DevQuest Academico - ADS
color 0b
echo ============================================================
echo   🚀 DevQuest Academico - Instalador Automatico (ADS)
echo ============================================================
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Python nao encontrado! Instale em https://python.org
    pause
    exit /b
)
python setup_instalador.py
pause
`,

  "README.md": `# 🎓 DevQuest - Versão Acadêmica (ADS)

Arquivos incluídos:
- banco.sql (MySQL)
- conexao.php (PDO)
- api_desafios.php (API PHP)
- index.html (HTML5)
- style.css (CSS3)
- app.js (JavaScript Vanilla)
- validador_codigo.py (Python)
- setup_instalador.py (Instalador Python)
- instalar.bat (Executável Windows)
`
};
