import { EstadoJogo, QuestaoQuiz, MarcoHistorico, LivroRecomendado, TrilhaInfo, DesafioCodigo } from '../types';

export const TRILHAS_DISPONIVEIS: TrilhaInfo[] = [
  {
    id: 'html_css',
    nome: 'HTML5 & CSS3',
    sigla: 'HTML / CSS',
    area: 'Frontend',
    cor: '#F97316', // Laranja
    descricao: 'Semântica da web, estilização moderna com seletores, caixas e layout responsivo.',
    nivelRequerido: 1
  },
  {
    id: 'javascript',
    nome: 'JavaScript Moderno (ES6+)',
    sigla: 'JS',
    area: 'Frontend',
    cor: '#FACC15', // Amarelo
    descricao: 'Interatividade no navegador, manipulação da árvore DOM, eventos e lógica assíncrona.',
    nivelRequerido: 1
  },
  {
    id: 'php',
    nome: 'Backend com PHP',
    sigla: 'PHP',
    area: 'Backend',
    cor: '#818CF8', // Índigo/Roxo PHP
    descricao: 'Programação de servidor web, manipulação de formulários ($_POST/$_GET) e sessões.',
    nivelRequerido: 1
  },
  {
    id: 'python',
    nome: 'Python & Algoritmos',
    sigla: 'PY',
    area: 'Backend',
    cor: '#10B981', // Esmeralda Python
    descricao: 'Fundamentos de lógica, estruturas condicionais, laços, coleções e funções puras.',
    nivelRequerido: 1
  },
  {
    id: 'sql',
    nome: 'Bancos de Dados & SQL',
    sigla: 'SQL',
    area: 'Banco de Dados',
    cor: '#06B6D4', // Ciano SQL
    descricao: 'Consultas relacionais (SELECT, WHERE, JOIN), modelagem e manipulação de tabelas.',
    nivelRequerido: 1
  }
];

export const DESAFIOS_INICIAIS: DesafioCodigo[] = [
  // ── HTML & CSS ──
  {
    id: 'hc-1',
    linguagem: 'html_css',
    numero: 1,
    titulo: '1. Botão de Ação Semântico',
    enunciado: 'Crie uma tag de botão HTML com o texto <code>Enviar Projeto</code>.',
    codigoPadrao: '<button>...</button>',
    codigoCorreto: '<button>Enviar Projeto</button>',
    dicaPedagogica: 'Use a tag <button> e feche com </button> envolvendo o texto exato "Enviar Projeto".',
    exemploSaida: '<button>Enviar Projeto</button>',
    recompensaXP: 25,
    recompensaGold: 15,
    concluido: false,
    disponivel: true
  },
  {
    id: 'hc-2',
    linguagem: 'html_css',
    numero: 2,
    titulo: '2. Estilizando Cor de Fundo em CSS',
    enunciado: 'Escreva a regra CSS para definir a cor de fundo (<code>background-color</code>) do elemento <code>.card</code> como <code>#1e293b</code>.',
    codigoPadrao: '.card {\n  /* sua propriedade aqui */\n}',
    codigoCorreto: 'background-color: #1e293b;',
    dicaPedagogica: 'A propriedade CSS é background-color: #1e293b; (não se esqueça do ponto e vírgula).',
    exemploSaida: '.card { background-color: #1e293b; }',
    recompensaXP: 30,
    recompensaGold: 15,
    concluido: false,
    disponivel: false
  },
  {
    id: 'hc-3',
    linguagem: 'html_css',
    numero: 3,
    titulo: '3. Alinhamento com Flexbox',
    enunciado: 'Defina o display de um container para <code>flex</code> em CSS.',
    codigoPadrao: '.container {\n  \n}',
    codigoCorreto: 'display: flex;',
    dicaPedagogica: 'Utilize a propriedade nativa do CSS: display: flex;',
    exemploSaida: 'display: flex;',
    recompensaXP: 35,
    recompensaGold: 20,
    concluido: false,
    disponivel: false
  },

  // ── JAVASCRIPT ──
  {
    id: 'js-1',
    linguagem: 'javascript',
    numero: 1,
    titulo: '1. Constante Imutável no ES6',
    enunciado: 'Declare uma constante chamada <code>apiUrl</code> com o valor <code>"/api/dados"</code>.',
    codigoPadrao: '// Declare a constante com const\n',
    codigoCorreto: 'const apiUrl = "/api/dados";',
    dicaPedagogica: 'No JavaScript moderno usamos const para variáveis imutáveis: const apiUrl = "/api/dados";',
    exemploSaida: 'apiUrl -> "/api/dados"',
    recompensaXP: 25,
    recompensaGold: 15,
    concluido: false,
    disponivel: true
  },
  {
    id: 'js-2',
    linguagem: 'javascript',
    numero: 2,
    titulo: '2. Capturando Elemento pelo ID no DOM',
    enunciado: 'Use o método do <code>document</code> para capturar o elemento com id <code>"btn-salvar"</code>.',
    codigoPadrao: 'const botao = document...',
    codigoCorreto: 'document.getElementById("btn-salvar")',
    dicaPedagogica: 'Use document.getElementById("btn-salvar") ou document.querySelector("#btn-salvar").',
    exemploSaida: 'HTMLButtonElement',
    recompensaXP: 35,
    recompensaGold: 20,
    concluido: false,
    disponivel: false
  },
  {
    id: 'js-3',
    linguagem: 'javascript',
    numero: 3,
    titulo: '3. Arrow Function com Retorno Implícito',
    enunciado: 'Crie uma arrow function chamada <code>dobrar</code> que recebe <code>x</code> e retorna <code>x * 2</code>.',
    codigoPadrao: 'const dobrar = ...',
    codigoCorreto: 'const dobrar = x => x * 2;',
    dicaPedagogica: 'Arrow function simplificada: const dobrar = x => x * 2; ou const dobrar = (x) => x * 2;',
    exemploSaida: 'dobrar(4) -> 8',
    recompensaXP: 40,
    recompensaGold: 20,
    concluido: false,
    disponivel: false
  },

  // ── PHP ──
  {
    id: 'php-1',
    linguagem: 'php',
    numero: 1,
    titulo: '1. Saída de Texto com Echo',
    enunciado: 'Escreva a instrução PHP para exibir a string <code>"Bem-vindo ao DevQuest!"</code>.',
    codigoPadrao: '<?php\n// Imprima na tela\n',
    codigoCorreto: 'echo "Bem-vindo ao DevQuest!";',
    dicaPedagogica: 'Em PHP, a instrução de saída principal é echo: echo "Bem-vindo ao DevQuest!"; com ponto e vírgula obrigatório.',
    exemploSaida: 'Bem-vindo ao DevQuest!',
    recompensaXP: 30,
    recompensaGold: 15,
    concluido: false,
    disponivel: true
  },
  {
    id: 'php-2',
    linguagem: 'php',
    numero: 2,
    titulo: '2. Capturando Dados de Formulário ($_POST)',
    enunciado: 'Acesse o campo <code>"email"</code> enviado pelo array global <code>$_POST</code> e armazene na variável <code>$email</code>.',
    codigoPadrao: '$email = ...',
    codigoCorreto: '$email = $_POST["email"];',
    dicaPedagogica: 'Variáveis em PHP começam com $ e o array é $_POST["email"];',
    exemploSaida: '$email -> usuario@dominio.com',
    recompensaXP: 35,
    recompensaGold: 20,
    concluido: false,
    disponivel: false
  },
  {
    id: 'php-3',
    linguagem: 'php',
    numero: 3,
    titulo: '3. Inicialização de Sessão',
    enunciado: 'Chame a função nativa do PHP responsável por iniciar ou retomar uma sessão de usuário.',
    codigoPadrao: '// Inicialize a sessão\n',
    codigoCorreto: 'session_start();',
    dicaPedagogica: 'A função nativa para controle de estado no PHP é session_start();',
    exemploSaida: 'Sessão PHP ativada',
    recompensaXP: 40,
    recompensaGold: 25,
    concluido: false,
    disponivel: false
  },

  // ── PYTHON ──
  {
    id: 'py-1',
    linguagem: 'python',
    numero: 1,
    titulo: '1. Variável de Identificação do Herói',
    enunciado: 'Crie uma variável chamada <code>heroi</code> que armazene a string <code>"Fernando"</code>.',
    codigoPadrao: '# Declare a variável heroi\n',
    codigoCorreto: "heroi = 'Fernando'",
    dicaPedagogica: 'Em Python atribuímos com o sinal de igual (=): heroi = "Fernando" ou heroi = \'Fernando\'',
    exemploSaida: "heroi -> 'Fernando'",
    recompensaXP: 25,
    recompensaGold: 15,
    concluido: false,
    disponivel: true
  },
  {
    id: 'py-2',
    linguagem: 'python',
    numero: 2,
    titulo: '2. Operações Aritméticas Básicas',
    enunciado: 'Calcule a vida final: subtraia <code>dano</code> de <code>vida</code> e salve em <code>resultado</code>.',
    codigoPadrao: '# resultado = ...\n',
    codigoCorreto: 'resultado = vida - dano',
    dicaPedagogica: 'Utilize o operador de subtração (-): resultado = vida - dano',
    exemploSaida: 'resultado -> vida - dano',
    recompensaXP: 30,
    recompensaGold: 15,
    concluido: false,
    disponivel: false
  },
  {
    id: 'py-3',
    linguagem: 'python',
    numero: 3,
    titulo: '3. Estrutura Condicional If',
    enunciado: 'Escreva a linha de cabeçalho do <code>if</code> que testa se <code>nivel >= 5</code>.',
    codigoPadrao: '# Condição if com dois pontos\n',
    codigoCorreto: 'if nivel >= 5:',
    dicaPedagogica: 'Lembre-se dos dois pontos (:) obrigatórios no final da linha em Python: if nivel >= 5:',
    exemploSaida: 'Condicional configurada',
    recompensaXP: 40,
    recompensaGold: 20,
    concluido: false,
    disponivel: false
  },

  // ── SQL ──
  {
    id: 'sql-1',
    linguagem: 'sql',
    numero: 1,
    titulo: '1. Consulta Básica de Tabela (SELECT)',
    enunciado: 'Selecione todas as colunas da tabela de <code>alunos</code>.',
    codigoPadrao: '-- Escreva a query SQL\n',
    codigoCorreto: 'SELECT * FROM alunos;',
    dicaPedagogica: 'O asterisco (*) projeta todas as colunas: SELECT * FROM alunos; (com ou sem ponto e vírgula).',
    exemploSaida: 'Retorna todas as linhas e colunas de alunos',
    recompensaXP: 30,
    recompensaGold: 15,
    concluido: false,
    disponivel: true
  },
  {
    id: 'sql-2',
    linguagem: 'sql',
    numero: 2,
    titulo: '2. Filtro com Cláusula WHERE',
    enunciado: 'Escreva a query para buscar alunos onde a <code>nota >= 7</code>.',
    codigoPadrao: '-- Filtre pela nota\n',
    codigoCorreto: 'SELECT * FROM alunos WHERE nota >= 7;',
    dicaPedagogica: 'Use a cláusula WHERE: SELECT * FROM alunos WHERE nota >= 7;',
    exemploSaida: 'Filtra alunos aprovados com nota >= 7',
    recompensaXP: 35,
    recompensaGold: 20,
    concluido: false,
    disponivel: false
  },
  {
    id: 'sql-3',
    linguagem: 'sql',
    numero: 3,
    titulo: '3. Inserção de Dados (INSERT INTO)',
    enunciado: 'Insira um registro na tabela <code>cursos</code> com a coluna <code>nome</code> valendo <code>"ADS"</code>.',
    codigoPadrao: '-- INSERT INTO cursos ...\n',
    codigoCorreto: "INSERT INTO cursos (nome) VALUES ('ADS');",
    dicaPedagogica: 'Sintaxe padrão: INSERT INTO cursos (nome) VALUES (\'ADS\');',
    exemploSaida: '1 linha inserida com sucesso',
    recompensaXP: 45,
    recompensaGold: 25,
    concluido: false,
    disponivel: false
  }
];

export const ESTADO_INICIAL: EstadoJogo = {
  usuarioNome: "Fernando Santos",
  usuarioEmail: "fernando.dev@exemplo.com",
  avatarUrl: "",
  isAuthenticated: false,
  nivel: 1,
  xp: 120,
  xpLimite: 500,
  gold: 150,
  streak: 3,
  notasBloco: "# Diário de Estudos - Faculdade de ADS\n\n- Frontend: Praticar semântica em HTML5 e seletores CSS modernos\n- JavaScript: Dominar manipulação do DOM e eventos de clique\n- PHP & SQL: Estudar conexão PDO e sanitização de dados com Prepared Statements\n- Python: Resolver desafios lógicos de coleções e laços",
  historiaLida: false,
  livrosLidos: [],
  missoes: [
    { id: 1, texto: "Completar 1 Ciclo Pomodoro de Estudos (25 min)", concluida: false, xpRecompensa: 40, goldRecompensa: 20 },
    { id: 2, texto: "Resgatar uma Auto-Recompensa de Lazer", concluida: false, xpRecompensa: 20, goldRecompensa: 10 },
    { id: 3, texto: "Resolver um Desafio Prático nas Trilhas da Faculdade", concluida: false, xpRecompensa: 35, goldRecompensa: 15 }
  ],
  recompensas: [
    { id: 1, emoji: "☕", nome: "Café Espresso Especial", custo: 40, categoria: "Pausa" },
    { id: 2, emoji: "🎮", nome: "20 min de Videogame", custo: 80, categoria: "Lazer" },
    { id: 3, emoji: "📺", nome: "1 Episódio de Série", custo: 120, categoria: "Lazer" },
    { id: 4, emoji: "🍫", nome: "Chocolate / Doce", custo: 50, categoria: "Alimento" },
    { id: 5, emoji: "🚶‍♂️", nome: "Caminhada ao Ar Livre", custo: 30, categoria: "Saúde" }
  ],
  historicoResgates: [
    {
      id: "resg-1",
      data: "12/09/2026 - 15:30",
      nome: "Café Espresso Especial",
      custo: 40,
      status: "Consumido"
    }
  ],
  quizHP: 100,
  quizRespondido: false,
  questoesRespondidas: [],
  desafios: DESAFIOS_INICIAIS
};

export const BANCO_QUESTOES: QuestaoQuiz[] = [
  {
    id: 1,
    categoria: "Frontend & Web",
    linguagemRelacionada: "HTML/CSS",
    pergunta: "Qual é a principal vantagem de utilizar tags semânticas no HTML5 (como <header>, <main>, <nav> e <article>) em vez de apenas <div> genéricas?",
    opcoes: [
      { texto: "Elas aumentam a velocidade da internet do usuário automaticamente.", correta: false },
      { texto: "Melhoram a acessibilidade para leitores de tela e otimizam a indexação em motores de busca (SEO).", correta: true },
      { texto: "Dispensam completamente a necessidade de escrever CSS para layout.", correta: false },
      { texto: "Permitem rodar código Python diretamente no navegador.", correta: false }
    ],
    explicacao: "A semântica HTML define o significado dos elementos para o navegador, tecnologias assistivas (acessibilidade) e robôs de busca (SEO), estabelecendo uma estrutura clara de conteúdo.",
    recompensaGold: 25,
    recompensaXP: 30
  },
  {
    id: 2,
    categoria: "Backend & Banco de Dados",
    linguagemRelacionada: "SQL / PHP",
    pergunta: "Em sistemas web que utilizam PHP e bancos SQL, qual é a principal razão para utilizar Prepared Statements (Consultas Preparadas)?",
    opcoes: [
      { texto: "Prevenir ataques graves de SQL Injection e tratar os dados de forma segura antes da execução.", correta: true },
      { texto: "Diminuir o tamanho das tabelas gravadas no disco rígido do servidor.", correta: false },
      { texto: "Converter automaticamente consultas SQL em código JavaScript.", correta: false },
      { texto: "Evitar que a página precise carregar arquivos CSS externos.", correta: false }
    ],
    explicacao: "Prepared Statements separam a estrutura da query dos parâmetros de entrada do usuário, neutralizando injeções de SQL maliciosas de forma garantida.",
    recompensaGold: 25,
    recompensaXP: 30
  },
  {
    id: 3,
    categoria: "Lógica & Orientação a Objetos",
    linguagemRelacionada: "Python / JS",
    pergunta: "Em Análise e Desenvolvimento de Sistemas, qual é a função primordial do conceito de Encapsulamento em POO?",
    opcoes: [
      { texto: "Duplicar o código fonte para que ele execute em múltiplos servidores simultaneamente.", correta: false },
      { texto: "Proteger o estado interno de um objeto, controlando o acesso a seus atributos através de métodos específicos (getters/setters).", correta: true },
      { texto: "Transformar variáveis em constantes imutáveis do sistema operacional.", correta: false },
      { texto: "Garantir que o programa funcione mesmo sem conexão com a internet.", correta: false }
    ],
    explicacao: "O encapsulamento restringe o acesso direto aos detalhes de implementação e protege a integridade dos dados internos do objeto.",
    recompensaGold: 25,
    recompensaXP: 30
  }
];

export const MARCOS_HISTORICOS: MarcoHistorico[] = [
  {
    id: 1,
    figura: "Ada Lovelace",
    ano: "1843",
    titulo: "O Primeiro Algoritmo da História",
    tituloHeroico: "A Primeira Alquimista do Código",
    categoria: "Fundamentos",
    descricao: "Escreveu o primeiro algoritmo da humanidade para a Máquina Analítica de Charles Babbage, demonstrando que computadores poderiam manipular símbolos além de números."
  },
  {
    id: 2,
    figura: "Alan Turing",
    ano: "1936",
    titulo: "A Máquina Universal de Turing",
    tituloHeroico: "O Arquiteto da Computação Moderna",
    categoria: "Fundamentos",
    descricao: "Propôs o modelo formal da Máquina de Turing, delimitando o que é algoritmicamente computável e fundando a base teórica de todos os computadores modernos e da IA."
  },
  {
    id: 3,
    figura: "Grace Hopper",
    ano: "1947",
    titulo: "O Primeiro Compilador & O Termo 'Bug'",
    tituloHeroico: "A Desbravadora dos Compiladores",
    categoria: "Linguagens",
    descricao: "Criou o primeiro compilador da história (A-0) e auxiliou no desenvolvimento do COBOL. Ficou célebre por registrar uma mariposa presa em um relé eletromecânico, popularizando o termo 'bug'."
  },
  {
    id: 4,
    figura: "Dennis Ritchie",
    ano: "1972",
    titulo: "Nascimento da Linguagem C & UNIX",
    tituloHeroico: "O Mestre da Forja de Sistemas",
    categoria: "Linguagens",
    descricao: "Criou nos Bell Labs a linguagem C e co-criou o Unix. A sintaxe de C é a mãe do C++, Java, JavaScript, PHP, C# e a fundação dos kernels do Linux e Windows."
  },
  {
    id: 5,
    figura: "Edgar F. Codd",
    ano: "1974",
    titulo: "O Modelo Relacional e o SQL",
    tituloHeroico: "O Guardião das Bases Relacionais",
    categoria: "Bancos de Dados",
    descricao: "Formulou as 12 regras do modelo relacional na IBM, estabelecendo tabelas, chaves primárias/estrangeiras e a linguagem declarativa SQL utilizada globalmente até hoje."
  },
  {
    id: 6,
    figura: "Guido van Rossum",
    ano: "1991",
    titulo: "Nascimento do Python",
    tituloHeroico: "O Grimório da Simplicidade",
    categoria: "Linguagens",
    descricao: "Desenvolveu o Python com ênfase radical na legibilidade de código ('Readability counts'), criando a linguagem preferida para ciência de dados, IA e automação."
  },
  {
    id: 7,
    figura: "Rasmus Lerdorf",
    ano: "1995",
    titulo: "A Revolução do PHP na Web",
    tituloHeroico: "O Motor Dinâmico da Web",
    categoria: "Linguagens",
    descricao: "Criou o PHP para permitir páginas web dinâmicas conectadas a bancos de dados, impulsionando a explosão da internet aberta e alimentando sistemas como WordPress e Laravel."
  }
];

export const LIVROS_RECOMENDADOS: LivroRecomendado[] = [
  {
    id: 1,
    titulo: "Código Limpo (Clean Code)",
    autor: "Robert C. Martin (Uncle Bob)",
    sinopse: "O guia clássico sobre legibilidade, nomes significativos, funções coesas, tratamento de erros e a arte do artesanato de software.",
    icone: "📗",
    xpRecompensa: 25
  },
  {
    id: 2,
    titulo: "Entendendo Algoritmos",
    autor: "Aditya Y. Bhargava",
    sinopse: "Um guia ilustrado e didático sobre algoritmos de busca binária, grafos, ordenação e notação Big-O essencial para quem estuda ADS.",
    icone: "📘",
    xpRecompensa: 25
  },
  {
    id: 3,
    titulo: "O Programador Pragmático",
    autor: "Andrew Hunt & David Thomas",
    sinopse: "Conselhos fundamentais sobre postura técnica, combate ao código podre ('broken windows'), automação e desenvolvimento profissional contínuo.",
    icone: "📙",
    xpRecompensa: 25
  },
  {
    id: 4,
    titulo: "Padrões de Projeto (Design Patterns)",
    autor: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides (GoF)",
    sinopse: "O catálogo definitivo de 23 padrões arquiteturais para resolver problemas recorrentes de engenharia e modelagem orientada a objetos.",
    icone: "📕",
    xpRecompensa: 25
  }
];
