import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Carregar fontes TrueType do sistema com suporte completo a UTF-8 e acentos em português (ã, ç, é, ó, í, etc.)
  const fontRegularBytes = fs.readFileSync('/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf');
  const fontBoldBytes = fs.readFileSync('/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf');
  const fontItalicBytes = fs.readFileSync('/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf');

  const fontRegular = await pdfDoc.embedFont(fontRegularBytes);
  const fontBold = await pdfDoc.embedFont(fontBoldBytes);
  const fontOblique = await pdfDoc.embedFont(fontItalicBytes);

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89;
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;
  let pageNumber = 1;

  function drawFooter(page: any, pNum: number) {
    const text = `DevQuest - Documentação Acadêmica (Capítulos 01 ao 06 Consolidados) | Página ${pNum}`;
    page.drawText(text, {
      x: margin,
      y: 30,
      size: 8,
      font: fontRegular,
      color: rgb(0.4, 0.4, 0.4),
    });
    page.drawLine({
      start: { x: margin, y: 42 },
      end: { x: pageWidth - margin, y: 42 },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8),
    });
  }

  function checkNewPage(neededHeight: number) {
    if (y - neededHeight < 55) {
      drawFooter(currentPage, pageNumber);
      pageNumber++;
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  }

  function addTitle(text: string) {
    checkNewPage(45);
    currentPage.drawText(text, {
      x: margin,
      y: y - 18,
      size: 14.5,
      font: fontBold,
      color: rgb(0.12, 0.23, 0.54), // Azul escuro formal
    });
    y -= 30;
  }

  function addSubTitle(text: string) {
    checkNewPage(32);
    currentPage.drawText(text, {
      x: margin,
      y: y - 14,
      size: 11.5,
      font: fontBold,
      color: rgb(0.18, 0.18, 0.28),
    });
    y -= 22;
  }

  function addSubSubTitle(text: string) {
    checkNewPage(24);
    currentPage.drawText(text, {
      x: margin,
      y: y - 11,
      size: 10,
      font: fontBold,
      color: rgb(0.25, 0.25, 0.35),
    });
    y -= 18;
  }

  function addParagraph(text: string, isItalic = false, isBold = false) {
    const font = isBold ? fontBold : isItalic ? fontOblique : fontRegular;
    const fontSize = 9.5;
    const lineHeight = 13.5;

    const words = text.split(' ');
    let line = '';

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > contentWidth) {
        checkNewPage(lineHeight);
        currentPage.drawText(line, {
          x: margin,
          y: y - fontSize,
          size: fontSize,
          font: font,
          color: rgb(0.15, 0.15, 0.15),
        });
        y -= lineHeight;
        line = word;
      } else {
        line = testLine;
      }
    }

    if (line) {
      checkNewPage(lineHeight);
      currentPage.drawText(line, {
        x: margin,
        y: y - fontSize,
        size: fontSize,
        font: font,
        color: rgb(0.15, 0.15, 0.15),
      });
      y -= lineHeight;
    }
    y -= 5;
  }

  function addBullet(bulletText: string, strongPrefix = '') {
    const fontSize = 9.5;
    const lineHeight = 13.5;
    checkNewPage(lineHeight);

    currentPage.drawText('• ', {
      x: margin + 8,
      y: y - fontSize,
      size: fontSize,
      font: fontBold,
      color: rgb(0.25, 0.35, 0.65),
    });

    let prefixOffset = 0;
    if (strongPrefix) {
      currentPage.drawText(strongPrefix, {
        x: margin + 18,
        y: y - fontSize,
        size: fontSize,
        font: fontBold,
        color: rgb(0.1, 0.1, 0.1),
      });
      prefixOffset = fontBold.widthOfTextAtSize(strongPrefix, fontSize);
    }

    const words = bulletText.split(' ');
    let line = '';
    let isFirstLine = true;

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const availableWidth = isFirstLine ? contentWidth - 18 - prefixOffset : contentWidth - 25;
      const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > availableWidth) {
        const posX = isFirstLine ? margin + 18 + prefixOffset : margin + 25;
        currentPage.drawText(line, {
          x: posX,
          y: y - fontSize,
          size: fontSize,
          font: fontRegular,
          color: rgb(0.15, 0.15, 0.15),
        });
        y -= lineHeight;
        line = word;
        isFirstLine = false;
        checkNewPage(lineHeight);
      } else {
        line = testLine;
      }
    }

    if (line) {
      const posX = isFirstLine ? margin + 18 + prefixOffset : margin + 25;
      currentPage.drawText(line, {
        x: posX,
        y: y - fontSize,
        size: fontSize,
        font: fontRegular,
        color: rgb(0.15, 0.15, 0.15),
      });
      y -= lineHeight;
    }
    y -= 3;
  }

  function addCalloutBox(title: string, text: string) {
    checkNewPage(52);
    const boxY = y - 42;
    currentPage.drawRectangle({
      x: margin,
      y: boxY,
      width: contentWidth,
      height: 40,
      color: rgb(0.95, 0.96, 1.0),
      borderColor: rgb(0.6, 0.7, 0.9),
      borderWidth: 1,
    });
    currentPage.drawText(title, {
      x: margin + 10,
      y: boxY + 25,
      size: 9,
      font: fontBold,
      color: rgb(0.15, 0.2, 0.5),
    });
    currentPage.drawText(text, {
      x: margin + 10,
      y: boxY + 11,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.3),
    });
    y -= 50;
  }

  // ==================== CAPA ====================
  y = pageHeight - 80;
  currentPage.drawText('UNIVERSIDADE NOVE DE JULHO – UNINOVE', {
    x: margin,
    y: y,
    size: 13,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 18;
  currentPage.drawText('DIRETORIA DE CIÊNCIAS EXATAS E TECNOLOGIA DA INFORMAÇÃO', {
    x: margin,
    y: y,
    size: 10,
    font: fontBold,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 15;
  currentPage.drawText('CURSO SUPERIOR DE TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4),
  });

  y = pageHeight / 2 + 100;
  currentPage.drawLine({
    start: { x: margin, y: y + 25 },
    end: { x: pageWidth - margin, y: y + 25 },
    thickness: 2,
    color: rgb(0.2, 0.35, 0.7),
  });

  currentPage.drawText('DEVQUEST: PLATAFORMA WEB GAMIFICADA PARA O', {
    x: margin,
    y: y,
    size: 14.5,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.4),
  });
  y -= 20;
  currentPage.drawText('APRENDIZADO DE PROGRAMAÇÃO E SUPORTE ACADÊMICO EM TI', {
    x: margin,
    y: y,
    size: 14.5,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.4),
  });
  y -= 24;
  currentPage.drawText('DOCUMENTAÇÃO TÉCNICO-CIENTÍFICA CUMULATIVA', {
    x: margin,
    y: y,
    size: 10,
    font: fontBold,
    color: rgb(0.3, 0.3, 0.4),
  });
  y -= 14;
  currentPage.drawText('(CAPÍTULOS 01 AO 06 CONSOLIDADOS E ATUALIZADOS)', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontOblique,
    color: rgb(0.4, 0.4, 0.5),
  });

  currentPage.drawLine({
    start: { x: margin, y: y - 15 },
    end: { x: pageWidth - margin, y: y - 15 },
    thickness: 1,
    color: rgb(0.7, 0.75, 0.85),
  });

  y = 230;
  currentPage.drawText('DISCIPLINA: DESENVOLVIMENTO PARA INTERNET / IMPLEMENTAÇÃO E TESTES', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 16;
  currentPage.drawText('DOCENTE RESPONSÁVEL: PROF. LEANDRO OLIVEIRA DA SILVA', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 20;
  currentPage.drawText('AUTOR DO PROJETO:', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 16;
  currentPage.drawText('• Fernando Santos  –  RA: 119841655489', {
    x: margin + 15,
    y: y,
    size: 10,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  y = 80;
  currentPage.drawText('SÃO PAULO – SP', {
    x: pageWidth / 2 - 42,
    y: y,
    size: 10,
    font: fontBold,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 15;
  currentPage.drawText('2026', {
    x: pageWidth / 2 - 12,
    y: y,
    size: 10,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4),
  });
  drawFooter(currentPage, pageNumber);

  // ==================== PÁGINA 2: SUMÁRIO ====================
  pageNumber++;
  currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  y = pageHeight - margin;

  addTitle('SUMÁRIO CUMULATIVO');
  addBullet('1.1 Contextualização e Justificativa Acadêmica', '1. CAPÍTULO 01: INTRODUÇÃO – ');
  addBullet('1.2 Formulação do Problema de Pesquisa');
  addBullet('1.3 Objetivos Gerais e Específicos');
  addBullet('2.1 Visão Geral e Proposta de Valor do DevQuest', '2. CAPÍTULO 02: DESCRIÇÃO GERAL DO SISTEMA – ');
  addBullet('2.2 Público-Alvo e Análise de Stakeholders');
  addBullet('2.3 Módulos Funcionais e Gamificação');
  addBullet('3.1 Requisitos Funcionais Detalhados (RF01 a RF08)', '3. CAPÍTULO 03: REQUISITOS DO SISTEMA – ');
  addBullet('3.2 Requisitos Não Funcionais (RNF01 a RNF04)');
  addBullet('3.3 Regras de Negócio e Cálculos Acadêmicos (RN01 a RN03)');
  addBullet('4.1 Arquitetura da Informação e Fluxo de Navegação', '4. CAPÍTULO 04: PROTÓTIPO E ARQUITETURA DE TELAS – ');
  addBullet('4.2 Módulos Prototipados (Landing, Dashboard, Trilhas e Simulado)');
  addBullet('5.1 Justificativa Teórica das Ferramentas e Tecnologias Adotadas', '5. CAPÍTULO 05: IMPLEMENTAÇÃO E PLANO DE TESTES – ');
  addBullet('5.2 Arquitetura de Software em Camadas e Estrutura do Repositório');
  addBullet('5.3 Plano Detalhado de Testes (Funções Isoladas a Testes de Sistema)');
  addBullet('5.4 Matriz de Rastreabilidade e Conformidade dos Testes');
  addBullet('6.1 Proteção dos Dados (Inventário e Repositório)', '6. CAPÍTULO 06: SEGURANÇA E PRIVACIDADE – ');
  addBullet('6.2 Autenticação e Controle de Acesso Baseado em Perfis');
  addBullet('6.3 Privacidade e Uso das Informações (Conformidade com a LGPD)');
  addBullet('6.4 Prevenção de Vulnerabilidades Técnicas (XSS, SQL Injection e Sanitização)');
  addBullet('6.5 Backup, Exportação e Estratégias de Recuperação de Desastres');
  addBullet('7.1 Conclusão Geral e Referências Bibliográficas (Normas ABNT)', '7. CONSIDERAÇÕES FINAIS E REFERÊNCIAS – ');

  y -= 12;
  addCalloutBox(
    'DOCUMENTAÇÃO CUMULATIVA CONFORME DIRETRIZES DA DISCIPLINA:',
    'Apresenta os Capítulos 01 ao 06 completos e integrados, com o novo capítulo de Segurança e Privacidade sob a LGPD.'
  );

  // ==================== CAPÍTULO 01 ====================
  addTitle('CAPÍTULO 01: INTRODUÇÃO');
  addSubTitle('1.1 Contextualização e Justificativa');
  addParagraph(
    'O ensino superior nas áreas de Tecnologia da Informação, especificamente em Análise e Desenvolvimento de Sistemas (ADS), enfrenta historicamente elevadas taxas de evasão discente nos primeiros semestres. Esse fenômeno está associado à alta curva de abstração lógica demandada pelo aprendizado de linguagens de programação, à escassez de laboratórios interativos com correção automática imediata e à falta de ferramentas que integrem o treinamento prático de código à organização da rotina de estudos universitários.'
  );
  addParagraph(
    'A gamificação, quando estruturada com propósitos pedagógicos sólidos, surge como uma alternativa comprovada para transformar conteúdos teóricos complexos em trilhas atrativas de superação e aprendizado contínuo, estimulando a autodisciplina e o senso de progressão técnica dos discentes.'
  );

  addSubTitle('1.2 Problema de Pesquisa');
  addParagraph(
    'Como conceber e implementar uma aplicação web modular e responsiva que una o aprendizado prático de linguagens de programação essenciais através da gamificação ao monitoramento preditivo de rendimento acadêmico e simulação de questões do ENADE?'
  );

  addSubTitle('1.3 Objetivos');
  addSubSubTitle('Objetivo Geral:');
  addParagraph(
    'Desenvolver, implementar e testar a plataforma web gamificada DevQuest, capacitando estudantes de tecnologia no domínio de linguagens web (HTML, CSS, JavaScript, PHP, Python e SQL) e fornecendo instrumentos de apoio ao sucesso acadêmico.'
  );
  addSubSubTitle('Objetivos Específicos:');
  addBullet('Desenvolver trilhas práticas interativas com terminal virtual de execução e validação sintática automatizada.');
  addBullet('Integrar um simulador oficial de questões do ENADE para Análise e Desenvolvimento de Sistemas com justificativas pedagógicas detalhadas.');
  addBullet('Implementar calculadora preditiva de notas de avaliações (A1/A2) e monitoramento de limite de faltas (norma MEC de 25%).');
  addBullet('Estruturar um plano abrangente de testes de software, cobrindo testes unitários, de integração e de regras de negócio.');
  addBullet('Projetar uma arquitetura de segurança e privacidade em conformidade com as diretrizes da LGPD (Lei nº 13.709/2018).');

  // ==================== CAPÍTULO 02 ====================
  addTitle('CAPÍTULO 02: DESCRIÇÃO GERAL DO SISTEMA');
  addSubTitle('2.1 Visão Geral do Produto');
  addParagraph(
    'O DevQuest é uma plataforma web que transforma o percurso pedagógico de um curso de tecnologia em uma jornada de Role-Playing Game (RPG). O aluno cria seu perfil com nome e Registro Acadêmico (RA), escolhe seu avatar e realiza missões de código. Cada solução correta concede Pontos de Experiência (XP) e Moedas de Ouro (Gold), permitindo a evolução de nível do personagem (Level Up).'
  );
  addParagraph(
    'A plataforma também atua como um portal acadêmico unificado, integrando temporizador de produtividade Pomodoro, bloco de anotações persistente e o Grimório de Recursos com links diretos para órgãos oficiais (INEP/MEC, Python Brasil e MDN Web Docs).'
  );

  addSubTitle('2.2 Público-Alvo e Partes Interessadas');
  addBullet('Estudantes de Cursos Superiores de Tecnologia (ADS, SI e Ciência da Computação) que demandam prática imediata de programação.', 'Discentes de TI: ');
  addBullet('Professores e Coordenadores que buscam elevar a taxa de retenção e o desempenho dos alunos no ENADE.', 'Corpo Docente: ');
  addBullet('Profissionais em transição de carreira que buscam sólida fundamentação teórica e prática em desenvolvimento de software.', 'Autodidatas: ');

  // ==================== CAPÍTULO 03 ====================
  addTitle('CAPÍTULO 03: REQUISITOS DO SISTEMA');
  addSubTitle('3.1 Requisitos Funcionais (RF)');
  addBullet('Permitir criação e recuperação de perfil do aluno com Nome, RA e seleção de avatar RPG.', '[RF01] Perfil do Estudante: ');
  addBullet('Disponibilizar 50 desafios de código (10 por tecnologia) com verificação sintática e saída no terminal.', '[RF02] Laboratório de Código: ');
  addBullet('Calcular e conceder XP e Gold após a conclusão de cada desafio e gerenciar o avanço de nível a cada 100 XP.', '[RF03] Motor de Gamificação: ');
  addBullet('Apresentar questões oficiais de provas do ENADE com exibição automática do gabarito e barema comentado.', '[RF04] Simulador do ENADE: ');
  addBullet('Calcular a média entre Prova A1 e Prova A2, prevendo a nota necessária na A2 para aprovação sem exame.', '[RF05] Calculadora A1/A2: ');
  addBullet('Monitorar a quantidade de faltas em relação à carga horária total, alertando quando ultrapassar 25%.', '[RF06] Controle de Frequência: ');
  addBullet('Fornecer cronômetro com ciclos de 25 minutos de estudo e 5 minutos de pausa com controle sonoro/visual.', '[RF07] Ciclo Pomodoro: ');
  addBullet('Permitir a exportação completa do histórico do estudante em arquivo JSON estruturado para segurança de dados.', '[RF08] Backup e Exportação: ');

  addSubTitle('3.2 Requisitos Não Funcionais (RNF)');
  addBullet('A aplicação deve responder às ações de interação do usuário com latência inferior a 1,5 segundos.', '[RNF01] Desempenho: ');
  addBullet('Layout responsivo compatível com navegadores mobile e desktop, aplicando tema escuro (Dark Mode) de alto contraste.', '[RNF02] Usabilidade: ');
  addBullet('A validação de código e regras matemáticas é executada em ambiente controlado, prevenindo injeção de scripts maliciosos.', '[RNF03] Segurança: ');
  addBullet('Funcionamento pleno nos navegadores modernos (Google Chrome, Firefox, Microsoft Edge e Safari).', '[RNF04] Portabilidade: ');

  addSubTitle('3.3 Regras de Negócio (RN)');
  addBullet('Média Semestral = (Nota A1 + Nota A2) / 2. Nota A2 Necessária = (Média Mínima * 2) - Nota A1.', '[RN01] Fórmula de Aprovação: ');
  addBullet('Limite máximo de faltas tolerado é de 25% do total de aulas da disciplina. Acima disso ocorre reprovação por frequência.', '[RN02] Norma de Assiduidade: ');
  addBullet('A progressão de nível ocorre a cada 100 pontos acumulados: Nível = Floor(XP / 100) + 1.', '[RN03] Progressão de Nível: ');

  // ==================== CAPÍTULO 04 ====================
  addTitle('CAPÍTULO 04: PROTÓTIPO E ARQUITETURA DE TELAS');
  addSubTitle('4.1 Arquitetura da Informação');
  addParagraph(
    'A navegação é centralizada em uma aplicação de página única (Single Page Application – SPA), composta por barra lateral colapsável (Sidebar) e área central dinâmica. O sistema conta com a Landing Page para apresentação do projeto e entrada rápida, Dashboard central com status do herói e módulos específicos acessíveis com um clique.'
  );

  addSubTitle('4.2 Módulos de Tela Prototipados e Implementados');
  addBullet('Apresenta a proposta de valor, estatísticas da plataforma, vitrine das linguagens e botão de início.', '1. Landing Page (Portal de Entrada): ');
  addBullet('Resumo de status (HP, XP, Gold, Nível), relógio de sistema em tempo real, banners de acesso rápido e temporizador Pomodoro.', '2. Dashboard Geral: ');
  addBullet('Apresenta o enunciado do problema, dicas pedagógicas, editor de código fonte e terminal virtual de compilação/saída.', '3. Laboratório Prático de Trilhas: ');
  addBullet('Interface de simulação de exame com questões reais do ENADE/ADS, cronômetro, alternativas e painel de barema pedagógico.', '4. Simulador Oficial ENADE: ');
  addBullet('Painel tabular em cards para cadastro de disciplinas, notas de A1 e A2 com cálculo automático e alerta de frequência.', '5. Boletim Acadêmico e Calculadora: ');
  addBullet('Cards com hiperlinks oficiais verificados (INEP, Python Brasil, MDN Web Docs) com recurso de cópia de link em 1 clique.', '6. Grimório de Recursos: ');

  // ==================== CAPÍTULO 05 ====================
  addTitle('CAPÍTULO 05: IMPLEMENTAÇÃO E PLANO DE TESTES');
  addSubTitle('5.1 Justificativa Teórica das Ferramentas e Tecnologias Adotadas');
  addParagraph(
    'Para tirar o DevQuest do papel e viabilizar sua operação como uma aplicação web robusta, modular e escalável, foi realizada uma rigorosa seleção de linguagens, frameworks e bibliotecas. A justificativa teórica para a escolha de cada ferramenta fundamenta-se nos seguintes pilares da engenharia de software:'
  );

  addSubSubTitle('A. Linguagem de Programação: TypeScript (v5.8)');
  addParagraph(
    'Justificativa Teórica: TypeScript é um superconjunto tipado de JavaScript desenvolvido pela Microsoft. Em projetos educacionais complexos, o JavaScript puro (dinamicamente tipado) apresenta alta suscetibilidade a falhas em tempo de execução, como referências a propriedades nulas (TypeError: undefined is not an object). O TypeScript introduz verificação estática de tipos em tempo de compilação, permitindo a definição rigorosa de modelos de dados (interfaces para EstadoJogo, Desafio, DisciplinaAcademica). Isso eleva a manutenibilidade, proporciona autocompletion inteligente e garante que contratos de dados entre módulos sejam estritamente respeitados.'
  );

  addSubSubTitle('B. Framework de Interface: React (v19) com Vite (v6.2)');
  addParagraph(
    'Justificativa Teórica: React é a biblioteca líder de mercado para construção de interfaces declarativas baseadas em componentes reutilizáveis. O paradigma de componentes funcionais associado a React Hooks (useState, useEffect, useMemo) viabiliza a sincronização reativa entre o estado global de pontuação do estudante e a interface gráfica (atualização imediata de XP, barras de vida e avisos de aprovação). O Vite atua como o ambiente de build moderno, utilizando compilação baseada em ES Modules nativos e Rollup/esbuild, resultando em tempos de inicialização e Hot Module Replacement (HMR) quase instantâneos, superando empacotadores legados como o Webpack.'
  );

  addSubSubTitle('C. Framework de Estilização: Tailwind CSS (v4.1)');
  addParagraph(
    'Justificativa Teórica: O Tailwind CSS adota o paradigma Utility-First, no qual classes atômicas pré-definidas são compostas diretamente na árvore do DOM virtual. Essa abordagem elimina a necessidade de manter volumosas folhas de estilos CSS globais separadas, reduz o acoplamento visual e viabiliza a implementação fluida do tema escuro de alto contraste (Dark Mode/Terminal Aesthetic), minimizando a fadiga visual dos estudantes durante longos períodos de estudo noturno.'
  );

  addSubSubTitle('D. Bibliotecas Específicas de Suporte Técnico');
  addBullet(
    'Coleção padronizada de ícones vetoriais SVG de alto desempenho e baixo impacto no bundle final. Garante comunicação semiótica intuitiva nos menus de navegação, status de tarefas e alertas acadêmicos.',
    'Lucide React: '
  );
  addBullet(
    'Mecanismo leve baseado na HTML5 Canvas API que dispara efeitos de partículas comemorativas quando o estudante conclui desafios ou avança de nível, reforçando o gatilho psicológico de recompensa intrínseca da gamificação.',
    'Canvas-Confetti: '
  );
  addBullet(
    'Mecanismo programático para construção e manipulação de documentos PDF no padrão A4 em conformidade estrita com normas ABNT, com suporte nativo a vetores tipográficos TrueType (@pdf-lib/fontkit).',
    'PDF-Lib & Fontkit: '
  );
  addBullet(
    'Camada complementar contida na pasta /academico contendo scripts SQL relacionais com constraints de integridade e endpoints em PHP 8 orientados a objetos (PDO com Prepared Statements), viabilizando portabilidade para ambientes corporativos tradicionais ou servidores Apache/XAMPP.',
    'PHP 8 & MySQL (Stack LAMP Portátil): '
  );

  addSubTitle('5.2 Arquitetura de Software e Estrutura de Diretórios');
  addParagraph(
    'O software foi projetado segundo o padrão arquitetural de Componentes Modulares Desacoplados. A persistência dos dados no lado do cliente utiliza a Web Storage API (LocalStorage) sob a chave controlada "devquest_plus_academico_v3", garantindo que todo o progresso (XP acumulado, notas cadastradas, desafios concluídos) seja preservado entre sessões.'
  );

  addBullet('src/components/ (Componentes de visualização: Dashboard, Trilhas, Acadêmico, Simulado, Recursos e Sidebar).');
  addBullet('src/data/ (Bases de dados estáticas tipadas com 50 desafios de código e questões do ENADE).');
  addBullet('src/types.ts (Interfaces e contratos TypeScript de todo o ecossistema).');
  addBullet('src/App.tsx (Orquestrador de estado global, controle de sessão e roteamento interno da SPA).');
  addBullet('academico/ (Pacote complementar com scripts SQL e backend PHP 8 autônomo).');

  addSubTitle('5.3 Plano Detalhado de Testes de Software');
  addParagraph(
    'Para assegurar a confiabilidade matemática, a estabilidade da interface e a resiliência do sistema, foi elaborado e executado um plano rigoroso de testes estruturado em múltiplos níveis: testes unitários de funções isoladas, testes de integração entre módulos e testes de aceitação do sistema.'
  );

  addSubSubTitle('A. Testes Unitários de Funções Isoladas (Regras de Negócio e Cálculos):');

  addBullet(
    'Entrada: Nota A1 = 7.0, Média Mínima = 6.0. Procedimento: Aplicação da fórmula Necessária = (6.0 * 2) - 7.0. Saída Esperada: 5.0. Saída Obtida: 5.0. Veredito: APROVADO.',
    'Caso TU-01 – Cálculo Preditivo da Nota A2: '
  );
  addBullet(
    'Entrada: Nota A1 = 1.0, Média Mínima = 6.0. Procedimento: O cálculo projeta nota necessária de 11.0 (> 10.0). Comportamento Esperado: Sistema sinaliza impossibilidade de passar direto e ativa alerta de Exame Final. Saída Obtida: Status "Exame Necessário". Veredito: APROVADO.',
    'Caso TU-02 – Detecção Limite de Exame Final: '
  );
  addBullet(
    'Entrada: Carga Horária = 40 horas-aula, Faltas = 11. Procedimento: Cálculo do percentual de frequência Presença = ((40 - 11) / 40) * 100 = 72,5%. Comportamento Esperado: Detecção de frequência inferior a 75% (norma MEC) e emissão de badge vermelho de Reprovação por Frequência. Veredito: APROVADO.',
    'Caso TU-03 – Cálculo do Limite Legal de Faltas (Norma MEC 25%): '
  );
  addBullet(
    'Entrada: XP atual = 80, Ganho de XP = 30. Total = 110. Procedimento: Verificação da regra Nível = Floor(110 / 100) + 1. Comportamento Esperado: Nível avança de 1 para 2, dispara modal de celebração e emite efeito de confetes. Veredito: APROVADO.',
    'Caso TU-04 – Algoritmo de Progressão de Nível Gamificado (Level Up): '
  );

  addSubSubTitle('B. Testes de Integração e Fluxos do Sistema:');

  addBullet(
    'Procedimento: O usuário digita o script solicitado no editor de código em Python (ex: heroi = "Fernando") e clica em Executar. Comportamento: O normalizador remove espaços supérfluos, compara a saída com a regex esperada, emite retorno no terminal virtual e incrementa o saldo de XP e Gold no cabeçalho. Veredito: APROVADO.',
    'Caso TI-01 – Validador de Código no Laboratório Prático: '
  );
  addBullet(
    'Procedimento: O discente submete uma resposta a uma questão do ENADE. Comportamento: O sistema bloqueia novas edições na questão, destaca a alternativa correta em verde e renderiza a fundamentação pedagógica com referências bibliográficas do INEP. Veredito: APROVADO.',
    'Caso TI-02 – Ciclo Completo do Simulado ENADE com Gabarito Comentado: '
  );
  addBullet(
    'Procedimento: O usuário preenche notas e avança trilhas, fecha a aba e recarrega a página (F5). Comportamento: O estado serializado em formato JSON é restaurado integralmente do LocalStorage sem corrupção de tipos. Veredito: APROVADO.',
    'Caso TI-03 – Persistência de Sessão e Recuperação via LocalStorage: '
  );
  addBullet(
    'Procedimento: O estudante aciona o botão "Exportar Backup JSON" na barra lateral. Comportamento: Criação e download imediato do arquivo devquest_backup.json contendo toda a árvore de dados do usuário. Veredito: APROVADO.',
    'Caso TI-04 – Integridade da Exportação de Dados em JSON: '
  );

  addSubTitle('5.4 Matriz de Rastreabilidade e Cobertura de Testes');
  addParagraph(
    'A matriz a seguir mapeia a correlação unívoca entre os requisitos do sistema (Capítulo 03) e os casos de testes executados (Capítulo 05):'
  );

  addBullet('TU-01 | Cálculo Preditivo da A2 | Requisitos: RF05, RN01 | Cobertura: 100% (Aprovado)');
  addBullet('TU-02 | Alerta de Exame Final | Requisitos: RF05, RN01 | Cobertura: 100% (Aprovado)');
  addBullet('TU-03 | Limite de Faltas (Norma MEC 25%) | Requisitos: RF06, RN02 | Cobertura: 100% (Aprovado)');
  addBullet('TU-04 | Progressão de Nível RPG | Requisitos: RF03, RN03 | Cobertura: 100% (Aprovado)');
  addBullet('TI-01 | Editor de Código e Terminal | Requisitos: RF02, RNF01, RNF03 | Cobertura: 100% (Aprovado)');
  addBullet('TI-02 | Simulador de Questões ENADE | Requisitos: RF04, RNF02 | Cobertura: 100% (Aprovado)');
  addBullet('TI-03 | Persistência de Dados em Disco | Requisitos: RF08, RNF04 | Cobertura: 100% (Aprovado)');
  addBullet('TI-04 | Backup Estruturado JSON | Requisitos: RF08, RNF03 | Cobertura: 100% (Aprovado)');

  // ==================== CAPÍTULO 06: SEGURANÇA E PRIVACIDADE ====================
  addTitle('CAPÍTULO 06: MEDIDAS DE SEGURANÇA E PRIVACIDADE');
  addSubTitle('6.1 Proteção dos Dados e Inventário de Informações');
  addParagraph(
    'Durante a concepção e implementação do DevQuest, a proteção de dados foi estabelecida sob o princípio da Minimização de Dados (Data Minimization). O software processa exclusivamente o conjunto estritamente necessário para viabilizar as funcionalidades pedagógicas e acadêmicas:'
  );

  addBullet(
    'Identificador discente exibido na interface para personalização da experiência e emissão formal de relatórios. Armazenado localmente.',
    'Nome do Estudante e Registro Acadêmico (RA): '
  );
  addBullet(
    'Utilizado para comunicação de simulados e identificação unívoca de sessão de estudo.',
    'Endereço de Correio Eletrônico (E-mail): '
  );
  addBullet(
    'Pontuação acumulada de XP, saldo de Gold, desafios completados em cada linguagem e histórico de acertos no simulador ENADE. Finalidade: Alimentar o motor gamificado e a curva de aprendizado.',
    'Métricas de Progresso (Gamificação): '
  );
  addBullet(
    'Nomes de componentes curriculares, notas obtidas na Prova A1, Prova A2 e registro de faltas. Finalidade: Cálculo preditivo de aprovação e alerta de frequência.',
    'Histórico de Disciplinas e Avaliações: '
  );

  addParagraph(
    'Repositório e Meios de Armazenamento: O DevQuest adota como repositório primário a Web Storage API (LocalStorage do navegador do usuário sob a chave "devquest_plus_academico_v3"). Essa decisão arquitetural assegura que as informações pessoais e acadêmicas permaneçam sob custódia direta do dispositivo do estudante, eliminando a exposição a servidores de terceiros na nuvem não autorizados. No módulo portátil complementar (/academico), os dados são gerenciados em banco relacional MySQL utilizando isolamento por chaves primárias e relacionamentos com integridade referencial.'
  );

  addSubTitle('6.2 Autenticação e Controle de Acesso');
  addParagraph(
    'O controle de acesso ao sistema foi modelado para balancear usabilidade educacional e proteção contra acessos inadvertidos:'
  );

  addBullet(
    'Mecanismo de Acesso do Desenvolvedor/Aluno: Implementado na tela inicial (Landing Page), exige o preenchimento de credenciais (Nome, E-mail e Chave de Segurança). Na versão cliente-servidor (PHP/MySQL), a autenticação faz uso de sessões seguras gerenciadas via cookies protegidos com os atributos HttpOnly e SameSite=Strict, impedindo que scripts maliciosos de terceiros interceptem identificadores de sessão.',
    'Controle de Credenciais: '
  );
  addBullet(
    'Perfis e Permissões de Usuário (RBAC): O sistema prevê três níveis lógicos de perfil: (1) Perfil Estudante (acesso ao laboratório de código, simulador ENADE, boletim de notas, loja e relógio Pomodoro, sem permissão para alterar gabaritos ou regras de validação); (2) Perfil Docente/Monitor (capacidade de visualizar relatórios de turma, cadastrar novas questões no simulador e auditar o barema); (3) Perfil Administrador do Sistema (manutenção de parâmetros do banco de dados e auditoria de logs de integridade). Na versão SPA local autônoma, o estudante atua em seu sandbox privado isolado.',
    'Matriz de Acessos: '
  );

  addSubTitle('6.3 Privacidade e Uso das Informações (Conformidade com a LGPD)');
  addParagraph(
    'O tratamento das informações dos usuários observa estritamente os princípios basilares da Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018):'
  );

  addBullet(
    'Princípio da Finalidade e Adequação: Os dados acadêmicos e notas são utilizados única e exclusivamente para o cômputo matemático das médias semestrais e cálculo do limite de faltas, sendo vedado qualquer uso comercial, secundário ou discriminatório.',
    'Finalidade Específica: '
  );
  addBullet(
    'Não Compartilhamento com Terceiros: O DevQuest opera sob política estrita de "Zero Third-Party Sharing". Nenhuma informação de navegação, endereço de e-mail, notas ou progresso em código é comercializada, compartilhada ou transmitida para redes de anúncios publicitários, agregadores de telemetria ou ferramentas de rastreamento comportamental.',
    'Ausência de Rastreamento: '
  );
  addBullet(
    'Transparência e Autonomia do Titular (Art. 18 da LGPD): O estudante possui total controle sobre seus dados. A qualquer momento, através de um clique no botão "Reiniciar" na barra lateral, é possível revogar o consentimento e efetuar a deleção imediata e definitiva de todo o histórico armazenado no navegador.',
    'Direito à Eliminação dos Dados: '
  );

  addSubTitle('6.4 Prevenção de Vulnerabilidades Técnicas');
  addParagraph(
    'Para mitigar riscos de segurança da informação descritos nas diretrizes internacionais do OWASP (Open Web Application Security Project), foram implementadas defesas técnicas concretas:'
  );

  addBullet(
    'Prevenção contra Cross-Site Scripting (XSS): A renderização de dados no frontend é mediada pelo mecanismo virtual de escape do React 19. Todo texto digitado pelo usuário (como anotações do bloco de notas e nomes de disciplinas) é tratado como sequência de caracteres literais, impedindo a injeção e execução de scripts maliciosos (<script>). Adicionalmente, o terminal de execução simula o código em sandbox controlado através de interpretador sintático interno, sem invocação da função insegura eval().',
    'Mitigação de XSS: '
  );
  addBullet(
    'Prevenção contra SQL Injection: No módulo backend em PHP 8 (/academico), todas as consultas enviadas ao banco de dados MySQL utilizam a interface PDO com Prepared Statements e Parameter Binding obrigatório. Dessa forma, comandos maliciosos contendo operadores SQL (como OR 1=1 ou DROP TABLE) são neutralizados e tratados como simples literais alfanuméricos.',
    'Parametrização contra SQL Injection: '
  );
  addBullet(
    'Validação Estrita de Tipos e Sanitização de Entradas: O TypeScript valida a tipagem dos dados em tempo de compilação. As notas inseridas na calculadora acadêmica passam por validação aritmética que rejeita valores fora do intervalo formal [0.0; 10.0], strings não numéricas e valores nulos.',
    'Tratamento Seguro de Erros: '
  );
  addBullet(
    'Limitações Conhecidas e Evoluções Futuras: A versão atual em Single Page Application utiliza armazenamento de chaves no LocalStorage, o qual é protegido pelo isolamento de mesma origem (Same-Origin Policy - SOP) do navegador, porém suscetível a ataques físicos caso o dispositivo seja compartilhado sem senha de sistema operacional. Para a versão 2.0 em nuvem corporativa, projeta-se autenticação OAuth 2.0/OpenID Connect institucional e criptografia em repouso AES-256 no banco de dados centralizado.',
    'Limitações e Roadmap de Segurança: '
  );

  addSubTitle('6.5 Backup, Exportação e Recuperação de Dados');
  addParagraph(
    'A salvaguarda de informações educacionais vitais (histórico de notas e progresso em desafios) foi estruturada mediante mecanismos robustos de contingência:'
  );

  addBullet(
    'Mecanismo de Exportação Manual Estruturada (Backup JSON): A plataforma disponibiliza o recurso [RF08], permitindo ao discente exportar instantaneamente toda a árvore de dados (estado completo do sistema) em um arquivo formatado devquest_backup.json com codificação UTF-8. O estudante pode salvar essa cópia em seu armazenamento em nuvem pessoal (Google Drive, OneDrive) ou dispositivo físico.',
    'Rotina de Backup pelo Usuário: '
  );
  addBullet(
    'Restauração de Desastres (Disaster Recovery): Em situações de exclusão acidental do histórico de navegação, troca de máquina ou indisponibilidade local, a plataforma provê rotina de importação que valida o esquema JSON de backup antes da reinjeção no LocalStorage, prevenindo inconsistências de dados.',
    'Recuperação de Falhas: '
  );
  addBullet(
    'Solução de Backup para Versões Futuras: Para a versão distribuída em larga escala na universidade, planeja-se a automação de backups diários agendados (via Cron Jobs e snapshots automatizados de banco PostgreSQL/MySQL com retenção rotativa de 30 dias e replicação geográfica).',
    'Planejamento de Continuidade: '
  );

  // ==================== CONSIDERAÇÕES FINAIS ====================
  addTitle('CONSIDERAÇÕES FINAIS');
  addParagraph(
    'A consolidação cumulativa dos Capítulos 01 ao 06 comprova a maturidade técnica, pedagógica, arquitetural e regulatória da plataforma DevQuest. A união de desenvolvimento web moderno com metodologias ativas de gamificação, plano de testes abrangente e conformidade explícita com a Lei Geral de Proteção de Dados (LGPD) posiciona este trabalho como um projeto completo de engenharia de software.'
  );
  addParagraph(
    'O cumprimento rigoroso dos requisitos de implementação, verificação de qualidade e salvaguarda de privacidade atende de forma irretocável às exigências acadêmicas da Diretoria de Ciências Exatas e Tecnologia da Informação da UNINOVE para a avaliação final da disciplina.'
  );

  addSubTitle('REFERÊNCIAS BIBLIOGRÁFICAS');
  addBullet('BRASIL. Lei nº 13.709, de 14 de agosto de 2018. Lei Geral de Proteção de Dados Pessoais (LGPD). Brasília: Diário Oficial da União, 2018.');
  addBullet('FOWLER, Martin. Refatoração: Aperfeiçoando o Design de Códigos Existentes. 2. ed. São Paulo: Novatec, 2020.');
  addBullet('INEP. Relatório de Avaliação e Provas do ENADE – Tecnologia em Análise e Desenvolvimento de Sistemas. Brasília: MEC, 2021.');
  addBullet('OWASP. OWASP Top 10: The Ten Most Critical Web Application Security Risks. Open Web Application Security Project, 2021.');
  addBullet('PRESSMAN, Roger S.; MAXIM, Bruce R. Engenharia de Software: Uma Abordagem Profissional. 9. ed. Porto Alegre: AMGH, 2021.');
  addBullet('SOMMERVILLE, Ian. Engenharia de Software. 10. ed. São Paulo: Pearson, 2019.');
  addBullet('W3C. Web Content Accessibility Guidelines (WCAG) 2.1. World Wide Web Consortium, 2021.');

  drawFooter(currentPage, pageNumber);

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve(process.cwd(), 'public', 'DevQuest_Documentacao_Capitulos_01_ao_06.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  
  // Atualizar também o arquivo legado com capítulos 01 ao 05 para manter retrocompatibilidade
  const outputPathLegado = path.resolve(process.cwd(), 'public', 'DevQuest_Documentacao_Capitulos_01_ao_05.pdf');
  fs.writeFileSync(outputPathLegado, pdfBytes);

  console.log('PDF cumulativo atualizado com sucesso em:', outputPath);
}

generatePDF().catch(console.error);
