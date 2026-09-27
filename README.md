# 🚀 DevQuest Platform

> **Plataforma Gamificada de Aprendizado Prático em Tecnologia & Análise e Desenvolvimento de Sistemas (ADS)**

[![GitHub Repo](https://img.shields.io/badge/GitHub-Santosfer1980%2FDevQuest-181717?style=flat&logo=github)](https://github.com/Santosfer1980/DevQuest)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📌 Sobre o Projeto

O **DevQuest** é uma plataforma educacional aberta e interativa projetada para acelerar a formação prática de estudantes e desenvolvedores de software. O projeto foca no aprendizado de programação baseado em desafios práticos de código, gamificação e produtividade sustentável através da técnica de Pomodoro e incentivos à saúde mental.

### 🌟 Pilares Curriculares & Ferramentas
A plataforma cobre os pilares essenciais do desenvolvimento moderno e da vida universitária:
- 🌐 **HTML & CSS (10 Lições)**: Estruturação semântica, formulários, Box Model, Flexbox e CSS Grid.
- ⚡ **JavaScript (10 Lições)**: Lógica, DOM (`getElementById`, `addEventListener`), arrow functions e coleções.
- 🐘 **PHP (10 Lições)**: Saída, formulários `$_POST`, sessões, conexões PDO e sanitização de dados.
- 🐍 **Python (10 Lições)**: Lógica algorítmica, loops (`range`), listas, dicionários e f-strings.
- 🗄️ **SQL (10 Lições)**: Consultas `SELECT`, filtros `WHERE`, `JOINs`, agrupamento e DDL (`CREATE TABLE`).
- 🎓 **Simulador Oficial ENADE ADS**: Banco de questões aplicadas pelo INEP/MEC com justificativas pedagógicas detalhadas.
- 📊 **Boletim & Calculadora A1/A2**: Acompanhamento de notas da faculdade, cálculo de nota para aprovação e controle de faltas (presença mínima 75%).
- 🌐 **Central de Recursos & Repositórios**: Curadoria de links oficiais (INEP, Python Brasil Wiki, MDN Web Docs e W3Schools).

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19 com TypeScript
- **Build Tool**: Vite 6 (ultra-rápido com HMR)
- **Estilização**: Tailwind CSS v4 & Lucide React (ícones vetoriais)
- **Animações & Efeitos**: Motion (`motion/react`) e Canvas Confetti
- **Persistência**: LocalStorage com sincronização automática e suporte a integração externa

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Ter o **[Node.js](https://nodejs.org)** (versão 18 ou superior) instalado no computador.
- Ter o **[Git](https://git-scm.com)** instalado.

### Passo a Passo

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/Santosfer1980/DevQuest.git
   ```

2. **Entrar na pasta do projeto**:
   ```bash
   cd DevQuest
   ```

3. **Instalar as dependências**:
   ```bash
   npm install
   ```

4. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Acessar no navegador**:
   Abra `http://localhost:3000` (ou o endereço indicado no terminal) para visualizar a plataforma rodando localmente na sua máquina!

---

## 🔄 Fluxo de Trabalho com o Git

### 📥 Puxar atualizações mais recentes da nuvem para o seu computador:
Sempre que fizer alterações no Google AI Studio ou no GitHub, execute na pasta do projeto:
```bash
git pull
```

### 📤 Enviar alterações feitas no seu computador para o GitHub:
```bash
git add .
git commit -m "feat: descrição da melhoria realizada"
git push origin main
```

---

## 📂 Estrutura de Pastas

```text
DevQuest/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes modulares de cada área
│   │   ├── DashboardView.tsx   # Painel principal e metas diárias
│   │   ├── GithubHubView.tsx   # Hub de integração Git & GitHub
│   │   ├── HistoriaView.tsx    # Biblioteca dos pioneiros da computação
│   │   ├── LandingView.tsx     # Tela inicial, missão e autenticação
│   │   ├── LojaView.tsx        # Recompensas de foco e pausas saudáveis
│   │   ├── QuizView.tsx        # Arena conceitual e desafios teóricos
│   │   ├── Sidebar.tsx         # Navegação lateral com status do jogador
│   │   └── TrilhasView.tsx     # Desafios interativos de código
│   ├── data/
│   │   └── initialData.ts  # Desafios, marcos históricos e questões
│   ├── App.tsx             # Componente raiz e gerenciamento de estado
│   ├── types.ts            # Definições de tipos TypeScript
│   ├── main.tsx            # Ponto de entrada React
│   └── index.css           # Estilos globais Tailwind
├── index.html              # HTML de entrada
├── metadata.json           # Metadados da aplicação
├── package.json            # Dependências e scripts
└── README.md               # Este arquivo de documentação
```

---

## 👨‍💻 Autor & Repositório Oficial

- **Autor**: Fernando Santos ([@Santosfer1980](https://github.com/Santosfer1980))
- **Repositório GitHub**: [https://github.com/Santosfer1980/DevQuest](https://github.com/Santosfer1980/DevQuest)

---

*DevQuest — Do código básico ao portfólio profissional com consistência diária.*
