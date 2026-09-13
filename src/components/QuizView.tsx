import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Zap, 
  HelpCircle,
  Trophy,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EstadoJogo } from '../types';
import { BANCO_QUESTOES } from '../data/initialData';

interface QuizViewProps {
  estado: EstadoJogo;
  onAtualizarEstado: (novoEstado: Partial<EstadoJogo>) => void;
  onVerificarLevelUp: (xpGanho: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  estado,
  onAtualizarEstado,
  onVerificarLevelUp
}) => {
  const [indiceQuestao, setIndiceQuestao] = useState<number>(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [respostaProcessada, setRespostaProcessada] = useState<boolean>(false);
  const [bossHP, setBossHP] = useState<number>(estado.quizHP);
  const [bossAnimandoDano, setBossAnimandoDano] = useState<boolean>(false);

  const questaoAtual = BANCO_QUESTOES[indiceQuestao];
  const bossDerrotado = bossHP <= 0 || estado.quizRespondido;

  const responder = (indexOpcao: number) => {
    if (respostaProcessada || bossDerrotado) return;
    setOpcaoSelecionada(indexOpcao);
    setRespostaProcessada(true);

    const opcao = questaoAtual.opcoes[indexOpcao];

    if (opcao.correta) {
      setBossAnimandoDano(true);
      const novoHp = Math.max(0, bossHP - 50);
      setBossHP(novoHp);

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });

      onAtualizarEstado({
        gold: estado.gold + questaoAtual.recompensaGold,
        xp: estado.xp + questaoAtual.recompensaXP,
        quizHP: novoHp,
        quizRespondido: novoHp <= 0
      });

      onVerificarLevelUp(questaoAtual.recompensaXP);

      setTimeout(() => setBossAnimandoDano(false), 600);
    }
  };

  const proximaQuestao = () => {
    if (indiceQuestao + 1 < BANCO_QUESTOES.length) {
      setIndiceQuestao(prev => prev + 1);
      setOpcaoSelecionada(null);
      setRespostaProcessada(false);
    } else {
      setIndiceQuestao(0);
      setOpcaoSelecionada(null);
      setRespostaProcessada(false);
    }
  };

  const reiniciarBoss = () => {
    setBossHP(100);
    setIndiceQuestao(0);
    setOpcaoSelecionada(null);
    setRespostaProcessada(false);
    onAtualizarEstado({
      quizHP: 100,
      quizRespondido: false
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Editorial Header */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
              <GraduationCap className="w-4 h-4" />
              <span>Avaliação Formativa Contínua • ADS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Arena Conceitual e Teoria de TI
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Consolide conceitos acadêmicos fundamentais como segurança web com SQL, POO, tags semânticas e arquitetura de software. Derrote o Bug do Sistema a cada resposta correta.
            </p>
          </div>

          {bossDerrotado && (
            <button
              onClick={reiniciarBoss}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-all duration-200 hover:scale-105 flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Simulado</span>
            </button>
          )}
        </div>
      </section>

      {/* Grid: Monstro + Arena de Questão */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Card do Boss (5 cols) */}
        <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5 hover:border-slate-700">
          <div className="space-y-1.5">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-purple-400">
              <ShieldAlert className="w-4 h-4" />
              <span>DESAFIO DO SEMESTRE</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">O Bug do Sistema</h2>
            <p className="text-xs text-slate-400">
              {bossDerrotado ? 'Parabéns! O erro conceitual foi completamente neutralizado.' : 'Responda as questões de prova com precisão para eliminá-lo.'}
            </p>
          </div>

          {/* Boss Avatar */}
          <div className={`relative w-36 h-36 mx-auto rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-6xl shadow-inner transition-transform duration-200 ${
            bossAnimandoDano ? 'scale-90 border-rose-500' : ''
          }`}>
            {bossDerrotado ? (
              <span className="animate-bounce">💀</span>
            ) : bossAnimandoDano ? (
              <span>💥</span>
            ) : (
              <span className="animate-pulse">👾</span>
            )}

            {bossAnimandoDano && (
              <div className="absolute -top-3 -right-3 bg-rose-500 text-white font-black text-xs px-2.5 py-1 rounded-full animate-ping">
                -50 HP
              </div>
            )}
          </div>

          {/* Barra de Vida */}
          <div className="space-y-1.5 max-w-xs mx-auto">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-slate-400">INTEGRIDADE DO BUG</span>
              <span className={`font-bold ${bossHP > 30 ? 'text-rose-400' : 'text-slate-500'}`}>
                {bossHP} / 100
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/60">
              <div 
                className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300 rounded-full"
                style={{ width: `${bossHP}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-left text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Recompensa por Acerto:
            </p>
            <p className="font-mono text-amber-400">🪙 +{questaoAtual.recompensaGold} Gold acadêmico</p>
            <p className="font-mono text-indigo-400">⚡ +{questaoAtual.recompensaXP} XP de formação</p>
          </div>
        </div>

        {/* Painel da Questão (7 cols) */}
        <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
          {bossDerrotado ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Excelente Desempenho!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Você demonstrou clareza teórica nos conceitos fundamentais de desenvolvimento de sistemas.
              </p>
              <button
                onClick={reiniciarBoss}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Refazer Simulado
              </button>
            </div>
          ) : (
            <>
              {/* Topo da Questão */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    Questão {indiceQuestao + 1} de {BANCO_QUESTOES.length}
                  </span>
                  <span className="text-xs text-purple-400 font-medium font-mono">
                    [{questaoAtual.categoria}]
                  </span>
                </div>
                {questaoAtual.linguagemRelacionada && (
                  <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {questaoAtual.linguagemRelacionada}
                  </span>
                )}
              </div>

              {/* Pergunta */}
              <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                {questaoAtual.pergunta}
              </h3>

              {/* Alternativas */}
              <div className="space-y-2.5">
                {questaoAtual.opcoes.map((opcao, idx) => {
                  const isSelected = opcaoSelecionada === idx;
                  const isCorreta = opcao.correta;

                  let cardStyle = 'bg-slate-950/60 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 hover:-translate-y-0.5 text-slate-300 cursor-pointer';
                  if (respostaProcessada) {
                    if (isCorreta) {
                      cardStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !isCorreta) {
                      cardStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    } else {
                      cardStyle = 'bg-slate-950/20 border-slate-800/40 opacity-40 text-slate-500';
                    }
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => responder(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 text-xs font-medium flex items-start gap-3 ${cardStyle}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-[11px] text-slate-300 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opcao.texto}</span>
                      {respostaProcessada && isCorreta && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {respostaProcessada && isSelected && !isCorreta && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explicação Didática */}
              {respostaProcessada && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                    <span>Justificativa Acadêmica</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {questaoAtual.explicacao}
                  </p>
                  <button
                    onClick={proximaQuestao}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer"
                  >
                    Próxima Questão &rarr;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
