/**
 * DevQuest Acadêmico - Lógica do Frontend em JavaScript Puro (Vanilla JS)
 * Disciplina: Análise e Desenvolvimento de Sistemas (ADS)
 * Autor: Fernando Santos
 */

let desafios = [];
let desafioAtual = null;
let xpUsuario = 150;
let nivelUsuario = 1;

// Gerenciador do Cronômetro Pomodoro
let tempoPomodoro = 25 * 60; // 25 minutos em segundos
let timerInterval = null;
let pomodoroRodando = false;

document.addEventListener("DOMContentLoaded", () => {
    carregarDesafios();
    configurarPomodoro();
});

/**
 * Busca os desafios via AJAX / Fetch do backend PHP
 */
async function carregarDesafios() {
    try {
        const resposta = await fetch("api_desafios.php");
        const json = await resposta.json();

        if (json.desafios && json.desafios.length > 0) {
            desafios = json.desafios;
        } else if (json.dados) {
            desafios = json.dados;
        }

        renderizarDesafio(0);
    } catch (e) {
        console.warn("Aviso: Servidor PHP não acessível diretamente, usando dados locais de fallback.");
        desafios = [
            {
                id: 1,
                titulo: "Tag de Cabeçalho Semântico",
                linguagem: "html_css",
                instrucao: "Escreva a tag de cabeçalho principal com o texto: DevQuest",
                codigo_inicial: "<!-- Escreva seu código aqui -->",
                xp_recompensa: 50
            },
            {
                id: 2,
                titulo: "Função de Soma em JavaScript",
                linguagem: "javascript",
                instrucao: "Complete a função somar(a, b) retornando a + b",
                codigo_inicial: "function somar(a, b) {\n  // seu código aqui\n}",
                xp_recompensa: 60
            },
            {
                id: 3,
                titulo: "Exibição com PHP",
                linguagem: "php",
                instrucao: "Use a instrução echo para exibir Olá, DevQuest!",
                codigo_inicial: "<?php\n// seu código aqui\n?>",
                xp_recompensa: 60
            }
        ];
        renderizarDesafio(0);
    }
}

/**
 * Renderiza o desafio selecionado na tela
 */
function renderizarDesafio(indice) {
    if (!desafios || desafios.length === 0) return;
    desafioAtual = desafios[indice];

    document.getElementById("desafio-titulo").innerText = desafioAtual.titulo;
    document.getElementById("desafio-linguagem").innerText = desafioAtual.linguagem.toUpperCase();
    document.getElementById("desafio-instrucao").innerText = desafioAtual.instrucao;
    document.getElementById("desafio-xp").innerText = `+${desafioAtual.xp_recompensa} XP`;
    document.getElementById("codigo-editor").value = desafioAtual.codigo_inicial;

    const boxResultado = document.getElementById("resultado-box");
    boxResultado.className = "resultado-box";
    boxResultado.style.display = "none";
}

/**
 * Submete a resposta do aluno para o backend PHP validar
 */
async function submeterCodigo() {
    const codigo = document.getElementById("codigo-editor").value;
    const boxResultado = document.getElementById("resultado-box");

    try {
        const resposta = await fetch("api_desafios.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                desafio_id: desafioAtual.id,
                codigo: codigo,
                usuario_id: 1
            })
        });

        const res = await resposta.json();

        if (res.acertou) {
            boxResultado.className = "resultado-box sucesso";
            boxResultado.innerText = `✅ ${res.mensagem} (+${res.xp_ganho} XP adicionados!)`;
            xpUsuario += res.xp_ganho;
            atualizarPlacar();
        } else {
            boxResultado.className = "resultado-box erro";
            boxResultado.innerText = `❌ ${res.mensagem}`;
        }
    } catch (e) {
        // Fallback local simples se estiver rodando sem servidor web
        boxResultado.className = "resultado-box sucesso";
        boxResultado.innerText = "✅ Código aceito no modo simulado local!";
        xpUsuario += desafioAtual.xp_recompensa || 50;
        atualizarPlacar();
    }
}

function atualizarPlacar() {
    document.getElementById("usuario-xp").innerText = `⭐ ${xpUsuario} XP`;
    if (xpUsuario >= 300 && nivelUsuario === 1) {
        nivelUsuario = 2;
        document.getElementById("usuario-nivel").innerText = `Nível ${nivelUsuario} (Júnior)`;
        alert("🎉 Parabéns! Você subiu para o Nível 2!");
    }
}

/**
 * Módulo Pomodoro
 */
function configurarPomodoro() {
    const btnToggle = document.getElementById("btn-pomodoro");
    const displayTimer = document.getElementById("timer-display");

    btnToggle.addEventListener("click", () => {
        if (!pomodoroRodando) {
            pomodoroRodando = true;
            btnToggle.innerText = "Pausar";
            timerInterval = setInterval(() => {
                tempoPomodoro--;
                const min = Math.floor(tempoPomodoro / 60).toString().padStart(2, "0");
                const seg = (tempoPomodoro % 60).toString().padStart(2, "0");
                displayTimer.innerText = `${min}:${seg}`;

                if (tempoPomodoro <= 0) {
                    clearInterval(timerInterval);
                    alert("⏰ Pomodoro concluído! Hora de descansar 5 minutos e se hidratar.");
                    tempoPomodoro = 25 * 60;
                    pomodoroRodando = false;
                    btnToggle.innerText = "Iniciar";
                }
            }, 1000);
        } else {
            clearInterval(timerInterval);
            pomodoroRodando = false;
            btnToggle.innerText = "Retomar";
        }
    });
}
