"""
DevQuest Acadêmico - Instalador & Configuração Automática em Python
Disciplina: Análise e Desenvolvimento de Sistemas (ADS)
Autor: Fernando Santos

Instruções:
Basta executar: python setup_instalador.py
"""

import os
import sys
import shutil
import subprocess

def imprimir_banner():
    print("=" * 60)
    print("🚀 DevQuest Acadêmico - Instalador Automático do Projeto")
    print("🎓 Análise e Desenvolvimento de Sistemas (ADS)")
    print("=" * 60)

def verificar_ambiente():
    print("\n[1/4] Verificando versão do Python...")
    versao = sys.version_info
    print(f"  ✔ Python detectado: {versao.major}.{versao.minor}.{versao.micro}")
    if versao.major < 3:
        print("  ❌ Erro: É necessário Python 3 ou superior.")
        return False
    return True

def instalar_dependencias():
    print("\n[2/4] Verificando e instalando pacotes úteis para o projeto...")
    pacotes = ["mysql-connector-python"]
    for pacote in pacotes:
        try:
            print(f"  ➜ Instalando {pacote} via pip...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", pacote, "--quiet"])
            print(f"  ✔ {pacote} instalado com sucesso!")
        except Exception as e:
            print(f"  ⚠ Aviso: Não foi possível instalar {pacote} automaticamente (opcional).")

def verificar_xampp():
    print("\n[3/4] Verificando se o XAMPP está instalado no computador...")
    caminhos_xampp = [
        r"C:\xampp\htdocs",
        r"D:\xampp\htdocs",
        r"C:\Xampp\htdocs"
    ]
    
    encontrado = None
    for caminho in caminhos_xampp:
        if os.path.exists(caminho):
            encontrado = caminho
            break
            
    if encontrado:
        print(f"  ✔ Diretório do XAMPP encontrado em: {encontrado}")
        destino = os.path.join(encontrado, "devquest_academico")
        
        resposta = input(f"\n  Deseja copiar automaticamente os arquivos para '{destino}'? (s/n): ").strip().lower()
        if resposta in ["s", "sim", "y", "yes"]:
            try:
                diretorio_atual = os.path.dirname(os.path.abspath(__file__))
                if not os.path.exists(destino):
                    os.makedirs(destino)
                
                for item in os.listdir(diretorio_atual):
                    origem_item = os.path.join(diretorio_atual, item)
                    destino_item = os.path.join(destino, item)
                    if os.path.isfile(origem_item):
                        shutil.copy2(origem_item, destino_item)
                print(f"  🎉 Sucesso! Arquivos copiados para {destino}")
                print(f"  🌐 Acesse no navegador: http://localhost/devquest_academico/index.html")
            except Exception as e:
                print(f"  ❌ Erro ao copiar: {e}")
    else:
        print("  ℹ Pasta htdocs do XAMPP não encontrada automaticamente.")
        print("  Você pode copiar os arquivos desta pasta manualmente para a pasta do seu servidor.")

def executar_testes_locais():
    print("\n[4/4] Executando teste do módulo acadêmico de validação...")
    try:
        diretorio_atual = os.path.dirname(os.path.abspath(__file__))
        caminho_validador = os.path.join(diretorio_atual, "validador_codigo.py")
        if os.path.exists(caminho_validador):
            subprocess.run([sys.executable, caminho_validador])
    except Exception as e:
        print(f"  ⚠ Não foi possível executar o validador: {e}")

if __name__ == "__main__":
    imprimir_banner()
    if verificar_ambiente():
        instalar_dependencias()
        verificar_xampp()
        executar_testes_locais()
        
    print("\n" + "=" * 60)
    print("✅ Processo de instalação e verificação finalizado!")
    print("=" * 60)
    input("\nPressione ENTER para sair...")
