import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calculator, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Calendar, 
  Award,
  BookOpen
} from 'lucide-react';
import { DisciplinaAcademica, EstadoJogo } from '../types';

interface AcademicoViewProps {
  estado: EstadoJogo;
  onAtualizarEstado: (novo: Partial<EstadoJogo>) => void;
}

export const AcademicoView: React.FC<AcademicoViewProps> = ({
  estado,
  onAtualizarEstado
}) => {
  const [modalNovaDisciplina, setModalNovaDisciplina] = useState<boolean>(false);
  const [nomeNova, setNomeNova] = useState<string>('');
  const [codigoNovo, setCodigoNovo] = useState<string>('ADS');
  const [mediaPadrao, setMediaPadrao] = useState<number>(6.0);

  const disciplinas = estado.disciplinas || [];

  const atualizarDisciplina = (id: string, campos: Partial<DisciplinaAcademica>) => {
    const novas = disciplinas.map(d => d.id === id ? { ...d, ...campos } : d);
    onAtualizarEstado({ disciplinas: novas });
  };

  const removerDisciplina = (id: string) => {
    if (window.confirm('Deseja realmente remover esta disciplina?')) {
      const novas = disciplinas.filter(d => d.id !== id);
      onAtualizarEstado({ disciplinas: novas });
    }
  };

  const adicionarDisciplina = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeNova.trim()) return;

    const nova: DisciplinaAcademica = {
      id: `disc-${Date.now()}`,
      nome: nomeNova.trim(),
      codigo: codigoNovo.trim() || 'ADS',
      notaA1: null,
      notaA2: null,
      faltas: 0,
      totalAulas: 40,
      mediaMinima: mediaPadrao
    };

    onAtualizarEstado({ disciplinas: [...disciplinas, nova] });
    setNomeNova('');
    setCodigoNovo('ADS');
    setModalNovaDisciplina(false);
  };

  // Estatísticas Gerais
  const totalDisciplinas = disciplinas.length;
  let aprovadas = 0;
  let emRisco = 0;

  disciplinas.forEach(d => {
    const a1 = d.notaA1;
    const a2 = d.notaA2;
    if (a1 !== null && a2 !== null) {
      const media = (a1 + a2) / 2;
      if (media >= d.mediaMinima) aprovadas++;
      else emRisco++;
    } else if (a1 !== null && a1 < d.mediaMinima - 1) {
      emRisco++;
    }
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Editorial Header */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Calculator className="w-4 h-4" />
              <span>Controle Curricular • Provas A1, A2 e Frequência</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Boletim Acadêmico & Calculadora de Aprovação
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Acompanhe seu rendimento semestral no curso de <b>Análise e Desenvolvimento de Sistemas</b>. 
              Insira a nota da sua primeira prova (A1) e o sistema calcula automaticamente a nota exata que você precisa na A2 para não pegar exame ou DP.
            </p>
          </div>

          <button
            onClick={() => setModalNovaDisciplina(true)}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] shadow-md shadow-emerald-600/20 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Matéria</span>
          </button>
        </div>

        {/* Resumo de Indicadores */}
        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
            <span className="text-[11px] text-slate-400 font-semibold block">Total de Matérias</span>
            <span className="text-xl font-bold text-white mt-1 block">{totalDisciplinas}</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
            <span className="text-[11px] text-emerald-400 font-semibold block">Aprovadas / Seguras</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">{aprovadas}</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
            <span className="text-[11px] text-amber-400 font-semibold block">Atenção na A2</span>
            <span className="text-xl font-bold text-amber-400 mt-1 block">{emRisco}</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
            <span className="text-[11px] text-indigo-400 font-semibold block">Presença Mínima</span>
            <span className="text-xl font-bold text-indigo-400 mt-1 block">75% (MEC)</span>
          </div>
        </div>
      </section>

      {/* Grid de Disciplinas Cadastradas */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Disciplinas do Semestre
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {disciplinas.map(disc => {
            const a1 = disc.notaA1;
            const a2 = disc.notaA2;
            const limiteFaltas = Math.floor(disc.totalAulas * 0.25);
            const presencaPercentual = Math.round(((disc.totalAulas - disc.faltas) / disc.totalAulas) * 100);

            // Cálculo da nota necessária na A2
            // Fórmula padrão universitária: (A1 + A2) / 2 >= MediaMinima => A2 >= (MediaMinima * 2) - A1
            let statusTexto = '';
            let notaNecessariaA2 = 0;
            let aprovadoDireto = false;
            let reprovadoNota = false;

            if (a1 !== null && a2 !== null) {
              const mediaFinal = (a1 + a2) / 2;
              if (mediaFinal >= disc.mediaMinima) {
                statusTexto = `Aprovado com Média ${mediaFinal.toFixed(1)}! 🎓`;
                aprovadoDireto = true;
              } else {
                statusTexto = `Média ${mediaFinal.toFixed(1)} - Exame Final / DP ⚠️`;
                reprovadoNota = true;
              }
            } else if (a1 !== null) {
              notaNecessariaA2 = Math.max(0, (disc.mediaMinima * 2) - a1);
              if (notaNecessariaA2 > 10) {
                statusTexto = `Atenção: Necessita de ${notaNecessariaA2.toFixed(1)} na A2 (Precisará de Exame).`;
              } else {
                statusTexto = `Você precisa de ${notaNecessariaA2.toFixed(1)} na A2 para passar sem exame.`;
              }
            } else {
              statusTexto = 'Aguardando nota da prova A1.';
            }

            return (
              <div 
                key={disc.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 transition-all duration-300 hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {disc.codigo}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{disc.nome}</h3>
                  </div>
                  <button
                    onClick={() => removerDisciplina(disc.id)}
                    title="Remover disciplina"
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Campos de Notas A1 e A2 */}
                <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Nota A1 (0 a 10)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      placeholder="Ex: 7.5"
                      value={disc.notaA1 !== null ? disc.notaA1 : ''}
                      onChange={(e) => {
                        const val = e.target.value === '' ? null : parseFloat(e.target.value);
                        atualizarDisciplina(disc.id, { notaA1: val });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Nota A2 (0 a 10)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      placeholder="Ex: 8.0"
                      value={disc.notaA2 !== null ? disc.notaA2 : ''}
                      onChange={(e) => {
                        const val = e.target.value === '' ? null : parseFloat(e.target.value);
                        atualizarDisciplina(disc.id, { notaA2: val });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Mensagem de Meta Pedagógica */}
                <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  aprovadoDireto 
                    ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                    : reprovadoNota
                    ? 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
                    : 'bg-indigo-950/40 border border-indigo-500/30 text-indigo-300'
                }`}>
                  {aprovadoDireto ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> : <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />}
                  <span>{statusTexto}</span>
                </div>

                {/* Controle de Faltas e Frequência */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Faltas:</span>
                    <button
                      onClick={() => atualizarDisciplina(disc.id, { faltas: Math.max(0, disc.faltas - 1) })}
                      className="w-6 h-6 rounded bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-white px-1.5">{disc.faltas}</span>
                    <button
                      onClick={() => atualizarDisciplina(disc.id, { faltas: disc.faltas + 1 })}
                      className="w-6 h-6 rounded bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition-colors"
                    >
                      +
                    </button>
                    <span className="text-slate-500 text-[10px]">(máx: {limiteFaltas})</span>
                  </div>

                  <span className={`font-mono font-bold ${presencaPercentual >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {presencaPercentual}% Presença
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal Adicionar Disciplina */}
      {modalNovaDisciplina && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400" />
              Cadastrar Nova Disciplina
            </h3>
            <p className="text-xs text-slate-400">
              Insira o nome da matéria que você está cursando neste semestre para calcular a média de aprovação.
            </p>

            <form onSubmit={adicionarDisciplina} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Nome da Disciplina</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Estruturas de Dados Avançadas"
                  value={nomeNova}
                  onChange={(e) => setNomeNova(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Código / Sigla</label>
                  <input
                    type="text"
                    placeholder="Ex: ADS204"
                    value={codigoNovo}
                    onChange={(e) => setCodigoNovo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Média Mínima</label>
                  <input
                    type="number"
                    step="0.5"
                    min="5"
                    max="8"
                    value={mediaPadrao}
                    onChange={(e) => setMediaPadrao(parseFloat(e.target.value) || 6.0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalNovaDisciplina(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  Salvar Matéria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
