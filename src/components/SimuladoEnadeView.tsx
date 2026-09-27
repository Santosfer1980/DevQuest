import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Clock, 
  Award, 
  ChevronRight, 
  Sparkles,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUESTOES_SIMULADO_ENADE } from '../data/recursosAcademico';
import { EstadoJogo, QuestaoSimuladoEnade } from '../types';

interface SimuladoEnadeViewProps {
  estado: EstadoJogo;
  onAtualizarEstado: (novo: Partial<EstadoJogo>) => void;
  onVerificarLevelUp: (xpGanho: number) => void;
}

export const SimuladoEnadeView: React.FC<SimuladoEnadeViewProps> = ({
  estado,
  onAtualizarEstado,
  onVerificarLevelUp
}) => {
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null);
  const [exibirExplicacao, setExibirExplicacao] = useState<boolean>(false);
  const [pontuacaoTotal, setPontuacaoTotal] = useState<number>(0);
  const [acertosCount, setAcertosCount] = useState<number>(0);

  const questoes = QUESTOES_SIMULADO_ENADE;
  const questao = questoes[indiceAtual];
  const jaRespondida = estado.questoesEnadeRespondidas?.includes(questao.id);

  const responder = (letra: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (exibirExplicacao) return;

    setOpcaoSelecionada(letra);
    setExibirExplicacao(true);

    const opcao = questao.opcoes.find(o => o.letra === letra);
    if (opcao && opcao.correta) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });

      setAcertosCount(prev => prev + 1);
      setPontuacaoTotal(prev => prev + questao.recompensaXP);

      if (!jaRespondida) {
        const novasRespondidas = [...(estado.questoesEnadeRespondidas || []), questao.id];
        onAtualizarEstado({
          questoesEnadeRespondidas: novasRespondidas,
          xp: estado.xp + questao.recompensaXP,
          gold: estado.gold + questao.recompensaGold
        });
        onVerificarLevelUp(questao.recompensaXP);
      }
    }
  };

  const proximaQuestao = () => {
    setOpcaoSelecionada(null);
    setExibirExplicacao(false);
    if (indiceAtual + 1 < questoes.length) {
      setIndiceAtual(prev => prev + 1);
    } else {
      setIndiceAtual(0);
    }
  };

  const reiniciarSimulado = () => {
    setIndiceAtual(0);
    setOpcaoSelecionada(null);
    setExibirExplicacao(false);
    setPontuacaoTotal(0);
    setAcertosCount(0);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Editorial Header */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
              <GraduationCap className="w-4 h-4" />
              <span>Exame Nacional de Desempenho de Estudantes • Questões Oficiais INEP</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Simulador Oficial ENADE & Concursos ADS
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Treine com questões verídicas aplicadas pelo MEC/INEP em exames anteriores de <b>Análise e Desenvolvimento de Sistemas</b>. 
              Ao responder, você recebe o gabarito oficial com a <b>justificativa pedagógica comentada</b>, acumulando XP para o seu personagem.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 shrink-0 text-right">
            <p className="text-[11px] font-semibold text-slate-400 uppercase">Progresso da Bateria</p>
            <p className="text-xl font-bold text-white font-mono mt-0.5">
              Questão {indiceAtual + 1} de {questoes.length}
            </p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">
              Acertos: {acertosCount} ({questoes.length ? Math.round((acertosCount / questoes.length) * 100) : 0}%)
            </p>
          </div>
        </div>

        {/* Barra de Progresso do Exame */}
        <div className="w-full bg-slate-950 rounded-full h-2 mt-6 overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${((indiceAtual + 1) / questoes.length) * 100}%` }}
          />
        </div>
      </section>

      {/* Card da Questão */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
              {questao.anoEnade}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {questao.disciplina}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">Banca: <b className="text-white">{questao.banca}</b></span>
            <span className="text-amber-400 font-bold">+{questao.recompensaXP} XP</span>
          </div>
        </div>

        {/* Enunciado */}
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
            {questao.enunciado}
          </p>

          {questao.codigoTrecho && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-indigo-300 whitespace-pre-wrap leading-relaxed">
              {questao.codigoTrecho}
            </div>
          )}
        </div>

        {/* Alternativas */}
        <div className="space-y-3 pt-2">
          {questao.opcoes.map((op) => {
            const foiSelecionada = opcaoSelecionada === op.letra;
            let estilo = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950 text-slate-300';

            if (exibirExplicacao) {
              if (op.correta) {
                estilo = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold';
              } else if (foiSelecionada) {
                estilo = 'bg-rose-950/40 border-rose-500 text-rose-300';
              } else {
                estilo = 'bg-slate-950/30 border-slate-900 opacity-50 text-slate-500';
              }
            }

            return (
              <button
                key={op.letra}
                disabled={exibirExplicacao}
                onClick={() => responder(op.letra)}
                className={`w-full p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all duration-200 cursor-pointer ${estilo}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                  exibirExplicacao && op.correta
                    ? 'bg-emerald-500 text-slate-950'
                    : exibirExplicacao && foiSelecionada
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {op.letra}
                </div>
                <div className="text-xs sm:text-sm leading-relaxed flex-1 pt-0.5">
                  {op.texto}
                </div>
              </button>
            );
          })}
        </div>

        {/* Justificativa Pedagógica & Próxima Questão */}
        {exibirExplicacao && (
          <div className="space-y-5 pt-4 border-t border-slate-800 animate-in fade-in duration-300">
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-2">
              <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Justificativa Pedagógica do Gabarito Oficial
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {questao.justificativaPedagogica}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={reiniciarSimulado}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Simulado</span>
              </button>

              <button
                onClick={proximaQuestao}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
              >
                <span>{indiceAtual + 1 < questoes.length ? 'Próxima Questão' : 'Concluir Exame'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
