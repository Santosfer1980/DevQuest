import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  FileText, 
  Trash2, 
  Sparkles,
  Flame,
  ArrowRight,
  BookMarked,
  Code,
  Layers,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EstadoJogo, TabType } from '../types';
import { TRILHAS_DISPONIVEIS } from '../data/initialData';

interface DashboardViewProps {
  estado: EstadoJogo;
  onAtualizarEstado: (novoEstado: Partial<EstadoJogo>) => void;
  onCompletarMissao: (id: number) => void;
  onNavegarPara: (tab: TabType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  estado,
  onAtualizarEstado,
  onCompletarMissao,
  onNavegarPara
}) => {
  // ── Terminal Clock ──────────────────────────────────────────────
  const [relogio, setRelogio] = useState({ hora: '00:00:00', status: 'Carregando ambiente...' });

  useEffect(() => {
    const atualizar = () => {
      const agora = new Date();
      const h = agora.getHours().toString().padStart(2, '0');
      const m = agora.getMinutes().toString().padStart(2, '0');
      const s = agora.getSeconds().toString().padStart(2, '0');

      const horaNum = agora.getHours();
      let statusMsg = 'Ambiente de desenvolvimento ativo no portal acadêmico.';
      if (horaNum >= 5 && horaNum < 12) {
        statusMsg = 'Período matutino: Excelente momento para praticar lógica e algoritmos.';
      } else if (horaNum >= 12 && horaNum < 18) {
        statusMsg = 'Turno vespertino: Desenvolvimento de projetos em HTML, CSS, JS e PHP.';
      } else if (horaNum >= 18 && horaNum < 23) {
        statusMsg = 'Horário noturno de aulas: Revisão de queries SQL e modelagem de software.';
      } else {
        statusMsg = 'Estudos na madrugada: Compilação focada e resolução de bugs.';
      }

      setRelogio({ hora: `${h}:${m}:${s}`, status: statusMsg });
    };

    atualizar();
    const interval = setInterval(atualizar, 1000);
    return () => clearInterval(interval);
  }, []);

  // ── Pomodoro Timer ─────────────────────────────────────────────
  const [duracaoTotal, setDuracaoTotal] = useState<number>(25 * 60);
  const [tempoRestante, setTempoRestante] = useState<number>(25 * 60);
  const [timerAtivo, setTimerAtivo] = useState<boolean>(false);
  const [modoTimer, setModoTimer] = useState<'foco' | 'pausaCurta' | 'pausaLonga'>('foco');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerAtivo && tempoRestante > 0) {
      timer = setInterval(() => {
        setTempoRestante(prev => prev - 1);
      }, 1000);
    } else if (timerAtivo && tempoRestante === 0) {
      setTimerAtivo(false);
      if (modoTimer === 'foco') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        onAtualizarEstado({
          xp: estado.xp + 40,
          gold: estado.gold + 20
        });
        onCompletarMissao(1);
        alert('🎉 Bloco de estudos acadêmicos concluído! Você conquistou +40 XP e +20 Gold!');
      } else {
        alert('⏰ Intervalo finalizado. Bom retorno aos estudos!');
      }
    }
    return () => clearInterval(timer);
  }, [timerAtivo, tempoRestante, modoTimer]);

  const trocarModo = (modo: 'foco' | 'pausaCurta' | 'pausaLonga') => {
    setTimerAtivo(false);
    setModoTimer(modo);
    const segundos = modo === 'foco' ? 25 * 60 : modo === 'pausaCurta' ? 5 * 60 : 15 * 60;
    setDuracaoTotal(segundos);
    setTempoRestante(segundos);
  };

  const minutos = Math.floor(tempoRestante / 60).toString().padStart(2, '0');
  const segundos = (tempoRestante % 60).toString().padStart(2, '0');
  const progressoTimer = Math.round(((duracaoTotal - tempoRestante) / duracaoTotal) * 100);

  // ── Scratchpad Notes ───────────────────────────────────────────
  const [blocoSalvo, setBlocoSalvo] = useState(true);

  const handleNotaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAtualizarEstado({ notasBloco: e.target.value });
    setBlocoSalvo(false);
    setTimeout(() => setBlocoSalvo(true), 500);
  };

  const totalDesafios = estado.desafios.length;
  const desafiosConcluidos = estado.desafios.filter(d => d.concluido).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Editorial Academic Header - Site Style */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <GraduationCap className="w-4 h-4" />
              <span>Faculdade de Tecnologia • Análise e Desenvolvimento de Sistemas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Portal Integrado de Estudos e Prática de Código
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Bem-vindo, <b>{estado.usuarioNome}</b>. Este ambiente unifica a matriz curricular do curso: 
              <span className="text-slate-200"> Frontend (HTML, CSS, JavaScript)</span>, 
              <span className="text-slate-200"> Backend (PHP, Python)</span> e 
              <span className="text-slate-200"> Bancos de Dados (SQL)</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavegarPara('trilhas')}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <span>Acessar Trilhas de Código</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950/80 px-3.5 py-2 rounded-lg border border-slate-800/80 text-center">
              Desafios: <b className="text-indigo-400">{desafiosConcluidos}/{totalDesafios}</b> Concluídos
            </div>
          </div>
        </div>

        {/* Cohesive Stack Badges - 5 Pillars */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {TRILHAS_DISPONIVEIS.map(trilha => {
            const exerciciosTrilha = estado.desafios.filter(d => d.linguagem === trilha.id);
            const prontos = exerciciosTrilha.filter(d => d.concluido).length;

            return (
              <div 
                key={trilha.id}
                onClick={() => onNavegarPara('trilhas')}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/80 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {trilha.sigla}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold">
                    {prontos}/{exerciciosTrilha.length}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-1">{trilha.nome}</p>
                <div className="w-full bg-slate-800 rounded-full h-1 mt-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: trilha.cor,
                      width: `${exerciciosTrilha.length ? (prontos / exerciciosTrilha.length) * 100 : 0}%` 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Relógio do Sistema Acadêmico */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">DEVQUEST_CLOCK.SYS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400">SINCRONIZADO</span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">{relogio.status}</p>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-cyan-400 tracking-wider shrink-0">
          {relogio.hora}
        </div>
      </section>

      {/* Seção Principal: Pomodoro de Foco & Metas Curriculares */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Bloco de Foco Pomodoro (7 cols) */}
        <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Sessão de Estudos Pomodoro</h3>
                <p className="text-xs text-slate-400">Ciclos de concentração para resolução de exercícios</p>
              </div>
            </div>

            {/* Abas */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => trocarModo('foco')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  modoTimer === 'foco' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Foco (25m)
              </button>
              <button
                onClick={() => trocarModo('pausaCurta')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  modoTimer === 'pausaCurta' ? 'bg-cyan-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Pausa (5m)
              </button>
            </div>
          </div>

          {/* Visor do Timer */}
          <div className="text-center py-2">
            <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white mb-2">
              {minutos}:{segundos}
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {timerAtivo ? 'Sessão acadêmica em andamento... Mantenha a imersão!' : 'Timer pausado. Pronto para iniciar quando desejar.'}
            </p>

            <div className="w-full max-w-sm mx-auto bg-slate-950 rounded-full h-2 mt-4 overflow-hidden border border-slate-800">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  modoTimer === 'foco' ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-cyan-400'
                }`}
                style={{ width: `${progressoTimer}%` }}
              />
            </div>
          </div>

          {/* Controles do Pomodoro */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setTimerAtivo(!timerAtivo)}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md cursor-pointer ${
                timerAtivo
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
              }`}
            >
              {timerAtivo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{timerAtivo ? 'Pausar Ciclo' : 'Iniciar Foco'}</span>
            </button>
            <button
              onClick={() => {
                setTimerAtivo(false);
                setTempoRestante(duracaoTotal);
              }}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar</span>
            </button>
          </div>
        </div>

        {/* Quadro de Metas Diárias (5 cols) */}
        <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Metas Curriculares Diárias
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {estado.missoes.filter(m => m.concluida).length}/{estado.missoes.length}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Cumpra os objetivos diários para ganhar XP acadêmico e Gold de incentivo.
            </p>
          </div>

          <div className="space-y-2.5 flex-1">
            {estado.missoes.map(missao => (
              <div
                key={missao.id}
                className={`p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                  missao.concluida
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-400'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                      missao.concluida
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold'
                        : 'border-slate-700 bg-slate-800 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-xs font-medium leading-snug ${missao.concluida ? 'line-through text-slate-500' : ''}`}>
                    {missao.texto}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] shrink-0 font-bold">
                  <span className="text-amber-400">+{missao.goldRecompensa}🪙</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Reinício diário automático</span>
            <span className="text-indigo-400 font-semibold">Semestre 2026/2</span>
          </div>
        </div>
      </div>

      {/* Caderno de Anotações Acadêmicas */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Caderno de Anotações e Comandos</h3>
              <p className="text-xs text-slate-400">
                Espaço para rascunhar comandos SQL, sintaxe PHP, queries e dicas de aula (salvamento contínuo).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-1">
              {blocoSalvo ? '💾 Sincronizado' : 'Salvando...'}
            </span>
            <button
              onClick={() => {
                if (window.confirm('Deseja limpar as anotações do bloco?')) {
                  onAtualizarEstado({ notasBloco: '' });
                }
              }}
              className="text-slate-400 hover:text-rose-400 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          </div>
        </div>

        <textarea
          value={estado.notasBloco}
          onChange={handleNotaChange}
          placeholder="Exemplo: SELECT * FROM tabela WHERE status = 1; \n<?php echo htmlspecialchars($dado); ?>\n..."
          rows={6}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-y leading-relaxed"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>{estado.notasBloco.length} caracteres digitados</span>
          <span>Armazenamento local seguro do estudante</span>
        </div>
      </section>
    </div>
  );
};
