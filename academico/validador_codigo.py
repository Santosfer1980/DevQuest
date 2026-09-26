"""
DevQuest Acadêmico - Módulo de Suporte & Análise em Python
Disciplina: Análise e Desenvolvimento de Sistemas (ADS)
Autor: Fernando Santos

Função no Projeto:
1. Validação estática de sintaxe de códigos submetidos pelos alunos.
2. Cálculo estatístico de taxa de conclusão e desempenho por linguagem.
"""

import sys
import json
import ast

def validar_sintaxe_python(codigo_str):
    """Verifica se o código submetido em Python possui erros de sintaxe reais usando o AST."""
    try:
        ast.parse(codigo_str)
        return {"valido": True, "erro": None}
    except SyntaxError as e:
        return {"valido": False, "erro": f"Erro de Sintaxe na linha {e.lineno}: {e.msg}"}

def gerar_relatorio_desempenho(tentativas):
    """
    Processa um conjunto de tentativas dos alunos e calcula estatísticas
    para relatórios acadêmicos.
    """
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

    # Teste 1: Testando o validador com um código Python
    codigo_teste = """
def calcular_media(nota1, nota2):
    return (nota1 + nota2) / 2
"""
    print("\n[1] Validando código Python com ast.parse():")
    res_sintaxe = validar_sintaxe_python(codigo_teste)
    print("Resultado:", res_sintaxe)

    # Teste 2: Processando estatísticas acadêmicas simuladas
    dados_simulados = [
        {"linguagem": "php", "acertou": True},
        {"linguagem": "php", "acertou": False},
        {"linguagem": "javascript", "acertou": True},
        {"linguagem": "python", "acertou": True},
        {"linguagem": "sql", "acertou": True},
        {"linguagem": "html_css", "acertou": True},
    ]

    print("\n[2] Gerando relatório acadêmico de desempenho dos alunos:")
    relatorio = gerar_relatorio_desempenho(dados_simulados)
    print(json.dumps(relatorio, indent=4, ensure_ascii=False))
    print("\nProcessamento concluído com sucesso!")
