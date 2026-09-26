<?php
/**
 * DevQuest Acadêmico - Backend API para Desafios e Submissões
 * Tecnologia: PHP Puro + PDO (Prepared Statements)
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/conexao.php';

// Caso o banco ainda não tenha sido importado no MySQL/XAMPP, retorna fallback simulado para não travar
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
                'codigo_inicial' => 'function somar(a, b) {\n  // seu código\n}',
                'gabarito_esperado' => 'return a + b;',
                'xp_recompensa' => 60
            ],
            [
                'id' => 3,
                'titulo' => 'Comando Echo em PHP',
                'linguagem' => 'php',
                'instrucao' => 'Exiba a frase Olá, DevQuest!',
                'codigo_inicial' => '<?php\n// seu código\n?>',
                'gabarito_esperado' => 'echo "Olá, DevQuest!";',
                'xp_recompensa' => 60
            ]
        ]
    ]);
    exit;
}

$metodo = $_SERVER['REQUEST_METHOD'];

// 1. GET: Retornar lista de desafios do banco SQL
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

// 2. POST: Validar submissão de código do aluno e gravar tentativa
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

    // Busca o gabarito no banco
    $stmt = $pdo->prepare("SELECT gabarito_esperado, xp_recompensa FROM desafios WHERE id = ?");
    $stmt->execute([$desafioId]);
    $desafio = $stmt->fetch();

    if (!$desafio) {
        http_response_code(404);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Desafio não encontrado.']);
        exit;
    }

    // Normaliza os textos para comparação tolerante a espaços em branco
    $esperado = preg_replace('/\s+/', '', strtolower($desafio['gabarito_esperado']));
    $recebido = preg_replace('/\s+/', '', strtolower($codigoSubmetido));

    $acertou = (strpos($recebido, $esperado) !== false || $recebido === $esperado) ? 1 : 0;

    // Registra a tentativa na tabela tentativas_desafios
    $stmtTentativa = $pdo->prepare("INSERT INTO tentativas_desafios (usuario_id, desafio_id, codigo_submetido, acertou) VALUES (?, ?, ?, ?)");
    $stmtTentativa->execute([$usuarioId, $desafioId, $codigoSubmetido, $acertou]);

    // Se acertou, incrementa o XP do usuário na tabela usuarios
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
