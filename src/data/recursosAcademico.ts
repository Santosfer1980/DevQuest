import { RecursoRepositorio, QuestaoSimuladoEnade, DisciplinaAcademica } from '../types';

export const RECURSOS_REPOSITORIOS: RecursoRepositorio[] = [
  // Provas & Gabaritos Oficiais
  {
    id: 'enade-inep-oficial',
    titulo: 'Portal INEP / RIEP - Provas do ENADE (ADS)',
    categoria: 'Provas & Gabaritos',
    descricao: 'Repositório institucional com todas as edições anteriores das provas do ENADE para Tecnologia em Análise e Desenvolvimento de Sistemas com caderno de questões e gabaritos comentados.',
    url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enade/provas-e-gabaritos',
    tag: 'Oficial INEP / MEC',
    icone: 'GraduationCap'
  },
  {
    id: 'enade-padrao-respostas',
    titulo: 'Padrão de Resposta Discursiva ENADE - Computação',
    categoria: 'Provas & Gabaritos',
    descricao: 'Critérios de correção das questões discursivas de engenharia de software, modelagem relacional e lógica algorítmica para concursos e ENADE.',
    url: 'https://www.gov.br/inep/pt-br',
    tag: 'Critérios & Barema',
    icone: 'FileCheck'
  },

  // Exercícios Oficiais & Bancos de Prática
  {
    id: 'python-brasil-exercicios',
    titulo: 'Python Brasil Wiki - Lista Oficial de Exercícios',
    categoria: 'Exercícios Oficiais',
    descricao: 'A maior e mais respeitada coletânea de exercícios de programação em língua portuguesa: Estrutura Sequencial, Decisão, Repetição, Listas, Funções e Arquivos.',
    url: 'https://wiki.python.org.br/ListaDeExercicios',
    tag: 'Python Brasil (Comunidade)',
    icone: 'Code2'
  },
  {
    id: 'w3schools-sql-exercises',
    titulo: 'W3Schools SQL Quiz & Practice Database',
    categoria: 'Exercícios Oficiais',
    descricao: 'Banco de dados interativo com exercícios diretos de SELECT, WHERE, JOINs, GROUP BY, INSERT e normalização relacional com execução imediata no navegador.',
    url: 'https://www.w3schools.com/sql/sql_exercises.asp',
    tag: 'SQL Sandbox',
    icone: 'Database'
  },
  {
    id: 'freecodecamp-web',
    titulo: 'freeCodeCamp - Responsive Web Design & JavaScript',
    categoria: 'Exercícios Oficiais',
    descricao: 'Currículo internacional certificado gratuito com centenas de lições hands-on cobrindo HTML5 Semântico, CSS Flexbox/Grid e Algoritmos com JavaScript.',
    url: 'https://www.freecodecamp.org/portuguese/learn/',
    tag: 'Certificação Grátis',
    icone: 'Globe'
  },

  // Documentação Oficial & Cheat Sheets
  {
    id: 'mdn-web-docs',
    titulo: 'MDN Web Docs (Mozilla) - HTML, CSS & JavaScript',
    categoria: 'Documentação Oficial',
    descricao: 'A bíblia definitiva e documentação oficial mais completa para desenvolvimento Web, com exemplos atualizados para HTML5, CSS3 moderno e ES2024.',
    url: 'https://developer.mozilla.org/pt-BR/',
    tag: 'Referência Mundial',
    icone: 'BookOpen'
  },
  {
    id: 'python-docs-pt',
    titulo: 'Documentação Oficial do Python 3 (em Português)',
    categoria: 'Documentação Oficial',
    descricao: 'Tutorial oficial da linguagem, biblioteca padrão (math, os, json, datetime), estruturas de dados e documentação completa mantida pela Python Software Foundation.',
    url: 'https://docs.python.org/pt-br/3/',
    tag: 'Python Foundation',
    icone: 'Terminal'
  },
  {
    id: 'php-manual-pt',
    titulo: 'Manual Oficial do PHP (Documentação em Português)',
    categoria: 'Documentação Oficial',
    descricao: 'Guia completo de manipulação de formulários ($_POST, $_GET), PDO para banco de dados seguro, sessões de usuário e funções de array/string.',
    url: 'https://www.php.net/manual/pt_BR/',
    tag: 'PHP.net Oficial',
    icone: 'Server'
  },

  // Repositórios GitHub
  {
    id: 'devquest-github-repo',
    titulo: 'Repositório do DevQuest no GitHub (Seu Projeto)',
    categoria: 'Repositórios GitHub',
    descricao: 'Seu repositório com todo o código fonte deste portal acadêmico, scripts PHP de conexão, banco.sql estruturado e trilhas curriculares.',
    url: 'https://github.com/Santosfer1980/DevQuest',
    tag: 'Seu Repositório',
    icone: 'FolderGit2'
  },
  {
    id: 'github-awesome-python',
    titulo: 'Awesome Python - Curadoria de Bibliotecas & Projetos',
    categoria: 'Repositórios GitHub',
    descricao: 'Repositório aberto no GitHub reunindo os melhores frameworks, ferramentas educacionais, scripts e bibliotecas do ecossistema Python no mundo.',
    url: 'https://github.com/vinta/awesome-python',
    tag: 'Open Source',
    icone: 'FolderGit2'
  }
];

export const QUESTOES_SIMULADO_ENADE: QuestaoSimuladoEnade[] = [
  {
    id: 101,
    anoEnade: 'ENADE ADS - Questão 12',
    disciplina: 'Engenharia de Software & Metodologias Ágeis',
    banca: 'INEP / MEC',
    enunciado: 'Em um projeto de desenvolvimento de software utilizando o framework Scrum para uma aplicação corporativa, a equipe realizou a Sprint Review e a Sprint Retrospective. Qual é o objetivo primordial da reunião de Retrospectiva da Sprint (Sprint Retrospective)?',
    opcoes: [
      { letra: 'A', texto: 'Demonstrar os incrementos de software prontos aos stakeholders e clientes para obter aprovação do produto.', correta: false },
      { letra: 'B', texto: 'Inspecionar o processo de trabalho da equipe (pessoas, relacionamentos, ferramentas e processos) e planejar melhorias contínuas para a próxima Sprint.', correta: true },
      { letra: 'C', texto: 'Priorizar e estimar o esforço de todos os itens do Product Backlog para os próximos seis meses.', correta: false },
      { letra: 'D', texto: 'Atribuir individualmente as tarefas de código que cada desenvolvedor executará na próxima semana.', correta: false },
      { letra: 'E', texto: 'Definir o valor monetário de remuneração da equipe com base nos Story Points entregues.', correta: false }
    ],
    justificativaPedagogica: 'No Scrum Guide oficial, a Sprint Retrospective tem como objetivo exclusivo a melhoria do processo interno da equipe: o time analisa como foi a última Sprint em relação a pessoas, processos e ferramentas, identificando pontos positivos e implementando um plano de melhoria contínua para a próxima Sprint. A demonstração de software aos clientes ocorre na Sprint Review.',
    dificuldade: 'Média',
    recompensaXP: 50,
    recompensaGold: 30
  },
  {
    id: 102,
    anoEnade: 'ENADE ADS - Questão 18',
    disciplina: 'Banco de Dados Relacional & SQL',
    banca: 'INEP / MEC',
    enunciado: 'Considere duas tabelas em um banco de dados relacional: "Alunos" (id, nome) e "Matriculas" (id, aluno_id, curso, data_matricula). Deseja-se listar o nome de TODOS os alunos cadastrados no sistema, inclusive aqueles que ainda NÃO possuem nenhuma matrícula efetuada. Qual cláusula JOIN deve ser utilizada partindo da tabela Alunos?',
    codigoTrecho: 'SELECT A.nome, M.curso \nFROM Alunos A \n[ ??? ] Matriculas M ON A.id = M.aluno_id;',
    opcoes: [
      { letra: 'A', texto: 'INNER JOIN', correta: false },
      { letra: 'B', texto: 'CROSS JOIN', correta: false },
      { letra: 'C', texto: 'LEFT OUTER JOIN (ou LEFT JOIN)', correta: true },
      { letra: 'D', texto: 'RIGHT JOIN se Alunos for a primeira tabela declarada.', correta: false },
      { letra: 'E', texto: 'FULL JOIN obrigatório, pois nenhuma outra instrução suporta nulos.', correta: false }
    ],
    justificativaPedagogica: 'O LEFT JOIN (ou LEFT OUTER JOIN) preserva todas as tuplas da tabela à esquerda (neste caso, "Alunos"), mesmo quando não houver correspondência na tabela à direita ("Matriculas"). Nos registros sem correspondência, os atributos de "Matriculas" serão preenchidos com NULL, garantindo que os alunos sem matrícula também apareçam no relatório.',
    dificuldade: 'Média',
    recompensaXP: 50,
    recompensaGold: 30
  },
  {
    id: 103,
    anoEnade: 'ENADE ADS - Questão 24',
    disciplina: 'Lógica de Programação & Algoritmos',
    banca: 'INEP / MEC',
    enunciado: 'Analise o seguinte algoritmo iterativo expresso em pseudocódigo e determine o valor final impresso para a variável "soma":',
    codigoTrecho: 'inteiro: soma <- 0;\npara i de 1 ate 4 faca:\n    se (i % 2 = 0) entao\n        soma <- soma + (i * 3);\n    senao\n        soma <- soma + i;\n    fimse\nfimpara\nescreva(soma);',
    opcoes: [
      { letra: 'A', texto: '10', correta: false },
      { letra: 'B', texto: '16', correta: false },
      { letra: 'C', texto: '22', correta: true },
      { letra: 'D', texto: '24', correta: false },
      { letra: 'E', texto: '30', correta: false }
    ],
    justificativaPedagogica: 'Fazendo o Teste de Mesa passo a passo:\n• i = 1 (ímpar): soma = 0 + 1 = 1\n• i = 2 (par): soma = 1 + (2 * 3) = 1 + 6 = 7\n• i = 3 (ímpar): soma = 7 + 3 = 10\n• i = 4 (par): soma = 10 + (4 * 3) = 10 + 12 = 22.\nPortanto, o valor final impresso é 22.',
    dificuldade: 'Média',
    recompensaXP: 60,
    recompensaGold: 35
  },
  {
    id: 104,
    anoEnade: 'ENADE ADS - Questão 31',
    disciplina: 'Programação Orientada a Objetos (POO)',
    banca: 'INEP / MEC',
    enunciado: 'Em arquitetura de software orientada a objetos, um princípio fundamental prevê que "classes filhas devem poder ser substituídas por suas classes base sem que isso comprometa a corretude do sistema". A qual princípio do acrônimo SOLID essa definição se refere?',
    opcoes: [
      { letra: 'A', texto: 'Single Responsibility Principle (Princípio da Responsabilidade Única).', correta: false },
      { letra: 'B', texto: 'Open/Closed Principle (Princípio Aberto/Fechado).', correta: false },
      { letra: 'C', texto: 'Liskov Substitution Principle (Princípio da Substituição de Liskov).', correta: true },
      { letra: 'D', texto: 'Interface Segregation Principle (Princípio da Segregação de Interfaces).', correta: false },
      { letra: 'E', texto: 'Dependency Inversion Principle (Princípio da Inversão de Dependência).', correta: false }
    ],
    justificativaPedagogica: 'Trata-se exatamente da formulação clássica do Princípio de Substituição de Liskov (LSP - a letra "L" do SOLID), formulado por Barbara Liskov. Se um programa está usando uma classe base, ele deve ser capaz de usar qualquer subclasse dela sem que o comportamento esperado seja violado.',
    dificuldade: 'Difícil',
    recompensaXP: 60,
    recompensaGold: 35
  },
  {
    id: 105,
    anoEnade: 'ENADE ADS - Questão 35',
    disciplina: 'Segurança da Informação & Web Backend',
    banca: 'INEP / MEC',
    enunciado: 'Um analista de sistemas detectou que um invasor conseguiu autenticar-se na aplicação web inserindo a string "\' OR \'1\'=\'1" no campo de senha do formulário de login. Qual vulnerabilidade clássica foi explorada e qual técnica deve ser adotada pela equipe de backend para saná-la em definitivo?',
    opcoes: [
      { letra: 'A', texto: 'Vulnerabilidade XSS (Cross-Site Scripting); sanada instalando certificado SSL/HTTPS.', correta: false },
      { letra: 'B', texto: 'Vulnerabilidade CSRF (Cross-Site Request Forgery); sanada limitando a memória do servidor.', correta: false },
      { letra: 'C', texto: 'Vulnerabilidade SQL Injection; sanada através do uso de Consultas Preparadas (Prepared Statements / Parâmetros Vinculados).', correta: true },
      { letra: 'D', texto: 'Buffer Overflow; sanada trocando o banco de dados relacional por um arquivo TXT local.', correta: false },
      { letra: 'E', texto: 'Ataque de Negação de Serviço (DDoS); sanada bloqueando todos os IPs externos.', correta: false }
    ],
    justificativaPedagogica: 'Ao concatenar texto diretamente na consulta SQL, a instrução "\' OR \'1\'=\'1" manipula a lógica booleana da cláusula WHERE, tornando a condição sempre verdadeira (1=1). A solução padrão recomendada pela OWASP é o uso de Prepared Statements com Parameterized Queries (Consultas Preparadas), que separam estritamente a instrução SQL dos dados inseridos pelo usuário.',
    dificuldade: 'Conceitual',
    recompensaXP: 50,
    recompensaGold: 30
  }
];

export const DISCIPLINAS_PADRAO: DisciplinaAcademica[] = [
  {
    id: 'disc-1',
    nome: 'Algoritmos e Estruturas de Dados',
    codigo: 'ADS101',
    notaA1: 8.5,
    notaA2: null,
    faltas: 2,
    totalAulas: 40,
    mediaMinima: 6.0
  },
  {
    id: 'disc-2',
    nome: 'Modelagem e Bancos de Dados Relacionais',
    codigo: 'ADS102',
    notaA1: 7.0,
    notaA2: null,
    faltas: 0,
    totalAulas: 40,
    mediaMinima: 6.0
  },
  {
    id: 'disc-3',
    nome: 'Desenvolvimento Web & Interfaces (Frontend)',
    codigo: 'ADS103',
    notaA1: 9.0,
    notaA2: 9.5,
    faltas: 1,
    totalAulas: 40,
    mediaMinima: 6.0
  },
  {
    id: 'disc-4',
    nome: 'Engenharia de Software e Metodologias Ágeis',
    codigo: 'ADS104',
    notaA1: 6.5,
    notaA2: null,
    faltas: 3,
    totalAulas: 40,
    mediaMinima: 6.0
  },
  {
    id: 'disc-5',
    nome: 'Programação Orientada a Objetos (Backend)',
    codigo: 'ADS105',
    notaA1: 8.0,
    notaA2: null,
    faltas: 1,
    totalAulas: 40,
    mediaMinima: 6.0
  }
];
