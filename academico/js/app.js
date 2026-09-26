// js/app.js - DevQuest Core Engine v9.0

// 1. Estado Inicial Compartilhado
const ESTADO_PADRAO = {
    nome: "Fernando Santos",
    ra: "3126200342",
    turma: "ADS — Polo Vila Prudente",
    nivel: 1,
    xp: 120,
    xpLimite: 500,
    gold: 150,
    streak: 3,
    historiaLida: false,
    livrosLidos: [],
    missoes: [
        { id: 1, texto: "Completar 1 Pomodoro de Foco", concluida: false, xpRecompensa: 40, goldRecompensa: 20 },
        { id: 2, texto: "Resgatar uma Auto-Recompensa", concluida: false, xpRecompensa: 20, goldRecompensa: 10 },
        { id: 3, texto: "Concluir um Desafio de Python", concluida: false, xpRecompensa: 30, goldRecompensa: 15 }
    ],
    recompensas: [
        { id: 1, emoji: "☕", nome: "Tomar um Café Espresso Premium", custo: 40 },
        { id: 2, emoji: "🎮", nome: "Jogar 20 minutos de Videogame", custo: 80 },
        { id: 3, emoji: "📺", nome: "Assistir 1 ep de Série", custo: 120 }
    ],
    historicoResgates: [
        { data: "04/09/2026 - 15:30", nome: "Tomar um Café Espresso Premium", custo: 40, status: "Consumido" }
    ],
    quizRespondido: false,
    quizHP: 100,
    desafiosPython: [
        {
            id: 1,
            titulo: "1. O Registro do Herói",
            enunciado: "Crie uma variável chamada <b>heroi</b> que receba a string <b>'Fernando'</b>.",
            codigoCorreto: "heroi = 'Fernando'",
            dicaPedagogica: "Lembre-se de colocar o nome 'Fernando' entre aspas simples (') ou aspas duplas. Não use print, apenas declare a variável!",
            recompensaXP: 20,
            recompensaGold: 10,
            concluido: false,
            disponivel: true
        },
        {
            id: 2,
            titulo: "2. Quantidade de Poções",
            enunciado: "Crie uma variável chamada <b>pocoes</b> que armazene o número inteiro <b>5</b>.",
            codigoCorreto: "pocoes = 5",
            dicaPedagogica: "Escreva estritamente 'pocoes = 5'. Números inteiros não levam aspas!",
            recompensaXP: 25,
            recompensaGold: 12,
            concluido: false,
            disponivel: false
        },
        {
            id: 3,
            titulo: "3. Calculando o Dano",
            enunciado: "Calcule a vida restante: subtraia <b>dano</b> de <b>vida</b> e salve em <b>resultado</b>.<br/><i>Dica: use vida - dano</i>",
            codigoCorreto: "resultado = vida - dano",
            dicaPedagogica: "Escreva exatamente: 'resultado = vida - dano'",
            recompensaXP: 30,
            recompensaGold: 15,
            concluido: false,
            disponivel: false
        },
        {
            id: 4,
            titulo: "4. Multiplicação de Moedas",
            enunciado: "Dobre o valor de <b>gold</b> multiplicando por <b>2</b> e salve em <b>total</b>.",
            codigoCorreto: "total = gold * 2",
            dicaPedagogica: "O operador de multiplicação é o asterisco (*). Escreva: 'total = gold * 2'",
            recompensaXP: 35,
            recompensaGold: 18,
            concluido: false,
            disponivel: false
        },
        {
            id: 5,
            titulo: "5. O Portão Condicional",
            enunciado: "Escreva uma condição <b>if</b> que testa se <b>nivel >= 5</b>.",
            codigoCorreto: "if nivel >= 5:",
            dicaPedagogica: "Em Python, o if exige dois pontos (:) no final. Escreva: 'if nivel >= 5:'",
            recompensaXP: 40,
            recompensaGold: 20,
            concluido: false,
            disponivel: false
        },
        {
            id: 6,
            titulo: "6. Mensagem de Alerta",
            enunciado: "Use a função de saída para imprimir o texto <b>'Aviso!'</b> na tela.",
            codigoCorreto: "print('Aviso!')",
            dicaPedagogica: "Use a função nativa print(): 'print('Aviso!')'",
            recompensaXP: 45,
            recompensaGold: 22,
            concluido: false,
            disponivel: false
        },
        {
            id: 7,
            titulo: "7. Estrutura de Listas",
            enunciado: "Crie uma lista vazia chamada <b>inventario</b> em Python.",
            codigoCorreto: "inventario = []",
            dicaPedagogica: "Listas usam colchetes [ ]. Para lista vazia: 'inventario = []'",
            recompensaXP: 50,
            recompensaGold: 25,
            concluido: false,
            disponivel: false
        },
        {
            id: 8,
            titulo: "8. Adicionando Espada",
            enunciado: "Adicione o texto <b>'espada'</b> à lista inventario usando a função append.",
            codigoCorreto: "inventario.append('espada')",
            dicaPedagogica: "Escreva exatamente: 'inventario.append('espada')'",
            recompensaXP: 55,
            recompensaGold: 28,
            concluido: false,
            disponivel: false
        },
        {
            id: 9,
            titulo: "9. Contador de Laço",
            enunciado: "Escreva um laço que repita uma ação de 0 a 4.<br/><i>Dica: for i in range(5):</i>",
            codigoCorreto: "for i in range(5):",
            dicaPedagogica: "Use range(5) e não esqueça dos dois pontos: 'for i in range(5):'",
            recompensaXP: 60,
            recompensaGold: 30,
            concluido: false,
            disponivel: false
        },
        {
            id: 10,
            titulo: "10. Invocação de Função",
            enunciado: "Defina uma função simples de nome <b>estudar()</b> em Python.",
            codigoCorreto: "def estudar():",
            dicaPedagogica: "Definição de função: 'def estudar():'",
            recompensaXP: 70,
            recompensaGold: 40,
            concluido: false,
            disponivel: false
        }
    ]
};

// Carrega o estado atualizado do localStorage ou define o padrão
let estado = JSON.parse(localStorage.getItem('devquest_estado')) || ESTADO_PADRAO;

// Auto-reparo de campos novos
if (!estado.nome) estado.nome = ESTADO_PADRAO.nome;
if (estado.notasBloco === undefined) estado.notasBloco = "";
if (estado.senha === undefined) estado.senha = "1234";
if (!estado.ra) estado.ra = ESTADO_PADRAO.ra;
if (!estado.turma) estado.turma = ESTADO_PADRAO.turma;
if (estado.historiaLida === undefined) estado.historiaLida = false;
if (!estado.livrosLidos) estado.livrosLidos = [];

function salvarEstado() {
    localStorage.setItem('devquest_estado', JSON.stringify(estado));
}

// ── BANCO DE PERGUNTAS DO QUIZ ────────────────────────────────────────
const BANCO_QUIZ = {
    pergunta: "Em Análise e Desenvolvimento de Sistemas, qual das alternativas abaixo descreve uma classe em Orientação a Objetos?",
    opcoes: [
        { texto: "Uma função isolada que executa cálculos lógicos.", correta: false },
        { texto: "Um modelo estruturado que define os atributos e comportamentos de um objeto.", correta: true },
        { texto: "Uma variável global usada para armazenar senhas cifradas.", correta: false }
    ],
    recompensaGold: 25,
    recompensaXP: 15
};

// ── ENGINE PRINCIPAL DA UI ───────────────────────────────────────────
function renderUI() {
    // 1. Sidebar Elements
    const txtNomeHeader = document.getElementById('txt-nome-aluno');
    const txtNomeSidebar = document.getElementById('txt-nome-sidebar');
    const txtRaBanner = document.getElementById('txt-ra-banner');
    const txtNivel = document.getElementById('txt-nivel');
    const txtStreak = document.getElementById('txt-streak');
    const txtGold = document.getElementById('txt-gold');
    const txtXpRatio = document.getElementById('txt-xp-ratio');
    const barraXpFill = document.getElementById('barra-xp-fill');

    if (txtNomeHeader) txtNomeHeader.textContent = estado.nome;
    if (txtNomeSidebar) txtNomeSidebar.textContent = estado.nome;
    if (txtRaBanner) txtRaBanner.textContent = `RA: ${estado.ra} | ${estado.turma}`;
    if (txtNivel) txtNivel.textContent = estado.nivel;
    if (txtStreak) txtStreak.textContent = estado.streak;
    if (txtGold) txtGold.textContent = estado.gold;
    if (txtXpRatio) txtXpRatio.textContent = `${estado.xp} / ${estado.xpLimite} XP`;
    
    if (barraXpFill) {
        const pctXp = Math.min((estado.xp / estado.xpLimite) * 100, 100);
        barraXpFill.style.width = `${pctXp}%`;
    }

    // 2. Missões Diárias (index.html)
    const listaMissoes = document.getElementById('lista-missoes');
    if (listaMissoes) {
        listaMissoes.innerHTML = '';
        estado.missoes.forEach(missao => {
            const item = document.createElement('li');
            item.className = `missao-item ${missao.concluida ? 'concluida' : ''}`;
            item.innerHTML = `
                <input type="checkbox" ${missao.concluida ? 'checked' : ''} disabled>
                <span>${missao.texto} (🪙+${missao.goldRecompensa} / ⚡+${missao.xpRecompensa} XP)</span>
            `;
            listaMissoes.appendChild(item);
        });
    }

    // 3. Trilhas e Sandbox (trilhas.html / exercicios.html)
    if (document.getElementById('lista-desafios')) {
        renderTrilhaPython();
    }

    // 4. Quiz (quiz.html)
    if (document.getElementById('box-quiz')) {
        renderArenaQuiz();
    }

    // 5. Loja (loja.html)
    if (document.getElementById('grid-recompensas')) {
        renderLojaVitrine();
        renderLojaHistorico();
    }

    // 6. História & Livros (historia.html)
    if (document.getElementById('btn-concluir-historia')) {
        renderHistoriaELivros();
    }
}

function completarMissao(id) {
    const missao = estado.missoes.find(m => m.id === id);
    if (missao && !missao.concluida) {
        missao.concluida = true;
        estado.gold += missao.goldRecompensa;
        estado.xp += missao.xpRecompensa;
        checarLevelUp();
        salvarEstado();
    }
}

function checarLevelUp() {
    if (estado.xp >= estado.xpLimite) {
        estado.xp -= estado.xpLimite;
        estado.nivel += 1;
        estado.xpLimite = Math.floor(estado.xpLimite * 1.5);
        dispararConfetes();
        alert(`🎉 EXCELENTE TRABALHO, ${estado.nome.toUpperCase()}! Você subiu para o Nível ${estado.nivel}!`);
    }
}

// ── RELÓGIO ESTILIZADO EM TERMINAL (Dashboard) ─────────────────────
function iniciarRelogioTerminal() {
    const clockTime = document.getElementById('terminal-clock-time');
    const clockStatus = document.getElementById('terminal-clock-status');
    if (!clockTime) return;

    function atualizarRelogio() {
        const agora = new Date();
        const h = agora.getHours().toString().padStart(2, '0');
        const m = agora.getMinutes().toString().padStart(2, '0');
        const s = agora.getSeconds().toString().padStart(2, '0');
        clockTime.textContent = `${h}:${m}:${s}`;

        if (clockStatus) {
            const horaNum = agora.getHours();
            if (horaNum >= 5 && horaNum < 12) {
                clockStatus.textContent = '>>> [STATUS] Compilando café e inicializando o foco matinal...';
            } else if (horaNum >= 12 && horaNum < 18) {
                clockStatus.textContent = '>>> [STATUS] Refatorando algoritmos e resolvendo desafios lógicos...';
            } else if (horaNum >= 18 && horaNum < 24) {
                clockStatus.textContent = `>>> [STATUS] Modo Noturno ativo. Foco no Polo Vila Prudente (${estado.ra}).`;
            } else {
                clockStatus.textContent = '>>> [STATUS] Corujão de ADS! Compilando ideias na calada da noite.';
            }
        }
    }

    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
}

// ── SISTEMA DA PÁGINA HISTÓRIA & LIVROS ────────────────────────────
function renderHistoriaELivros() {
    const btnHistoria = document.getElementById('btn-concluir-historia');
    if (btnHistoria) {
        if (estado.historiaLida) {
            btnHistoria.textContent = 'Sábio do Código Conquistado! 📜 (+30 XP)';
            btnHistoria.disabled = true;
            btnHistoria.style.backgroundColor = '#10B981';
            btnHistoria.style.color = 'white';
        } else {
            btnHistoria.addEventListener('click', () => {
                estado.historiaLida = true;
                estado.xp += 30;
                estado.gold += 15;
                checarLevelUp();
                salvarEstado();
                renderUI();
                dispararConfetes();
                alert('📜 Você concluiu a leitura dos Ancestrais da Programação! +30 XP e +15 Gold creditados!');
            });
        }
    }

    // Botões dos livros
    const btnsLivros = document.querySelectorAll('.btn-ler-livro');
    btnsLivros.forEach(btn => {
        const libroId = parseInt(btn.getAttribute('data-livro-id'));
        if (estado.livrosLidos.includes(libroId)) {
            btn.textContent = 'Grimório Lido! 📗 (+25 XP)';
            btn.disabled = true;
            btn.style.backgroundColor = '#10B981';
            btn.style.color = 'white';
        } else {
            btn.addEventListener('click', () => {
                if (!estado.livrosLidos.includes(libroId)) {
                    estado.livrosLidos.push(libroId);
                    estado.xp += 25;
                    estado.gold += 10;
                    checarLevelUp();
                    salvarEstado();
                    renderUI();
                    dispararConfetes();
                }
            });
        }
    });
}

// ── TRILHAS DE CÓDIGO E SANDBOX ──────────────────────────────────────
let desafioSelecionado = null;

function renderTrilhaPython() {
    const container = document.getElementById('lista-desafios');
    const txtProgresso = document.getElementById('txt-progresso-python');
    
    if (!container) return;
    container.innerHTML = '';
    let concluidosCount = 0;

    estado.desafiosPython.forEach(desafio => {
        if (desafio.concluido) concluidosCount++;

        const item = document.createElement('div');
        let statusClass = 'bloqueado';
        let icon = '🔒';

        if (desafio.concluido) {
            statusClass = 'concluido';
            icon = '✅';
        } else if (desafio.disponivel) {
            statusClass = 'disponivel';
            icon = '⚡';
        }

        item.className = `desafio-item ${statusClass}`;
        item.innerHTML = `
            <div class="desafio-meta">
                <span class="desafio-titulo">${icon} ${desafio.titulo}</span>
                <span class="desafio-recompensa">🪙 +${desafio.recompensaGold} / ⚡ +${desafio.recompensaXP} XP</span>
            </div>
            <button class="btn btn-accent" ${statusClass === 'bloqueado' ? 'disabled' : ''}>
                ${desafio.concluido ? 'Refazer' : 'Praticar'}
            </button>
        `;

        if (statusClass !== 'bloqueado') {
            item.querySelector('button').addEventListener('click', () => {
                abrirSandboxDesafio(desafio);
            });
        }

        container.appendChild(item);
    });

    if (txtProgresso) txtProgresso.textContent = concluidosCount;

    const cursoPHP = document.getElementById('curso-php');
    const lblPHP = document.getElementById('lbl-requisito-php');
    if (cursoPHP && lblPHP) {
        if (estado.nivel >= 2) {
            cursoPHP.className = "card card-trilha-lang";
            lblPHP.textContent = "🔓 DESBLOQUEADO! (Curso em Breve)";
            lblPHP.style.color = "var(--cyan)";
        }
    }

    const cursoSQL = document.getElementById('curso-sql');
    const lblSQL = document.getElementById('lbl-requisito-sql');
    if (cursoSQL && lblSQL) {
        if (estado.nivel >= 3) {
            cursoSQL.className = "card card-trilha-lang";
            lblSQL.textContent = "🔓 DESBLOQUEADO! (Curso em Breve)";
            lblSQL.style.color = "var(--cyan)";
        }
    }
}

function abrirSandboxDesafio(desafio) {
    desafioSelecionado = desafio;
    const box = document.getElementById('sandbox-box');
    const titulo = document.getElementById('sandbox-titulo');
    const enunciado = document.getElementById('sandbox-enunciado');
    const inputCodigo = document.getElementById('sandbox-codigo');
    const feedback = document.getElementById('sandbox-feedback');
    const initBox = document.getElementById('sandbox-instrucoes-iniciais');
    const consoleBox = document.getElementById('terminal-console');

    if (initBox) initBox.style.display = 'none';
    if (box) box.style.display = 'flex';
    if (titulo) titulo.textContent = `📝 Resolvendo: ${desafio.titulo}`;
    if (enunciado) enunciado.innerHTML = desafio.enunciado;
    if (inputCodigo) inputCodigo.value = desafio.concluido ? desafio.codigoCorreto : '';
    if (feedback) {
        feedback.textContent = '';
        feedback.style.color = '';
    }

    if (consoleBox) {
        consoleBox.innerHTML = '<div class="terminal-line info">>>> Interpretador carregado. Escreva o script e clique em Executar.</div>';
    }
}

// Envios de Sandbox
const btnSandboxEnviar = document.getElementById('btn-sandbox-enviar');
if (btnSandboxEnviar) {
    btnSandboxEnviar.addEventListener('click', () => {
        const codigoDigitado = document.getElementById('sandbox-codigo').value.trim();
        const feedback = document.getElementById('sandbox-feedback');
        const consoleBox = document.getElementById('terminal-console');

        if (!desafioSelecionado) return;

        if (consoleBox) {
            consoleBox.innerHTML = '';
            adicionarLinhaTerminal('>>> python sandbox_python.py', 'info');
            adicionarLinhaTerminal('[INFO] Inicializando analisador léxico e sintático...', 'muted');
        }

        const formatarStr = str => str.replace(/\"/g, "'").replace(/"/g, "'").replace(/\s+/g, "");

        setTimeout(() => {
            if (formatarStr(codigoDigitado) === formatarStr(desafioSelecionado.codigoCorreto)) {
                if (feedback) {
                    feedback.textContent = "Código Correto! 🎉";
                    feedback.style.color = "#10B981";
                }
                
                adicionarLinhaTerminal('[OK] Sintaxe validada e executada com sucesso!', 'success');
                adicionarLinhaTerminal(`>>> Resultado: ${desafioSelecionado.codigoCorreto}`, 'success');
                adicionarLinhaTerminal(`>>> XP Concedido: +${desafioSelecionado.recompensaXP} XP | Gold: +${desafioSelecionado.recompensaGold}🪙`, 'success');

                dispararConfetes();

                if (!desafioSelecionado.concluido) {
                    estado.gold += desafioSelecionado.recompensaGold;
                    estado.xp += desafioSelecionado.recompensaXP;
                    desafioSelecionado.concluido = true;

                    const indexAtual = estado.desafiosPython.findIndex(d => d.id === desafioSelecionado.id);
                    if (indexAtual !== -1 && indexAtual + 1 < estado.desafiosPython.length) {
                        estado.desafiosPython[indexAtual + 1].disponivel = true;
                    }

                    completarMissao(3);
                    checarLevelUp();
                }

                salvarEstado();
                setTimeout(() => {
                    renderTrilhaPython();
                    renderUI();
                }, 2000);
            } else {
                if (feedback) {
                    feedback.textContent = "Falha nos testes. Veja o terminal! ❌";
                    feedback.style.color = "#EF4444";
                }
                adicionarLinhaTerminal('[ERRO] AssertionError: Saída ou sintaxe não confere com o gabarito.', 'error');
                adicionarLinhaTerminal(`[💡 DICA PEDAGÓGICA] ${desafioSelecionado.dicaPedagogica}`, 'info');
                adicionarLinhaTerminal(`[AJUDA] O código esperado deve ser: ${desafioSelecionado.codigoCorreto}`, 'error');
            }
        }, 600);
    });
}

function adicionarLinhaTerminal(texto, tipo) {
    const consoleBox = document.getElementById('terminal-console');
    if (!consoleBox) return;
    const div = document.createElement('div');
    div.className = `terminal-line ${tipo}`;
    div.textContent = texto;
    consoleBox.appendChild(div);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

// ── SISTEMA DA ARENA QUIZ ──────────────────────────────────────────────
function renderArenaQuiz() {
    const txtPergunta = document.getElementById('txt-quiz-pergunta');
    const boxOpcoes = document.getElementById('box-quiz-opcoes');
    const txtFeedback = document.getElementById('txt-quiz-feedback');
    const txtBossHp = document.getElementById('txt-boss-hp');
    const barraBoss = document.getElementById('barra-boss-vida');
    const bossAvatar = document.getElementById('txt-boss-avatar');

    if (txtBossHp) txtBossHp.textContent = `HP: ${estado.quizHP} / 100`;
    if (barraBoss) barraBoss.style.width = `${estado.quizHP}%`;

    if (estado.quizRespondido || estado.quizHP <= 0) {
        if (txtPergunta) txtPergunta.textContent = "O Bug do Sistema foi derrotado hoje! Retorne amanhã para novos desafios lógicos.";
        if (boxOpcoes) boxOpcoes.innerHTML = "";
        if (txtFeedback) {
            txtFeedback.textContent = "⚔️ Arena limpa e vitoriosa!";
            txtFeedback.style.color = "var(--cyan)";
        }
        if (bossAvatar) bossAvatar.textContent = "💀";
        if (barraBoss) barraBoss.style.width = "0%";
        if (txtBossHp) txtBossHp.textContent = `HP: 0 / 100`;
        return;
    }

    if (txtPergunta) txtPergunta.textContent = BANCO_QUIZ.pergunta;
    if (boxOpcoes) {
        boxOpcoes.innerHTML = '';
        BANCO_QUIZ.opcoes.forEach(opcao => {
            const btn = document.createElement('button');
            btn.className = "btn-opcao";
            btn.textContent = opcao.texto;
            btn.addEventListener('click', () => {
                validarRespostaArena(opcao.correta);
            });
            boxOpcoes.appendChild(btn);
        });
    }
    if (txtFeedback) txtFeedback.textContent = '';
}

function validarRespostaArena(correta) {
    const txtFeedback = document.getElementById('txt-quiz-feedback');
    const bossAvatar = document.getElementById('txt-boss-avatar');

    if (correta) {
        dispararConfetes();
        estado.quizHP = 0;
        estado.gold += BANCO_QUIZ.recompensaGold;
        estado.xp += BANCO_QUIZ.recompensaXP;
        estado.quizRespondido = true;
        
        if (txtFeedback) {
            txtFeedback.textContent = "Ataque Crítico! O Bug foi destruído! +25 Gold e +15 XP creditados! ⚔️🎉";
            txtFeedback.style.color = "#10B981";
        }
        if (bossAvatar) bossAvatar.textContent = "💥";
        checarLevelUp();
    } else {
        if (txtFeedback) {
            txtFeedback.textContent = "Esquiva! O Boss rebateu o seu ataque. Reveja seus conceitos!";
            txtFeedback.style.color = "#EF4444";
        }
    }
    salvarEstado();
    setTimeout(() => {
        renderUI();
    }, 2000);
}

// ── SISTEMA DA LOJA ────────────────────────────────────────────────────
function renderLojaVitrine() {
    const grid = document.getElementById('grid-recompensas');
    if (!grid) return;
    grid.innerHTML = '';

    estado.recompensas.forEach(recompensa => {
        const item = document.createElement('div');
        item.className = 'recompensa-item';
        item.innerHTML = `
            <div>
                <span class="item-icon">${recompensa.emoji}</span>
                <h4>${recompensa.nome}</h4>
            </div>
            <div>
                <p class="custo-gold">🪙 ${recompensa.custo} Gold</p>
                <button class="btn btn-accent btn-resgatar" data-id="${recompensa.id}">Resgatar</button>
            </div>
        `;
        grid.appendChild(item);
    });

    document.querySelectorAll('.btn-resgatar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            resgatarLojaItem(id, e.target);
        });
    });
}

function resgatarLojaItem(id, botaoElement) {
    const item = estado.recompensas.find(r => r.id === id);
    if (!item) return;

    if (estado.gold >= item.custo) {
        estado.gold -= item.custo;
        
        const agora = new Date();
        const dataStr = `${agora.getDate().toString().padStart(2, '0')}/${(agora.getMonth() + 1).toString().padStart(2, '0')}/${agora.getFullYear()} - ${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}`;
        
        estado.historicoResgates.unshift({
            data: dataStr,
            nome: item.nome,
            custo: item.custo,
            status: "Aprovado"
        });

        completarMissao(2);
        
        botaoElement.textContent = "Aprovado! ☕";
        botaoElement.disabled = true;
        botaoElement.style.backgroundColor = "#10B981";
        botaoElement.style.color = "white";
        
        dispararConfetes();
        salvarEstado();
        
        setTimeout(() => {
            renderUI();
        }, 1500);
    } else {
        botaoElement.textContent = "Gold Insuficiente! ❌";
        botaoElement.classList.add('erro-animacao');
        setTimeout(() => {
            botaoElement.classList.remove('erro-animacao');
            botaoElement.textContent = "Resgatar";
        }, 1500);
    }
}

function renderLojaHistorico() {
    const tbody = document.getElementById('historico-resgates-lista');
    if (!tbody) return;

    tbody.innerHTML = '';
    estado.historicoResgates.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${log.data}</td>
            <td><b>${log.nome}</b></td>
            <td style="color: var(--yellow); font-weight: 800;">🪙 ${log.custo}</td>
            <td style="color: #10B981; font-weight: 800;">${log.status}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ── CRONÔMETRO POMODORO ───────────────────────────────────────────────
let timerIntervalo = null;
let tempoRestante = 25 * 60;
let timerAtivo = false;

const txtTimer = document.getElementById('txt-timer');
const btnTimerControle = document.getElementById('btn-timer-controle');
const btnTimerReset = document.getElementById('btn-timer-reset');

function atualizarTimerDisplay() {
    if (!txtTimer) return;
    txtTimer.textContent = `${Math.floor(tempoRestante / 60).toString().padStart(2, '0')}:${(tempoRestante % 60).toString().padStart(2, '0')}`;
    
    const s = tempoRestante % 60;
    if (s >= 30) {
        txtTimer.className = "timer-display color-pink";
    } else {
        txtTimer.className = "timer-display color-cyan";
    }
}

if (btnTimerControle) {
    btnTimerControle.addEventListener('click', () => {
        if (timerAtivo) {
            clearInterval(timerIntervalo);
            btnTimerControle.textContent = "Retomar Foco";
            btnTimerControle.style.backgroundColor = "var(--cyan)";
            btnTimerControle.style.color = "#0F172A";
            timerAtivo = false;
        } else {
            timerAtivo = true;
            btnTimerControle.textContent = "Pausar Foco";
            btnTimerControle.style.backgroundColor = "var(--pink)";
            btnTimerControle.style.color = "white";
            
            timerIntervalo = setInterval(() => {
                if (tempoRestante > 0) {
                    tempoRestante--;
                    atualizarTimerDisplay();
                } else {
                    clearInterval(timerIntervalo);
                    concluirPomodoro();
                }
            }, 1000);
        }
    });
}

if (btnTimerReset) {
    btnTimerReset.addEventListener('click', () => {
        clearInterval(timerIntervalo);
        tempoRestante = 25 * 60;
        timerAtivo = false;
        btnTimerControle.textContent = "Iniciar Foco";
        btnTimerControle.style.backgroundColor = "";
        btnTimerControle.style.color = "";
        atualizarTimerDisplay();
    });
}

function concluirPomodoro() {
    dispararConfetes();
    estado.xp += 40;
    estado.gold += 20;
    completarMissao(1);
    checarLevelUp();
    
    tempoRestante = 25 * 60;
    timerAtivo = false;
    if (btnTimerControle) {
        btnTimerControle.textContent = "Iniciar Foco";
        btnTimerControle.style.backgroundColor = "";
        btnTimerControle.style.color = "";
    }
    atualizarTimerDisplay();
    salvarEstado();
    renderUI();
    alert("🍅 Pomodoro Concluído! Parabéns pelo seu foco! Seu Gold e XP foram creditados.");
}

function dispararConfetes() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#22D3EE', '#FF2E93', '#A78BFA', '#FBBF24', '#34D399']
        });
    }
}

// ── MODAL DE LOGIN (Identificação do Herói) ──────────────────────────
const modalLogin = document.getElementById('modal-login');
const btnAbrirLogin = document.getElementById('btn-abrir-login');
const btnFecharLogin = document.getElementById('btn-fechar-login');
const formLogin = document.getElementById('form-login');

if (btnAbrirLogin && modalLogin) {
    btnAbrirLogin.addEventListener('click', () => {
        document.getElementById('campo-login-nome').value = estado.nome;
        document.getElementById('campo-login-ra').value = estado.ra;
        document.getElementById('campo-login-turma').value = estado.turma;
        modalLogin.classList.add('active');
    });
}

if (btnFecharLogin && modalLogin) {
    btnFecharLogin.addEventListener('click', () => modalLogin.classList.remove('active'));
}

if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        estado.nome = document.getElementById('campo-login-nome').value.trim();
        estado.ra = document.getElementById('campo-login-ra').value.trim();
        estado.turma = document.getElementById('campo-login-turma').value.trim();
        salvarEstado();
        renderUI();
        modalLogin.classList.remove('active');
        alert('🎉 Perfil do Aluno atualizado com sucesso!');
    });
}

// ── MODAL DE RECOMPENSAS (Loja) ──────────────────────────────────────
const modal = document.getElementById('modal-cadastro');
const btnAbrirModal = document.getElementById('btn-abrir-modal');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const formRecompensa = document.getElementById('form-recompensa');

if (btnAbrirModal) btnAbrirModal.addEventListener('click', () => modal.classList.add('active'));
if (btnFecharModal) btnFecharModal.addEventListener('click', () => modal.classList.remove('active'));

if (formRecompensa) {
    formRecompensa.addEventListener('submit', (e) => {
        e.preventDefault();
        const novoItem = {
            id: Date.now(),
            emoji: document.getElementById('campo-emoji').value,
            nome: document.getElementById('campo-nome').value,
            custo: parseInt(document.getElementById('campo-custo').value)
        };
        
        estado.recompensas.push(novoItem);
        salvarEstado();
        renderUI();
        formRecompensa.reset();
        modal.classList.remove('active');
    });
}

// Inicialização
window.onload = () => {
    renderUI();
    atualizarTimerDisplay();
    iniciarRelogioTerminal();
    iniciarBlocoNotas();
};

// ── SISTEMA DE LOGIN / LOGOUT E BLOCO DE NOTAS (v10.0) ───────────────

// Bloco de Notas Auto-Save
function iniciarBlocoNotas() {
    const txtNotas = document.getElementById('txt-bloco-notas');
    const btnLimpar = document.getElementById('btn-limpar-notas');
    const txtStatus = document.getElementById('txt-bloco-status');

    if (!txtNotas) return;

    // Carrega notas salvas
    txtNotas.value = estado.notasBloco || '';

    txtNotas.addEventListener('input', () => {
        estado.notasBloco = txtNotas.value;
        salvarEstado();
        if (txtStatus) {
            txtStatus.textContent = '💾 Salvo automaticamente';
            txtStatus.style.color = 'var(--emerald)';
        }
    });

    if (btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            if (confirm('Deseja realmente apagar suas anotações do bloco?')) {
                txtNotas.value = '';
                estado.notasBloco = '';
                salvarEstado();
                if (txtStatus) {
                    txtStatus.textContent = '🗑️ Bloco limpo';
                    txtStatus.style.color = 'var(--pink)';
                }
            }
        });
    }
}

// Botão de Logout (Sair)
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        if (confirm('Deseja deslogar do DevQuest?')) {
            estado.autenticado = false;
            salvarEstado();
            alert('🚪 Você saiu da conta. Faça login novamente para acessar seus dados.');
            const modalLogin = document.getElementById('modal-login');
            if (modalLogin) modalLogin.classList.add('active');
        }
    });
}

// Modal de Login com Senha (sem RA)
const modalLoginV10 = document.getElementById('modal-login');
const formLoginV10 = document.getElementById('form-login');

if (formLoginV10) {
    formLoginV10.addEventListener('submit', (e) => {
        e.preventDefault();
        const nomeInput = document.getElementById('campo-login-nome').value.trim();
        const senhaInput = document.getElementById('campo-login-senha').value.trim();

        if (nomeInput && senhaInput) {
            estado.nome = nomeInput;
            estado.senha = senhaInput;
            estado.autenticado = true;
            salvarEstado();
            renderUI();
            if (modalLoginV10) modalLoginV10.classList.remove('active');
            dispararConfetes();
            alert(`🎉 Bem-vindo ao DevQuest, ${estado.nome}! Login realizado com sucesso!`);
        }
    });
}
