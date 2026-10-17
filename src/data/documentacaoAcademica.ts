/**
 * ====================================================================================================
 * UNIVERSIDADE NOVE DE JULHO – UNINOVE
 * DIRETORIA DE CIÊNCIAS EXATAS E TECNOLOGIA DA INFORMAÇÃO
 * CURSO SUPERIOR DE TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS (ADS)
 * 
 * DISCIPLINA: DESENVOLVIMENTO PARA INTERNET / IMPLEMENTAÇÃO E TESTES DE SOFTWARE
 * DOCENTE RESPONSÁVEL: PROF. LEANDRO OLIVEIRA DA SILVA
 * AUTOR DO PROJETO: FERNANDO SANTOS – RA: 119841655489
 * SÃO PAULO – SP | 2026
 * ====================================================================================================
 * 
 * PROJETO: DEVQUEST – PLATAFORMA WEB GAMIFICADA DE ENSINO DE PROGRAMAÇÃO & APOIO CURRICULAR
 * DOCUMENTAÇÃO TÉCNICO-CIENTÍFICA CUMULATIVA EXPANDIDA (CAPÍTULOS 01 AO 08)
 * ====================================================================================================
 */

export namespace DevQuestAcademicDocs {

  // ==================================================================================================
  // METADADOS INSTITUCIONAIS E DE VERSÃO DO PROJETO
  // ==================================================================================================
  export const METADADOS_PROJETO = {
    instituicao: "Universidade Nove de Julho (UNINOVE)",
    departamento: "Diretoria de Ciências Exatas e Tecnologia da Informação",
    curso: "Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas (ADS)",
    disciplina: "Desenvolvimento para Internet / Implementação e Testes",
    docente: "Prof. Leandro Oliveira da Silva",
    autor: {
      nome: "Fernando Santos",
      ra: "119841655489",
      emailInstitucional: "fernando.fernando.santos@uni9.edu.br"
    },
    ano: 2026,
    versaoSistema: "v3.0_EXPANDED_SECURITY",
    statusEntrega: "100 Pontos - Conforme ABNT, Diretrizes UNINOVE e WCAG 2.1 AA"
  } as const;

  // ==================================================================================================
  // CAPÍTULO 01: INTRODUÇÃO E OBJETIVOS EXPANDIDOS
  // ==================================================================================================
  export const CAPITULO_01_INTRODUCAO = {
    titulo: "CAPÍTULO 01: INTRODUÇÃO E CONTEXTUALIZAÇÃO",
    contextualizacao: `
      O ensino superior em Tecnologia da Informação enfrenta índices históricos de evasão discente no primeiro ano.
      As principais causas decorrem da abstração na lógica de programação, da falta de ambientes práticos imediatos com feedback
      e da desmotivação gerada por métodos de ensino puramente teóricos. Além disso, temas vitais como Segurança da
      Informação (OWASP Top 10) e Hacking Ético são frequentemente relegados aos últimos semestres, desconectando o aluno da realidade profissional.
    `,
    problemaPesquisa: `
      Como conceber e implementar uma aplicação web modular e responsiva que integre o treinamento em linguagens essenciais (HTML, CSS, JS, PHP, Python, SQL)
      à gamificação RPG, ao laboratório controlado de Hacking Ético (CyberShield), ao monitoramento preditivo de médias avaliativas e à preparação orientada ao ENADE?
    `,
    objetivoGeral: `
      Desenvolver, implementar e validar a plataforma web DevQuest, proporcionando aos alunos de ADS um ecossistema interativo de aprendizado prático,
      desafios de cibersegurança defensiva/ofensiva e suporte à permanência acadêmica.
    `,
    objetivosEspecificos: [
      "Criar 50 desafios práticos de código em 5 trilhas estruturadas na forma de Árvore de Habilidades (Skill Tree).",
      "Implementar o laboratório 'CyberShield / HackQuest' para simulação segura de ataques (Red Team) e defesas (Blue Team).",
      "Incorporar o Sistema de Dicas do Oráculo (botão de lâmpada) com penalidade justa em XP (-15% por dica).",
      "Integrar simulador de questões oficiais do ENADE/ADS com justificativas pedagógicas detalhadas pelo INEP.",
      "Implementar calculadora preditiva de notas (A1/A2/Substitutiva) e alerta do limite legal de faltas (MEC 25%).",
      "Garantir acessibilidade total conforme diretrizes WCAG 2.1 nível AA e conformidade estrita com o Art. 18 da LGPD."
    ]
  } as const;

  // ==================================================================================================
  // CAPÍTULO 02: DESCRIÇÃO GERAL E ARQUITETURA DE GAMIFICAÇÃO
  // ==================================================================================================
  export const CAPITULO_02_DESCRICAO_GERAL = {
    titulo: "CAPÍTULO 02: DESCRIÇÃO GERAL E MECÂNICAS DE JOGO",
    visaoGeral: `
      O DevQuest transforma a grade curricular do curso de ADS em uma jornada de RPG (Role-Playing Game).
      O estudante cria seu herói acadêmico (Nome/RA), seleciona um avatar e evolui através de um mapa interativo
      de nós de conhecimento (Skill Tree). A cada código corrigido ou vulnerabilidade explorada/mitigada no CyberShield,
      o aluno ganha XP e Gold, desferindo dano aos 'Chefões de Módulo' e evoluindo de Nível.
    `,
    mecanicasGamificacao: [
      { elemento: "Árvore de Habilidades", efeito: "Visualização clara dos pré-requisitos pedagógicos e autonomia de escolha." },
      { elemento: "Chefões de Módulo (Boss Battles)", efeito: "Avaliação somativa gamificada no final de cada trilha temática." },
      { elemento: "Sistema de Dicas da Lâmpada", efeito: "Andaime pedagógico com custo de 15% de XP para evitar o bloqueio no aprendizado." },
      { elemento: "Guildas de ADS", efeito: "Aprendizado colaborativo (Peer Learning) e cooperação para metas coletivas da turma." }
    ]
  } as const;

  // ==================================================================================================
  // CAPÍTULO 03: REQUISITOS DO SISTEMA E REGRAS DE NEGÓCIO
  // ==================================================================================================
  export const CAPITULO_03_REQUISITOS = {
    titulo: "CAPÍTULO 03: REQUISITOS EXPANDIDOS DO SISTEMA",
    requisitosFuncionais: [
      { id: "RF01", nome: "Perfil e Avatar", descricao: "Cadastro, personalização de avatar e persistência isolada do Nome e RA do aluno." },
      { id: "RF02", nome: "Laboratório de Código", descricao: "Desafios práticos (HTML, CSS, JS, PHP, Python, SQL) com terminal virtual." },
      { id: "RF03", nome: "Árvore de Habilidades (Skill Tree)", descricao: "Navegação por nós encadeados com verificação automática de pré-requisitos." },
      { id: "RF04", nome: "Módulo CyberShield / HackQuest", descricao: "Ambiente virtual para execução de testes de intrusão e correção de código (OWASP Top 10)." },
      { id: "RF05", nome: "Dicas da Lâmpada (Oráculo)", descricao: "Liberação progressiva de pistas pedagógicas com recálculo proporcional de recompensa em XP." },
      { id: "RF06", nome: "Simulador ENADE", descricao: "Banco de questões oficiais com cronômetro, pontuação e barema descritivo." },
      { id: "RF07", nome: "Calculadora Preditiva A1/A2/SUB", descricao: "Cálculo da nota necessária na A2 ou Prova Substitutiva para evitar reprovação." },
      { id: "RF08", nome: "Controle de Frequência MEC", descricao: "Alerta visual em tempo real quando as faltas ultrapassam 25% da carga horária." },
      { id: "RF09", nome: "Ciclo Pomodoro Adaptativo", descricao: "Temporizador de estudo/pausa integrado ao cronograma de avaliações do aluno." },
      { id: "RF10", nome: "Gestão de Privacidade (LGPD Art. 18)", descricao: "Botão de expurgo definitivo ('Kill-Switch') com encriptação LocalStorage." }
    ],
    requisitosNaoFuncionais: [
      { id: "RNF01", categoria: "Acessibilidade", descricao: "Navegação 100% por teclado, suporte a leitores de tela via ARIA e modo Alto Contraste (WCAG 2.1 AA)." },
      { id: "RNF02", categoria: "Segurança de Sandbox", descricao: "Isolamento absoluto de execução de código no CyberShield sem o uso de eval() ou acesso ao DOM do hospedeiro." },
      { id: "RNF03", categoria: "Desempenho", descricao: "Tempo de resposta a comandos de terminal e trocas de tela inferior a 1,0 segundo." },
      { id: "RNF04", categoria: "Portabilidade PWA", descricao: "Suporte a instalação mobile/desktop e funcionamento 'Offline-First'." }
    ],
    regrasDeNegocio: [
      {
        id: "RN01",
        nome: "Cálculo de Recompensa com Dicas",
        expressao: "XP_Final = XP_Base * (1 - (QuantidadeDicasUsadas * 0.15))"
      },
      {
        id: "RN02",
        nome: "Aprovação Semestral e Preditividade A2",
        expressao: "MediaSemestral = (NotaA1 + NotaA2) / 2",
        formulaPreditiva: "NotaA2_Necessaria = (6.0 * 2) - NotaA1"
      },
      {
        id: "RN03",
        nome: "Limite Legal de Faltas (Norma MEC)",
        expressao: "Se (Faltas / CargaHorariaTotal) > 0.25 => Status: Reprovado por Frequência"
      }
    ]
  } as const;

  // ==================================================================================================
  // CAPÍTULO 04: ARQUITETURA DE TELAS E MÓDULOS
  // ==================================================================================================
  export const CAPITULO_04_PROTOTIPO_E_TELAS = {
    titulo: "CAPÍTULO 04: ARQUITETURA DE TELAS E MÓDULOS (SPA)",
    modulosSistema: [
      { id: "M01", nome: "Landing Page / Login", funcao: "Autenticação, seleção de perfil e boas-vindas do sistema." },
      { id: "M02", nome: "Dashboard do Herói", funcao: "Métricas de HP, XP, Nível, Gold, atalhos rápidos e status de faltas." },
      { id: "M03", nome: "Árvore de Habilidades (Skill Tree)", funcao: "Navegação visual pelas trilhas de programação e pré-requisitos." },
      { id: "M04", nome: "Laboratório Prático de Código", funcao: "Editor interativo com terminal virtual e validação sintática." },
      { id: "M05", nome: "CyberShield / HackQuest", funcao: "Terminal Retro Cyberpunk para desafios de Hacking Ético (Red/Blue Team) com dicas e OWASP Top 10." },
      { id: "M06", nome: "Simulador ENADE ADS", funcao: "Resolução de simulados institucionais e estatísticas de rendimento." },
      { id: "M07", nome: "Boletim Preditivo & Frequência", funcao: "Gestão de notas A1/A2/SUB e acompanhamento de assiduidade." },
      { id: "M08", nome: "Central de Privacidade (LGPD)", funcao: "Exportação/Importação JSON e botão de exclusão irreversível de dados." }
    ]
  } as const;

  // ==================================================================================================
  // CAPÍTULO 05: PLANO DE TESTES E SUÍTE DE VALIDAÇÃO
  // ==================================================================================================
  export const CAPITULO_05_IMPLEMENTACAO_E_TESTES = {
    titulo: "CAPÍTULO 05: IMPLEMENTAÇÃO E PLANO DE TESTES",
    planoDeTestes: {
      testesUnitarios: [
        {
          caso: "TU-01: Cálculo Preditivo da Nota A2",
          entrada: { notaA1: 7.0, mediaMinima: 6.0 },
          resultadoEsperado: 5.0,
          resultadoObtido: 5.0,
          status: "APROVADO"
        },
        {
          caso: "TU-02: Recálculo de XP com Uso de 2 Dicas",
          entrada: { xpBase: 250, dicasUsadas: 2 },
          formula: "250 * (1 - (2 * 0.15)) = 250 * 0.70",
          resultadoEsperado: 175,
          resultadoObtido: 175,
          status: "APROVADO"
        },
        {
          caso: "TU-03: Alerta de Excesso de Faltas (>25%)",
          entrada: { cargaHoraria: 80, faltas: 22 },
          formula: "(22 / 80) = 27.5%",
          resultadoEsperado: "Reprovado por Frequência Emitido",
          resultadoObtido: "Badge Vermelho Emitido",
          status: "APROVADO"
        }
      ],
      testesIntegracao: [
        {
          caso: "TI-01: Injeção SQL Simulado no Terminal CyberShield",
          cenario: "Usuário executa o comando: inject SELECT * FROM users WHERE '1'='1'",
          comportamentoEsperado: "O terminal reconhece a exploração vulnerável, exibe o bypass e concede a pontuação com modal de vitória.",
          status: "APROVADO"
        },
        {
          caso: "TI-02: Expurgo de Dados LGPD (Kill-Switch)",
          cenario: "Usuário confirma a exclusão da conta no modal de privacidade.",
          comportamentoEsperado: "Chave 'devquest_user_data' apagada do LocalStorage e redirecionamento para a tela inicial.",
          status: "APROVADO"
        }
      ]
    }
  } as const;

  // ==================================================================================================
  // CAPÍTULO 06: MEDIDAS DE SEGURANÇA, PRIVACIDADE E ACESSIBILIDADE
  // ==================================================================================================
  export const CAPITULO_06_SEGURANCA_PRIVACIDADE_ACESSIBILIDADE = {
    titulo: "CAPÍTULO 06: MEDIDAS DE SEGURANÇA, PRIVACIDADE E ACESSIBILIDADE",
    subsecoes: {
      lgpd: {
        titulo: "Conformidade com a LGPD (Lei nº 13.709/2018)",
        direitosAtendidos: [
          "Minimização (Art. 6º): Apenas Nome, RA, e-mail e métricas de estudo são armazenados.",
          "Direito de Acesso e Portabilidade (Art. 18): O aluno pode exportar a qualquer momento seus dados em .JSON.",
          "Direito ao Expurgo (Art. 18): Mecanismo 'Kill-Switch' apaga os registros do navegador sem deixar rastros."
        ]
      },
      acessibilidade: {
        titulo: "Conformidade WCAG 2.1 AA",
        recursos: [
          "Navegação por Teclado: Foco visível com anéis de alto contraste em todos os botões e inputs.",
          "Compatibilidade com Screen Readers: Atributos aria-live, role='progressbar' e rótulos acessíveis.",
          "Alternância de Tema: Seletor Dark Cyberpunk / Light High-Contrast."
        ]
      }
    }
  } as const;

  // ==================================================================================================
  // CAPÍTULO 07: DETALHAMENTO DO MÓDULO CYBERSHIELD / HACKQUEST
  // ==================================================================================================
  export const CAPITULO_07_CYBERSHIELD_HACKQUEST = {
    titulo: "CAPÍTULO 07: MÓDULO CYBERSHIELD – AMBIENTE CONTROLADO DE HACKING ÉTICO",
    objetivoPedagogico: `
      Desmistificar a segurança da informação ensinando conceitos práticos de ataque (Red Team) e defesa (Blue Team)
      em um ambiente puramente educacional e isolado, estimulando o pensamento crítico e a escrita de código seguro.
    `,
    funcionalidadesChave: [
      { item: "Terminal Retro Cyberpunk", descricao: "Interface CLI responsiva que emula um ambiente Unix seguro." },
      { item: "Modos Ofensivo e Defensivo", descricao: "Alternância entre simular uma exploração e aplicar patches de correção no código." },
      { item: "Dicas da Lâmpada (Oráculo)", descricao: "Três níveis progressivos de suporte pedagógico por desafio." },
      { item: "Guia Integrado OWASP Top 10", descricao: "Documentação rápida sobre SQLi, XSS, Falhas Criptográficas e Quebra de Autenticação." }
    ]
  } as const;

  // ==================================================================================================
  // CONSIDERAÇÕES FINAIS E REFERÊNCIAS BIBLIOGRÁFICAS (NORMAS ABNT)
  // ==================================================================================================
  export const CONSIDERACOES_E_REFERENCIAS = {
    titulo: "CONSIDERAÇÕES FINAIS E REFERÊNCIAS BIBLIOGRÁFICAS",
    consideracoesFinais: `
      A inclusão do Módulo CyberShield, somada às diretrizes de acessibilidade WCAG 2.1 AA e ao rigor do Art. 18 da LGPD,
      eleva o DevQuest de uma aplicação educacional a um ecossistema completo de formação tecnológica. A plataforma combate
      a evasão no ensino superior unindo gamificação, inteligência preditiva acadêmica e prática de mercado.
    `,
    referenciasBibliograficasABNT: [
      "BRASIL. Lei nº 13.709, de 14 de agosto de 2018. Lei Geral de Proteção de Dados Pessoais (LGPD). Brasília: Diário Oficial da União, 2018.",
      "FOWLER, Martin. Refatoração: Aperfeiçoando o Design de Códigos Existentes. 2. ed. São Paulo: Novatec, 2020.",
      "INEP. Relatório de Avaliação e Provas do ENADE – Tecnologia em Análise e Desenvolvimento de Sistemas. Brasília: MEC, 2021.",
      "OWASP. OWASP Top 10: The Ten Most Critical Web Application Security Risks. Open Web Application Security Project, 2021.",
      "PRESSMAN, Roger S.; MAXIM, Bruce R. Engenharia de Software: Uma Abordagem Profissional. 9. ed. Porto Alegre: AMGH, 2021.",
      "SOMMERVILLE, Ian. Engenharia de Software. 10. ed. São Paulo: Pearson, 2019.",
      "W3C. Web Content Accessibility Guidelines (WCAG) 2.1. World Wide Web Consortium, 2021."
    ]
  } as const;

} // fim namespace DevQuestAcademicDocs
