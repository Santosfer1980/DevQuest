# 🎓 DevQuest - Versão Acadêmica (Projeto Integrador / ADS)

Este diretório contém a versão do DevQuest desenvolvida especificamente para atendimento dos requisitos acadêmicos da faculdade, utilizando exclusivamente as tecnologias do currículo: **PHP, Python, HTML5, CSS3, JavaScript e SQL (MySQL)**.

---

## 📁 Estrutura de Arquivos e Papéis de Cada Tecnologia

| Arquivo | Tecnologia | Papel no Projeto Acadêmico |
| :--- | :--- | :--- |
| `index.html` | **HTML5** | Estruturação semântica da interface web (menu lateral, painel e área de código). |
| `style.css` | **CSS3** | Estilização pura, paleta escura moderna, responsividade e layout flexbox. |
| `app.js` | **JavaScript** | Manipulação do DOM, controle do cronômetro Pomodoro e requisições assíncronas (`fetch`). |
| `conexao.php` | **PHP (PDO)** | Conexão segura orientada a objetos com o banco de dados MySQL. |
| `api_desafios.php` | **PHP** | Backend que consulta os desafios e valida as soluções submetidas pelos alunos. |
| `banco.sql` | **SQL (MySQL)** | Script de criação de banco (`devquest_db`), tabelas com chaves estrangeiras e inserts de carga inicial. |
| `validador_codigo.py` | **Python** | Script para análise de sintaxe de código com AST e geração de métricas de aproveitamento. |
| `setup_instalador.py` | **Python** | Instalador e configurador inteligente que verifica o ambiente, instala dependências e copia para o XAMPP. |
| `instalar.bat` | **Batch (Windows)** | Atalho executável do Windows para rodar a instalação com dois cliques. |

---

## ⚡ Instalação Rápida com 1 Comando (Python)

Se você já baixou ou clonou o projeto, basta abrir o terminal dentro da pasta `academico` e digitar:
```bash
python setup_instalador.py
```
*(Ou dê 2 cliques no arquivo `instalar.bat` se estiver no Windows)*

O script fará:
1. Verificação da versão do Python.
2. Instalação automática do pacote `mysql-connector-python`.
3. Detecção da sua pasta `C:\xampp\htdocs\`.
4. Cópia automática dos arquivos para a pasta de execução do Apache!

---

## 🚀 Como Rodar no XAMPP do seu Computador (Passo a Passo Manual)

1. **Copiar os arquivos para a pasta do Apache**:
   - Crie uma pasta chamada `devquest_academico` dentro de `C:\xampp\htdocs\`.
   - Copie todos os arquivos desta pasta `academico` para lá.

2. **Subir o Banco de Dados no MySQL**:
   - Abra o **XAMPP Control Panel** e clique em **Start** no Apache e no MySQL.
   - Abra o navegador em `http://localhost/phpmyadmin`.
   - Clique em **Importar** e selecione o arquivo `banco.sql`.

3. **Acessar o Projeto**:
   - Abra no navegador: `http://localhost/devquest_academico/index.html`.

4. **Rodar o Módulo Python**:
   - Abra o terminal na pasta do projeto e execute:
   ```bash
   python validador_codigo.py
   ```
