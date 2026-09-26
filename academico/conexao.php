<?php
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
    // Se o banco ainda não estiver criado, responde com mensagem amigável em JSON ou texto
    $erroConexao = $e->getMessage();
}
?>
